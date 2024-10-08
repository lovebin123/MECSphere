import { Outlet } from 'react-router-dom';
import Sidebar from '../src/Components/Sidebar';
import { Button, Flex, Image, useDisclosure } from '@chakra-ui/react';
import Chatbotdrawer from '../src/Components/Chatbotdrawer';
import chatbot from './Images/chatbot.png'
import { useState } from 'react';

const Layout = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isChatbotOpen, setChatbotOpen] = useState(false);

    return (
        <Flex h={'100vh'} w={'100vw'} overflowX={'hidden'} bgColor={'gray.50'} alignItems={'start'} justifyContent={'space-between'} >
            <Sidebar />
            {!isChatbotOpen && ( // Render the button only if isChatbotOpen is false
                <Button
                    position="fixed"
                    bottom="20px"
                    right="20px"
                    w={50}
                    h={50}
                    borderRadius="50%"
                    cursor="pointer"
                    onClick={() => setChatbotOpen(!isChatbotOpen)}
                    zIndex={10000}
                    bgImage={chatbot}
                    bgRepeat={'no-repeat'}
                    bgSize={35}
                    
                    bgPos={'center'}
                    bgColor={'#34deec'}
                    _hover={{
                        bgSize: 30
                    }}
                />
            )}
            <Chatbotdrawer isOpen={isChatbotOpen} onClose={() => setChatbotOpen(false)} />
            <div style={{ overflowY: 'auto',overflowX:'hidden', maxHeight: 'calc(100vh - 2px)' }}>
                <Outlet />
            </div>
        </Flex>
    );
};

export default Layout;
