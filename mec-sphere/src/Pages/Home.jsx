import React, { useState } from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Flex,
  Button,
  Image,
  Input,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import meclogo from '../Images/mec_logo.jpg';
import { Text } from '@chakra-ui/react'
function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');

  const handleMessageChange = (event) => {
    setQuery(event.target.value);
  };

  const handleClearInput = () => {
    setQuery('');
  };

  const handleSendMessage = () => {
    // Update the message state with the value of query
    setMessage(query);
    console.log(query)
    // Optionally, clear the input field after sending the message
    setQuery('');
  };

  return (
    <Flex position="relative" minHeight="100vh" justifyContent="center" alignItems="center">
      {/* Button stays fixed in the bottom right corner */}
      <Button
        position="fixed"
        bottom="20px"
        right="20px"
        w={50}
        h={50}
        borderRadius="50%"
        cursor="pointer"
        onClick={onOpen}
        color={'blue'}
      >
        <Image src={meclogo} boxSize={'5'} borderRadius={'full'} />
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'md'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader textAlign={'center'}>PLACEMENT BOT</DrawerHeader>
          <DrawerBody>
            <Text textAlign={'center'} textColor={'white'} textTransform={'full-width'} display={'flex'} alignItems={'center'} bgColor={'teal'} ml={60} h={45} borderTopEndRadius={10} borderTopLeftRadius={15} paddingLeft={15}>{message}</Text>
          </DrawerBody>
          <DrawerFooter>
            <Input placeholder="Type your message here" value={query} onChange={handleMessageChange} />
            <Button height={0} onClick={handleSendMessage}>
              <Image src="https://img.icons8.com/fluency/100/sent.png" boxSize={8} />
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default Home;
