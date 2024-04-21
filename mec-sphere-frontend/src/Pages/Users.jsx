import React, { useState, useEffect, useContext } from "react";
import apiClient from "../services/api-client";
import { Button, Flex, Text, HStack } from "@chakra-ui/react";
import io from "socket.io-client";
import "./chat.css"
import AuthContext from "../contexts/AuthContext";

const socket = io.connect("https://mecsphere.onrender.com");

function Users() {
  const [users, setUsers] = useState([]);
  const { User, setUser } = useContext(AuthContext);

  useEffect(() => {
    // Fetch users data from the API
    apiClient
      .get("/user")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
    
      
  }, []);

  const handleAddFriendClick =async (friendId) => {
    try {
      const response = await apiClient.post("/user/request", {
        friendid: friendId,
        userid: User.id,
      });
      return response.data;
    } catch (error) {
      console.error("Error rejecting friend request:", error);
      throw error;
    }
  };

  return (
    
      <Flex position="relative" h="100vh" w={'80vw'}  justifyContent="flex-start" alignItems="flex-start">
          {users.map(user => (
            <HStack justify="space-evenly">
              <Text>{user.name}</Text>
              <Flex>
                <Button onClick={() => handleAddFriendClick(user._id)} colorScheme="green" size="sm" ml={2}>Add Friend</Button>
              </Flex>
            </HStack>
          ))}
      </Flex>
  
  );
}

export default Users;
