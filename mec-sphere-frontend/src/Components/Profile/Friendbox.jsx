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
import ChatWindow2 from "./CW2";
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
      border={"1.5px solid rgba(93,117,253, 0.3)"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Flex alignItems={"center"} gap={3}>
        <Avatar size={"md"} />
        <Text>{props.username}</Text>
      </Flex>
      <Button bgColor={'rgba(93,117,253, 0.6)'} _hover={{bgColor:'rgba(93,117,253, 0.8)'}} color='white' onClick={handleChatClick}>
        Message
      </Button>
      {showChatbox && (
        <ChatWindow2 socket={socket} userName={props.username} con='other' room={chatter.room} onClose={handleChatClick} />
      )}
    </Flex>
  );
};

export default Friendbox;
