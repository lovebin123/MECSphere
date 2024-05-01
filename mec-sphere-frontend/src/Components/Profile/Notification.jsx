import {
  Avatar,
  Button,
  Divider,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState, useEffect, useContext } from "react";
import apiClient from "../../services/api-client";
import io from "socket.io-client";
import AuthContext from "../../contexts/AuthContext";
import ChatWindow from "./Chatwindow";
const socket = io.connect("https://mecsphere.onrender.com");

const Notification = (props) => {
  const [accepted, setAccepted] = useState(false);
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [showChatbox, setShowChatbox] = useState(false);
  const [requests, setRequests] = useState([]);
  const [chatter, setChatter] = useState({ name: "", room: "" });
  const { User, setUser } = useContext(AuthContext);

  const joinRoom = () => {
    if (props.name !== "" && props.email + User.email !== "") {
      socket.emit("join_room", props.email + User.email);
    }
  };
  const handleAccept = () => {
    setAccepted(true);
    setShowChatbox(!showChatbox);
    const st = props.email + User.email;
    console.log(st);
    setChatter({ name: props.name, room: st });
    console.log(chatter);
    joinRoom();
  };
  const handleClsoe = () => {
    setShowChatbox(!showChatbox);
  };

  const accept = async () => {
    try {
      const response = await apiClient.post("/user/acceptrequest", {
        requestid: props.freqid,
        userid: User.id,
      });
      return response.data;
    } catch (error) {
      console.error("Error rejecting friend request:", error);
      throw error;
    }
  };

  const reject = async (requestId) => {
    try {
      const response = await apiClient.post("/user/rejectrequest", {
        requestid: requestId,
        userid: User.id,
      });
      return response.data;
    } catch (error) {
      console.error("Error rejecting friend request:", error);
      throw error;
    }
  };

  return (
    <Flex direction={"column"} gap={2}>
      {accepted === true ? (
        props.type === "friendreq" ? (
          <Flex p={3} bgColor={"gray.100"}>
            <Text>You are now friends with {props.name}</Text>
          </Flex>
        ) : (
          <Flex p={3} bgColor={"gray.100"}>
            <Text>You can now chat with {props.name}</Text>
          </Flex>
        )
      ) : (
        <Flex
          mt={2}
          p={1}
          gap={5}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Flex alignItems={"center"} gap={1}>
            <Text>
              {props.name}
              {props.msg}{" "}
            </Text>
          </Flex>
          <Flex gap={1}>
            <Button
              colorScheme="green"
              onClick={() => {
                if (props.type === "friendreq") accept();
                else handleAccept();
              }}
            >
              Accept
            </Button>
            <Button colorScheme="red" onClick={reject}>Reject</Button>
          </Flex>
        </Flex>
      )}
      <Divider />
      {showChatbox && (
        <ChatWindow
          socket={socket}
          userName={props.name}
          con="you"
          room={props.email + User.email}
          onClose={handleClsoe}
        />
      )}
    </Flex>
  );
};

export default Notification;
