import { Avatar, Button, Flex, FormLabel, Input, InputGroup, InputRightAddon, Text } from '@chakra-ui/react';
import Topbar from '../Components/Profile/Topbar';
import { FaSearch } from 'react-icons/fa';
import Friendbox from '../Components/Profile/Friendbox';
function Profile() {
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
            <Input placeholder='Search friends' />
            <InputRightAddon ><FaSearch /></InputRightAddon>
          </InputGroup>
          <Flex direction={'column'} gap={3} >
          <Friendbox/>
          <Friendbox/>
          <Friendbox/>
          <Friendbox/>
          <Friendbox/>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Profile;
