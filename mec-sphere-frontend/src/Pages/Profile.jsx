import { Avatar, Button, Flex, FormLabel, Input, InputGroup, InputRightAddon, Text } from '@chakra-ui/react';
import Topbar from '../Components/Profile/Topbar';
import { FaSearch } from 'react-icons/fa';
import Friendbox from '../Components/Profile/Friendbox';
import { useEffect, useState } from 'react';
function Profile() {
  const friends=[{id:1,username:'mary1',email:'mary1@gmail.com'},{id:2,username:'mary2',email:'mary2@gmail.com'},{id:3,username:'mary3',email:'mary3@gmail.com'}]
  const [filteredFriends,setFilteredFriends] = useState(friends)
  const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = friends.filter(
            (friend) =>
                friend.username.toLowerCase().includes(searchTerm)
        );
        setFilteredFriends(filtered);
    };
    
  return (
    <Flex position="relative" direction={'column'} maxH="100vh" w={'80vw'}>
      <Topbar />
      <Flex m={5} justifyContent={'space-between'}>
        <Flex direction={'column'} w={'50%'} gap={5} mt={-14}>
          <Avatar size={'2xl'} mb={5} ml={25}></Avatar>
          <Flex justifyContent={'space-between'}>
            <Flex direction={'column'}>
              <FormLabel>First Name</FormLabel>
              <Input name="name" placeholder='Mary Ann' />
            </Flex>
            <Flex direction={'column'}>
              <FormLabel>Last Name</FormLabel>
              <Input name="name" placeholder='Mary Ann' />
            </Flex>
          </Flex>
          <Flex direction={'column'}>
            <FormLabel>Email Address</FormLabel>
            <Input placeholder='maryannjose129@gmail.com' />
          </Flex>
          <Button colorScheme='teal' w={'25%'}>Save Changes</Button>
        </Flex>
        <Flex direction={'column'} p={5} w={'40%'} gap={3}>
          <Text fontSize={'20'} fontWeight={'semibold'}>Your Friends</Text>
          <InputGroup >
            <Input placeholder='Search friends'onChange={handleSearch} />
            <InputRightAddon ><FaSearch /></InputRightAddon>
          </InputGroup>
          <Flex direction={'column'} gap={3} >
            {
              (filteredFriends).map((friend)=>(
                <Friendbox key={friend.id} username={friend.username} email={friend.email}/>
              ))
            }
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Profile;
