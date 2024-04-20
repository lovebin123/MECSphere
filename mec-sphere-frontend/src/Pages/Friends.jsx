import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button, Flex, Text, HStack } from "@chakra-ui/react";
import io from "socket.io-client";
import "./chat.css"
import AuthContext from "../contexts/AuthContext";

const socket = io.connect("http://localhost:3001");

function Users() {
  const [users, setUsers] = useState([]);
  const[chatter, setChatter] = useState({name: "", room: ""});
  const { User, setUser } = useContext(AuthContext);

  useEffect(() => {
    // Fetch users data from the API
    axios
      .post("http://localhost:4000/user/friends", {id: User.id})
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

  const handleChatClick = (userId, email, name) => {
    // Handle chat button click
    console.log(User.email + email);
    setChatter({name: name, room: User.email});
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
      </Flex>
  
  );
}

export default Users;
