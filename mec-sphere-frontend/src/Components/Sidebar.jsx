import { Flex, Tabs, Tab, TabList, Heading, Divider, Avatar, Text, Button } from "@chakra-ui/react";
import { FaChevronRight, FaHome,FaUser } from "react-icons/fa";
import { IoRocketSharp,IoPeople  } from "react-icons/io5";
import { MdQuestionAnswer } from "react-icons/md";
import { Link } from "react-router-dom";
const Sidebar = () => {
    
    return (
        <Flex h={'100vh'} w={'20vw'} bgColor={'gray.50'} boxShadow={'lg'} flexDirection={'column'} p={4} gap={7} justifyContent={'space-between'}>
            <Flex flexDirection={'column'} gap={7}>
                <Heading fontSize={'x-large'} color={'gray.800'}>MECSphere</Heading>
                <Tabs variant='soft-rounded' colorScheme="blue" flexDirection={'column'} display={'flex'}>
                    <TabList flexDirection="column" w={'18vw'} gap={2}>
                        <Tab as={Link} to="/dash" sx={{ borderRadius: '10px'}} display={'flex'} justifyContent={'start'} gap={3}><FaHome />Home</Tab>
                        <Tab as={Link} to="/dash/placements" sx={{ borderRadius: '10px'}} display={'flex'} justifyContent={'start'} gap={3}><IoRocketSharp />Placements</Tab>
                        <Tab as={Link} to="/dash/alumniconnect" sx={{ borderRadius: '10px'}} display={'flex'} justifyContent={'start'} gap={3}><IoPeople />Alumni Connect</Tab>
                        <Tab as={Link} to="/dash/qa" sx={{ borderRadius: '10px'}} display={'flex'} justifyContent={'start'} gap={3}><MdQuestionAnswer />Q&A</Tab>
                        <Tab as={Link} to="/dash/profile" sx={{ borderRadius: '10px'}} display={'flex'} justifyContent={'start'} gap={3}><FaUser />Profile</Tab>
                    </TabList>
                </Tabs>
            </Flex>
        </Flex>
    );
}

export default Sidebar;