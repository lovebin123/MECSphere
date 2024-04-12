import { Button,Flex, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Image, Input, Text,Box, Container } from "@chakra-ui/react";
import React, { useState } from "react";
import meclogo from '../Images/mec_logo.jpg'
import '../Pages/Home.css'
const Loader = () => (
    <div className="loader"></div>
  );
const Chatbotdrawer = ({ isOpen, onClose }) => {
      const [query, setQuery] = useState('');
      const [messages, setMessages] = useState([]);
      const [responses, setResponses] = useState([]);
      const [loading, setLoading] = useState(false);
      const handleMessageChange = (event) => {
        setQuery(event.target.value);
      };
    
      const handleSendMessage = async () => {
        // Add the current query to messages array
        setMessages([...messages, query]);
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
    
            // Add the received response to responses array
            setResponses([...responses, data]);
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
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'md'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader textAlign={'center'}>PLACEMENT BOT</DrawerHeader>
          <DrawerBody>
        
            {/* Render the messages and their corresponding responses */}
            {messages.map((message, index) => (
              <React.Fragment key={`message-response-${index}`}>
                <Text textAlign={'center'} className="typed" textColor={'white'} display={'flex'} p={'1em'} alignItems={'center'} bgColor={'teal'} ml={60}  mb={10} mt={10} borderTopEndRadius={10} borderTopLeftRadius={15} paddingLeft={15}>{message}</Text>
                {responses[index] && (
  <Flex  gap={3}>
  <Image src="https://www.mec.ac.in/static/media/collegelogohollow.f2e70403.png" borderRadius={50} w={'40px'} h={'45px'} />

    <Text
      className="typed"
      textColor="white"
     
      bgColor="pink"
      

      mb={30}
      borderTopEndRadius={10}
      borderTopLeftRadius={'-2'}
      width={'12vw'}
      p={'1em'}
    >
      {responses[index]}
    </Text>
  </Flex>
)}
              </React.Fragment>
            ))}
            {loading && <Loader />} {/* Display loader if loading */}
          </DrawerBody>
          <DrawerFooter>
            <Input placeholder="Type your message here" value={query} onChange={handleMessageChange} />
            <Button height={0} onClick={handleSendMessage}>
              <Image src="https://img.icons8.com/fluency/100/sent.png" boxSize={8} />
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
     );
}
 
export default Chatbotdrawer;