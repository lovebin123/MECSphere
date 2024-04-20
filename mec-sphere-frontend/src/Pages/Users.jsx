import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Flex, Text, HStack } from "@chakra-ui/react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function Users() {
  const [users, setUsers] = useState([]);
  const[chatter, setChatter] = useState({name: "", room: ""});

  useEffect(() => {
    // Fetch users data from the API
    axios
      .get("http://localhost:4000/user")
      .then((response) => {
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

  const handleChatClick = (userId, email, name) => {
    // Handle chat button click
    console.log(`Chat with user ${userId} mail = ${email} `);
  };

  const handleAddFriendClick = (userId) => {
    // Handle add friend button click
    console.log(`Add user ${userId} as friend`);
  };

  return (
    
      <Flex position="relative" h="100vh" w={'80vw'}  justifyContent="flex-start" alignItems="flex-start">
          {users.map(user => (
            <HStack justify="space-evenly">
              <Text>{user.name}</Text>
              <Flex>
                <Button onClick={() => handleChatClick(user._id, user.email, user.name)} colorScheme="blue" size="sm">Chat</Button>
                <Button onClick={() => handleAddFriendClick(user._id)} colorScheme="green" size="sm" ml={2}>Add Friend</Button>
              </Flex>
            </HStack>
          ))}
      </Flex>
  
  );
}

export default Users;
