import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button, Flex, Text, HStack } from "@chakra-ui/react";
import io from "socket.io-client";
import "./chat.css";
import AuthContext from "../contexts/AuthContext";

const socket = io.connect("http://localhost:3001");

function Users() {
  const [requests, setRequests] = useState([]);
  const { User, setUser } = useContext(AuthContext);

  useEffect(() => {
    // Fetch users data from the API
    axios
      .post("http://localhost:4000/user/requests", { id: User.id })
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
        const response = await axios.post("http://localhost:4000/user/acceptrequest", {
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
      const response = await axios.post("http://localhost:4000/user/rejectrequest", {
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
