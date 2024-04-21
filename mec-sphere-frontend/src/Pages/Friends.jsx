import React, { useState, useEffect, useContext } from "react";
import apiClient from "../services/api-client";
import { Button, Flex, Text, HStack } from "@chakra-ui/react";
import io from "socket.io-client";
import "./chat.css"
import Chat from "./Chat";
import AuthContext from "../contexts/AuthContext";

const socket = io.connect("https://mecsphere.onrender.com");

function Users() {
  const [users, setUsers] = useState([]);
  const[chatter, setChatter] = useState({name: "", room: ""});
  const { User, setUser } = useContext(AuthContext);

  useEffect(() => {
    // Fetch users data from the API
    apiClient
      .post("/user/friends", {id: User.id})
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
    
  }, []);

  const joinRoom = ()=>{
    if(chatter.name !== "" && chatter.room !== ""){
      socket.emit("join_room", chatter.room);
    }
  }

  const handleChatClick = (userid,email, name) => {
    // Handle chat button click
    apiClient
      .post("/user/chatrequest", {
        friendid: userid,
        userid: User.id,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
    setChatter({name: name, room: User.email+email});
    joinRoom();
  };


  return (
    
      <Flex position="relative" h="100vh" w={'80vw'}  justifyContent="flex-start" alignItems="flex-start">
          {users.map(user => (
            <HStack justify="space-evenly">
              <Text>{user.name}</Text>
              <Flex>
                <Button onClick={() => handleChatClick(user._id, user.email, user.name)} colorScheme="blue" size="sm">Chat</Button>
              </Flex>
            </HStack>
          ))}
          <Chat socket={socket} username={User.name} room={chatter.room}/>
      </Flex>
  
  );
}

export default Users;
