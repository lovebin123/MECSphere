// AlumniCatalog.js
import React from "react";
import { useState, useContext, useEffect } from "react";
import {
  Flex,
  Image,
  Avatar,
  Text,
  Button,
  Badge,
  Heading,
  InputGroup,
  Input,
  InputRightAddon,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import AlumniTile from "./AlumniTile";
import apiClient from "../../services/api-client";
import AuthContext from "../../contexts/AuthContext";

const AlumniCatalog = ({}) => {
  const handleSearch = () => {
    // Implement search functionality here
  };
  const [users, setUsers] = useState([]);
  const { User, setUser } = useContext(AuthContext);

  useEffect(() => {
    apiClient
      .get("/user/logcheck", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data != "error")
          setUser({
            id: res.data.id,
            name: res.data.name,
            user: res.data.user,
            lastname: res.data.lastname,
            token: localStorage.getItem("token"),
            status: true,
            role: res.data.role,
            email: res.data.email,
            friends: res.data.friends,
          });
      })
      .catch((err) => {
        console.log(err);
      });
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

  const handleAddFriendClick = async (friendId) => {
    console.log(User.user.requests);
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
    <div className="alumni-catalog">
      <Flex direction="column" alignItems="center" p={5}>
        <InputGroup w="75vw" mb={5}>
          <Input
            placeholder="Search"
            borderRadius="30"
            onChange={handleSearch}
          />
          <InputRightAddon
            borderTopRightRadius="30"
            borderBottomRightRadius="30"
            bgColor="gray.200"
          >
            <FaSearch onClick={handleSearch} />
          </InputRightAddon>
        </InputGroup>
        <Flex w="100%" justifyContent="center" gap={5} flexWrap="wrap">
          {users.map((alumni) =>
            alumni.role ==="alumni" ? (
              <Flex
                p={3}
                minW={210}
                direction="column"
                border={"1.5px solid rgba(93,117,253, 0.3)"}
                gap={1}
                justifyContent="space-around"
                alignItems="center"
                borderRadius={10}
                boxShadow="md"
              >
                <Avatar size={"lg"} />
                <Flex direction="column" p={4} gap={3} alignItems={"center"}>
                  <Heading fontSize="18" color="gray.600">
                    {alumni.name}
                  </Heading>
                  <Badge color={"gray.600"} bgColor={"rgba(93,117,253, 0.3)"}>
                    {alumni.job}
                  </Badge>
                  <Flex>
                    <Text color={"gray.600"} fontWeight={"semibold"}>
                      {alumni.branch} | MEC'{alumni.year}
                    </Text>
                  </Flex>
                  <Button
                    mt={2}
                    borderRadius={"20"}
                    color={"white"}
                    onClick={() => handleAddFriendClick(alumni._id)}
                    bgColor={"rgba(100,138,242, 0.8)"}
                    _hover={{ bgColor: "rgba(100,138,242, 1)" }}
                  >
                    Connect
                  </Button>
                </Flex>
              </Flex>
            ) : null
          )}
        </Flex>
      </Flex>
    </div>
  );
};

export default AlumniCatalog;
