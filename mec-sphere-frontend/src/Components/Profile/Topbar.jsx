import {
  Avatar,
  Button,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";
import React, { useState, useEffect, useContext } from "react";
import apiClient from "../../services/api-client";
import io from "socket.io-client";
import AuthContext from "../../contexts/AuthContext";
import ChatWindow from "./Chatwindow";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification";
const socket = io.connect("https://mecsphere.onrender.com");

const Topbar = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [showChatbox, setShowChatbox] = useState(false);
  const [requests, setRequests] = useState([]);
  const [chatter, setChatter] = useState({ name: "", room: "" });
  const { User, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const joinRoom = () => {
    if (chatter.name !== "" && chatter.room !== "") {
      socket.emit("join_room", chatter.room);
    }
  };

  useEffect(() => {
    // Fetch users data from the API

    apiClient
      .post("/user/requests", { id: User.id })
      .then((response) => {
        console.log(response.data);
        setRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });

    apiClient
      .post("/user/chatrequests", { id: User.id })
      .then((response) => {
        console.log(response.data);
        setRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);
  const Logout = () => {
    localStorage.setItem("token", '');
    setUser({
      id: "",
      name: "",
      token: '',
      role: '',
      status: true,
      email: '',
      friends: [],
    });
    navigate("/");
  };


  return (
    <Flex
      bgColor={"blue.100"}
      h={"120"}
      w={"100%"}
      alignItems={"center"}
      gap={5}
      justifyContent={"end"}
      p={2}
    >
      <Flex gap={3} mr={3}>
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton isActive={isOpen} as={Button}>
                <FaBell />
              </MenuButton>
              <MenuList p={3} overflowY={"auto"} maxHeight={"60vh"}>
                <Text fontWeight={"semibold"} fontSize={"19"} mb={5}>
                  Notifications
                </Text>
                {requests.map((noti1) => (
                  <Notification
                    key={noti1.id}
                    type={"chatreq"}
                    name={noti1.name}
                    email={noti1.email}
                    msg={" has requested to chat with you"}
                  />
                ))}
                {requests.map((noti2) => (
                  <Notification
                    key={noti2.id}
                    type={"friendreq"}
                    name={noti2.name}
                    freqid={noti2.id}
                    msg={" has requested to be your friend"}
                  />
                ))}
              </MenuList>
            </>
          )}
        </Menu>
        <Button bgColor={'rgba(93,117,253, 0.6)'} _hover={{ bgColor: 'rgba(93,117,253, 0.8)' }} color={'white'} onClick={Logout}>
          Logout
        </Button>
      </Flex>
    </Flex>
  );
};

export default Topbar;
