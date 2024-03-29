import { Outlet } from 'react-router-dom';
import Sidebar from '../src/Components/Sidebar';
import { Button, Flex, Image, useDisclosure } from '@chakra-ui/react';
import Chatbotdrawer from '../src/Components/Chatbotdrawer';
import meclogo from '../src/Images/mec_logo.jpg';
import { useState } from 'react';
const Layout = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isChatbotOpen, setChatbotOpen] = useState(false);
    return (
        <Flex h={'100vh'} w={'100vw'} bgColor={'gray.50'} alignItems={'start'} justifyContent={'space-between'}>
            <Sidebar />
            <Button
                position="fixed"
                bottom="20px"
                right="20px"
                w={50}
                h={50}
                zIndex={10000}
                borderRadius="50%"
                cursor="pointer"
                onClick={() => setChatbotOpen(!isChatbotOpen)}
            >
                <Image src={meclogo} boxSize={'6'} borderRadius={'full'} />
            </Button>
            <Chatbotdrawer isOpen={isChatbotOpen} onClose={() => setChatbotOpen(false)} />
            <div>
                <Outlet />
            </div>
        </Flex>
    );
};

export default Layout;