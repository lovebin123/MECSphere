import { Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";

const Signup = () => {
    const [formData,setFormData]=useState({username:'',email:'',password:''})
    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]: e.target.value });
        console.log(formData)
    }
    return ( 
        <Flex justifyContent={'center'} alignItems={'center'} h={'100vh'}>
            <Flex w={'30vw'} direction={'column'} boxShadow={'md'} p={3} gap={2} >
            <FormLabel>Username</FormLabel>
            <Input type="username" name="username" onChange={handleChange}></Input>
            <FormLabel>Email address</FormLabel>
            <Input type="email" name="email"onChange={handleChange}></Input>
            <FormLabel> Password</FormLabel>
            <Input type="password" name="password" onChange={handleChange}></Input>
            <Button colorScheme="blue">Signup</Button>
        </Flex>
        </Flex>
     );
}
 
export default Signup;