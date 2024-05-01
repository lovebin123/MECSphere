import React, { useState, useEffect, useContext } from "react";
import apiClient from "../services/api-client";
import { Button, Text, HStack, InputGroup, Input, InputRightAddon,Flex, Heading,Avatar } from "@chakra-ui/react";
import io from "socket.io-client";
import "./chat.css"
import AuthContext from "../contexts/AuthContext";
import { FaSearch } from "react-icons/fa";
import Usertile from "../Components/Users/Usertile";

const socket = io.connect("https://mecsphere.onrender.com");

function Users() {
  const [users, setUsers] = useState([]);
  const { User, setUser } = useContext(AuthContext);
  const [filteredUsers, setFilteredUsers] = useState([])
  useEffect(() => {
    // Fetch users data from the API
    apiClient
      .get("/user")
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data)
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });


  }, []);

  const handleAddFriendClick = async (friendId) => {
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

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm)
    );
    setFilteredUsers(filtered);
  }
  return (
    <Flex position="relative" w={'80vw'} direction={'column'} p={3} gap={10}>
      <Flex w={'100%'} justifyContent={'center'}>
        <InputGroup w={'70%'} mt={5}>
          <Input placeholder="search" borderRadius={'30'}
            onChange={handleSearch}
          ></Input>
          <InputRightAddon borderTopRightRadius={'30'} borderBottomRightRadius={'30'} bgColor={'gray.200'}><FaSearch onClick={handleSearch} /></InputRightAddon>
        </InputGroup>
      </Flex>
      <Flex gap={7} p={3} wrap={'wrap'}>
        {filteredUsers.map(user => (
          <Flex p={3} direction="column" gap={1} justifyContent="space-around" alignItems="center" borderRadius={10} boxShadow="md">
            <Avatar size={'lg'} />
            <Flex direction="column" p={4} gap={3} alignItems={'center'}>
                <Heading fontSize="16" color="gray.700">{user.name}</Heading>
                <Button borderRadius={'20'} onClick={()=>handleAddFriendClick(user._id)} color={'white'} bgColor={'rgba(100,138,242, 0.8)'} _hover={{bgColor:'rgba(100,138,242, 1)'}}>Add Friend</Button>
            </Flex>
        </Flex>
        ))}
      </Flex>
      {/*{users.map(user => (
        <HStack justify="space-evenly">
          <Text>{user.name}</Text>
          <Flex>
            <Button onClick={() => handleAddFriendClick(user._id)} colorScheme="green" size="sm" ml={2}>Add Friend</Button>
          </Flex>
        </HStack>
      ))}*/}
    </Flex>

  );
}

export default Users;