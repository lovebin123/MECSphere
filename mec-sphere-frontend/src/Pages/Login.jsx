import React, { useState, useContext } from 'react';
import { Box, VStack, HStack, Heading, Text, FormControl, FormLabel, Input, Checkbox, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api-client';
import AuthContext from '../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
      setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
      setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
      e.preventDefault();

      apiClient
          .post("/user/login", {
              email: email,
              password: password,
          })
          .then((response) => {
              localStorage.setItem("token", response.data.token);
              setUser({
                  id: response.data.id,
                  name: response.data.name,
                  token: response.data.token,
                  role: response.data.role,
                  status: true,
                  user: response.data.user,
                  email: response.data.email,
                  friends: response.data.friends,
              });
              navigate("/dash");
          })
          .catch((error) => {
              alert(error);
          });

      setEmail("");
      setPassword("");
  };

  return (
      <Box
          w={['full', 'md']}
          p={[8, 10]}
          mt={[20, '10vh']}
          mx='auto'
          border={['none', '1px']}
          borderColor={['', 'gray.300']}
          borderRadius={10}
          boxShadow="md"
      >
          <VStack spacing={6} align='stretch' maxW='400px' mx='auto'>
              <Heading as='h1' size='xl' textAlign='center'>Login</Heading>
              <FormControl>
                  <FormLabel pl='0.3rem'>Email Address</FormLabel>
                  <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={handleUsernameChange}
                  />
              </FormControl>
              <FormControl>
                  <FormLabel pl='0.3rem'>Password</FormLabel>
                  <Input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={handlePasswordChange}
                  />
              </FormControl>
              <HStack justify='space-between'>
                  <Checkbox>Remember me</Checkbox>
                  <Button variant='link' colorScheme='blue' color={'#5db1fd'}>Forgot Password?</Button>
              </HStack>
              <Button colorScheme='blue' borderRadius='10px' bgColor='#5db1fd' onClick={handleSubmit}>Login</Button>
              <Text textAlign='center'>
                  Don't have an account? <Button variant='link' color={'#5db1fd'} onClick={() => navigate("/signup")} >Register now</Button>
              </Text>
          </VStack>
      </Box>
  );
}
