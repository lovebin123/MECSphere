import { Avatar, Badge, Button, Flex, FormLabel, Input, InputGroup, InputRightAddon, Text } from '@chakra-ui/react';
import Topbar from '../Components/Profile/Topbar';
import { FaSearch } from 'react-icons/fa';
import Friendbox from '../Components/Profile/Friendbox';
import { useEffect, useState, useContext } from 'react';
import apiClient from "../services/api-client";
import io from "socket.io-client";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
const socket = io.connect("https://mecsphere.onrender.com");
function Profile() {
  
  const [friends, setfriends] = useState([]);
  const [filteredFriends,setFilteredFriends] = useState([])
  const[chatter, setChatter] = useState({name: "", room: ""});
  const { User, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch users data from the API
    const fetchFriends = async () => {
      try {
        const response = await apiClient.post("/user/friends", {id: User.id});
        console.log(response.data);
        setfriends(response.data);
        setFilteredFriends(response.data);
        console.log(filteredFriends);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchFriends();
  }, []);
  
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = friends.filter(
      (friend) =>
        friend.name.toLowerCase().includes(searchTerm) // Update property name to 'name'
    );
    setFilteredFriends(filtered);
  };
  
    
  return (
    <Flex position="relative" direction={'column'} maxH="100vh" w={'80vw'}>
      <Topbar />
      <Flex m={5} justifyContent={'space-between'}>
        <Flex direction={'column'} w={'50%'} gap={3} mt={-14}>
          <Flex alignItems={'center'} gap={3}>
            <Avatar size={'2xl'} mb={5} ml={25} outline={'15px solid white'}></Avatar>
            <Badge variant={'outline'} fontSize={'16'} mb={5} ml={25}  color={'gray.600'} bgColor={'rgba(93,117,253, 0.3)'}>{User.role}</Badge>
          </Flex>
          <Flex justifyContent={'space-between'}>
            <Flex direction={'column'}>
              <FormLabel>First Name</FormLabel>
              <Input name="name" placeholder={User.name} />
            </Flex>
            <Flex direction={'column'}>
              <FormLabel>Last Name</FormLabel>
              <Input name="name" placeholder={User.lastname} />
            </Flex>
          </Flex>
          <Flex justifyContent={'space-between'}>
            <Flex direction={'column'}>
              <FormLabel>Branch</FormLabel>
              <Input name="name" placeholder={User.user.branch} />
            </Flex>
            <Flex direction={'column'}>
              <FormLabel>Year of Graduation</FormLabel>
              <Input name="name" placeholder={User.user.year} />
            </Flex>
          </Flex>
          <Flex direction={'column'}>
            <FormLabel>Email Address</FormLabel>
            <Input placeholder={User.email} />
          </Flex>
          
        </Flex>
        <Flex direction={'column'} p={5} w={'40%'} gap={3}>
          <Text fontSize={'20'} fontWeight={'semibold'}>Your Friends</Text>
          <InputGroup >
            <Input placeholder='Search friends'onChange={handleSearch} />
            <InputRightAddon ><FaSearch /></InputRightAddon>
          </InputGroup>
          <Flex direction={'column'} gap={3}  style={{ overflowY: 'auto', maxHeight: '49vh' }} >
            {
              (filteredFriends).map((friend)=>(
                <Friendbox key={friend.id} username={friend.name} email={friend.email} userId = {friend._id}/>
              ))
            }
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Profile;
