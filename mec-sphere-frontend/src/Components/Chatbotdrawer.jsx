import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Image, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
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
        <DrawerContent zIndex={4}>
          <DrawerCloseButton />
          <DrawerHeader textAlign={'center'}>PLACEMENT BOT</DrawerHeader>
          <DrawerBody>
            {/* Render the messages and their corresponding responses */}
            {messages.map((message, index) => (
              <React.Fragment key={`message-response-${index}`}>
                <Text textAlign={'center'} textColor={'white'} textTransform={'full-width'} display={'flex'} alignItems={'center'} bgColor={'teal'} ml={60} h={45} mb={10} mt={10} borderTopEndRadius={10} borderTopLeftRadius={15} paddingLeft={15}>{message}</Text>
                {responses[index] && (
                  <Text textAlign={'center'} textColor={'white'} textTransform={'full-width'} display={'flex'} alignItems={'center'} bgColor={'pink'} mr={60} h={60} mb={30} borderTopEndRadius={10} borderTopLeftRadius={15} paddingLeft={15}>{responses[index]}</Text>
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