import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button, Flex, Text, HStack } from "@chakra-ui/react";
import io from "socket.io-client";
import "./chat.css"
import Chat from "./Chat";
import AuthContext from "../contexts/AuthContext";

const socket = io.connect("http://localhost:3001");


function Chats() {
  const [requests, setRequests] = useState([]);
  const { User, setUser } = useContext(AuthContext);
  const[chatter, setChatter] = useState({name: "", room: ""});

  const joinRoom = ()=>{
    if(chatter.name !== "" && chatter.room !== ""){
      socket.emit("join_room", chatter.room);
    }
  }

  useEffect(() => {
    // Fetch users data from the API
    axios
      .post("http://localhost:4000/user/chatrequests", { id: User.id })
      .then((response) => {
        console.log(response.data);
        setRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const accept = async(name,email) => {
    const st = (email+User.email);
    setChatter({name: name, room: st});
    joinRoom();
  };


  return (
    <Flex
      position="relative"
      h="100vh"
      w={"80vw"}
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      {requests.map((request) => (
        <HStack justify="space-evenly">
          <Text>{request.name}</Text>
          <Flex>
            <Button onClick={() =>accept(request.id, request.email)} colorScheme="blue" size="sm">
              accept
            </Button>
            
          </Flex>
        </HStack>
      ))}
      <Chat socket={socket} username={User.email} room={chatter.room}/>
    </Flex>
  );
}

export default Chats;
