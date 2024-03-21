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
  Text, // Import Text component
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import meclogo from '../Images/mec_logo.jpg';
import './Home.css'
// Loader component
const Loader = () => (
  <div className="loader"></div>
);

function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false); // State to track loading status

  const handleMessageChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSendMessage = async () => {
    // Update the message state with the value of query
    setMessage(query);
    setLoading(true); // Set loading state to true when sending message
    
    try {
      // Send the query to the Express server
      const response = await fetch('/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (response.ok) {
        // Get the response data as plain text
        const data = await response.text();
        console.log('Response:', data); // Print the response

        // Update the response state with the received data
        setResponse(data);
      } else {
        console.error('Failed to send query');
      }
    } catch (error) {
      console.error('Error sending query:', error);
    } finally {
      setLoading(false); // Set loading state to false after receiving response
    }

    // Clear the input field after sending the message
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
        <Image src={meclogo} boxSize={'6'}  borderRadius={'full'} />
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'md'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader textAlign={'center'}>PLACEMENT BOT</DrawerHeader>
          <DrawerBody>
            {/* Render the query if it exists */}
            {message && (
              <Text textAlign={'center'} textColor={'white'} textTransform={'full-width'} display={'flex'} alignItems={'center'} bgColor={'teal'} ml={60} h={45} borderTopEndRadius={10} borderTopLeftRadius={15} paddingLeft={15}>{message}</Text>
            )}
          
            {/* Render the response or loader based on loading status */}
            {loading ? (
              <Loader />
            ) : (
              response && (
                <Text textAlign={'center'} textColor={'white'} textTransform={'full-width'} display={'flex'} alignItems={'center'} bgColor={'pink'} mr={60} h={60} mt={30} borderTopEndRadius={10} borderTopLeftRadius={15} paddingLeft={15}>{response}</Text>
              )
            )}
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
