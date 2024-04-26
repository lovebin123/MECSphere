import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CloseButton,
  Flex,
  FocusLock,
  HStack,
  Heading,
  Icon,
  Input,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import Draggable from "react-draggable";
import ChatWindow from "./Chatwindow";
import { useEffect, useState, useContext, useRef } from "react";
import apiClient from "../../services/api-client";
import io from "socket.io-client";
import AuthContext from "../../contexts/AuthContext";

const socket = io.connect("https://mecsphere.onrender.com");

const Friendbox = (props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [showChatbox, setShowChatbox] = useState(false);
  const [chatter, setChatter] = useState({ name: "", room: "" });
  const { User, setUser } = useContext(AuthContext);
  const firstFieldRef = useRef(null);

  const joinRoom = () => {
    if (chatter.name !== "" && chatter.room !== "") {
      socket.emit("join_room", chatter.room);
    }
  };

  const handleChatClick = () => {
    // Handle chat button click
    setShowChatbox(!showChatbox);
    apiClient
      .post("/user/chatrequest", {
        friendid: props.userId,
        userid: User.id,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
      console.log(props);
    setChatter({ name: props.username, room: User.email + props.email });
    joinRoom();
  };

  return (
    <Flex
      w={"100%"}
      borderRadius={"20px"}
      p={3}
      boxShadow={"sm"}
      border={"1.5px solid lightblue"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Flex alignItems={"center"} gap={3}>
        <Avatar size={"md"} />
        <Text>{props.username}</Text>
      </Flex>
      <Button colorScheme="teal" onClick={handleChatClick}>
        Message
      </Button>
      {showChatbox && (
        <ChatWindow socket={socket} userName={props.username} room={chatter.room} onClose={handleChatClick} />
      )}
    </Flex>
  );
};

export default Friendbox;
