import React, { useState, useEffect, useContext } from "react";
import apiClient from "../services/api-client";
import { Button, Flex, Text, HStack } from "@chakra-ui/react";
import io from "socket.io-client";
import "./chat.css";
import AuthContext from "../contexts/AuthContext";

const socket = io.connect("https://mecsphere.onrender.com");

function Users() {
  const [requests, setRequests] = useState([]);
  const { User, setUser } = useContext(AuthContext);

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
  }, []);

  const accept = async(requestId) => {
    try {
        const response = await apiClient.post("/user/acceptrequest", {
          requestid: requestId,
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
            <Button onClick={() =>accept(request.id)} colorScheme="blue" size="sm">
              accept
            </Button>
            <Button onClick={()=>reject(request.id)} colorScheme="blue" size="sm">
              reject
            </Button>
          </Flex>
        </HStack>
      ))}
    </Flex>
  );
}

export default Users;
