import { Button, Flex, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { useState } from "react";
import apiClient from "../services/api-client";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
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
        console.log(error);
      });
  };
  return (
    <Flex justifyContent={"center"} alignItems={"center"} h={"100vh"}>
      <Flex w={"30vw"} direction={"column"} boxShadow={"md"} p={3} gap={2}>
        <FormLabel>Username</FormLabel>
        <Input type="name" name="name" onChange={handleChange}></Input>
        <FormLabel>Email address</FormLabel>
        <Input type="email" name="email" onChange={handleChange}></Input>
        <FormLabel> Password</FormLabel>
        <Input type="password" name="password" onChange={handleChange}></Input>
        <FormLabel>Role</FormLabel>
        <Select name="role" onChange={handleChange}>
          <option value="alumni">Alumni</option>
          <option value="student">Student</option>
        </Select>
        <Button colorScheme="blue" onClick={submit}>
          Signup
        </Button>
      </Flex>
    </Flex>
  );
};

export default Signup;
