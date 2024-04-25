import { Avatar, Button, Flex, Text, HStack, Box, Heading, Stack, StackDivider, CardHeader, Card, CloseButton, CardBody, CardFooter, Input } from "@chakra-ui/react";
import { useEffect } from "react";
import { useRef, useState } from "react";
import Draggable from 'react-draggable';
import ScrollToBottom from "react-scroll-to-bottom";

const ChatWindow = ({ onClose, userName }) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([{ room: '12', author: 'you', message: 'hello' }, { room: '12', author: 'others', message: 'hello' }, { room: '12', author: 'others', message: 'how are you' }]);
    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: '12',
                author: 'you',
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    };



    const firstFieldRef = useRef(null);
    return (
        <Draggable>
            <Card position="absolute"
                right="50px"
                top="50px"
                h={'450'}
                maxW={'400'}
                background="white"
                borderRadius="lg"
                boxShadow="md"
                zIndex={10}>
                <CardHeader bgColor={'blue.100'} borderTopRightRadius={'lg'} borderTopLeftRadius={'lg'}>
                    <HStack justifyContent="space-between">
                        <HStack>
                            <Avatar mr={2} />
                            <Text fontWeight={'semibold'}>{userName}</Text>
                        </HStack>
                        <CloseButton onClick={onClose} />
                    </HStack>
                </CardHeader>
                <CardBody overflowY={'auto'}>
                    <Flex direction="column" gap={3}>
                        {messageList.map((messageContent, index) => (
                            <Flex w={'100%'}  justifyContent={messageContent.author === 'you' ? 'flex-end' : 'flex-start'} >
                                <Text color={'white'}  key={index} maxW={'60%'} borderRadius={10} p={3} bgColor={messageContent.author === 'you' ? 'rgba(105,101,219, 0.6)' : 'rgba(93,137,253, 0.6)'}>
                                    {messageContent.message}
                                </Text>
                            </Flex>
                        ))}
                    </Flex>
                </CardBody>
                <CardFooter>
                    <HStack w={'100%'}>
                        <Input value={currentMessage}
                            placeholder="Type your message"
                            onChange={(event) => {
                                setCurrentMessage(event.target.value);
                            }}
                            onKeyDown={(event) => {
                                event.key === "Enter" && sendMessage();
                            }} />
                        <Button onClick={sendMessage} >Send</Button>
                    </HStack>
                </CardFooter>
            </Card>

        </Draggable>
    );
};

export default ChatWindow;


