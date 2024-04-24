import { Button, Flex, FormControl, FormLabel, Heading, Input, Select, useToast } from "@chakra-ui/react";
import { useState } from "react";
import apiClient from "../services/api-client";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submit = () => {
    apiClient
      .post("/user/sign", formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        toast({
          title: error.message,
          position: 'top'
        });
      });
  };

  return (
    <Flex justifyContent={"center"} alignItems={"center"} h={"100vh"}>
      <Flex
        w={"40vw"}
        direction={"column"}
        border={['none', '1px']}
        borderColor={['', 'gray.300']}
        borderRadius={10}
        boxShadow="md"
        p={7}
        gap={6}
      >
        <Heading as="h1" size="xl" textAlign="center" mb={6}>
          Sign Up
        </Heading>
        <Flex direction={"row"} gap={3}>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input type="text" name="firstName" onChange={handleChange}></Input>
          </FormControl>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input type="text" name="lastName" onChange={handleChange}></Input>
          </FormControl>
        </Flex>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type="email" name="email" onChange={handleChange}></Input>
        </FormControl>
        <Flex direction={"row"} gap={3}>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" name="password" onChange={handleChange}></Input>
          </FormControl>
          <FormControl>
            <FormLabel>Role</FormLabel>
            <Select name="role" onChange={handleChange}>
              <option value="alumni">Alumni</option>
              <option value="student">Student</option>
            </Select>
          </FormControl>
        </Flex>
        <Button colorScheme="blue" onClick={submit}>
          Sign Up
        </Button>
      </Flex>
    </Flex>
  );
};

export default Signup;
