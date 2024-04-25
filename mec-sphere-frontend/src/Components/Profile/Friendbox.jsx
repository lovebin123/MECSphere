import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, CloseButton, Flex, FocusLock, HStack, Heading, Icon, Input, Popover, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverTrigger, Stack, StackDivider, Text, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import Draggable from "react-draggable";
import ChatWindow from "./Chatwindow";


const Friendbox = (props) => {
    const { onOpen, onClose, isOpen } = useDisclosure();
    const [showChatbox, setShowChatbox] = useState(false);
    const firstFieldRef = useRef(null);

    const handleChatClick = () => {
        setShowChatbox(!showChatbox);
    };

    return (
        <Flex w={'100%'} borderRadius={'20px'} p={3} boxShadow={'sm'} border={'1.5px solid lightblue'} alignItems={'center'} justifyContent={'space-between'}>
            <Flex alignItems={'center'} gap={3}>
                <Avatar size={'md'} />
                <Text>{props.username}</Text>
            </Flex>
            <Button colorScheme="teal" onClick={handleChatClick}>Message</Button>
            {showChatbox && <ChatWindow userName={props.username} onClose={handleChatClick}/>}
        </Flex>
    );
}

export default Friendbox;
