import { Avatar, Button, Divider, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";
import Notification from "./Notification";
const Topbar = () => {
    const chatReq=[{id:1,user:'mary1'},{id:2,user:'mary2'}];
    const friendReq=[{id:1,user:'mary3'},{id:2,user:'mary4'}];
    return (
        <Flex bgColor={'blue.50'} h={'120'} w={'100%'} alignItems={'center'} gap={5} justifyContent={'end'} p={2}>
            <Menu>
                {({ isOpen }) => (
                    <>
                        <MenuButton isActive={isOpen} as={Button}>
                            <FaBell />
                        </MenuButton>
                        <MenuList p={3} overflowY={'auto'} maxHeight={'60vh'}>
                            <Text fontWeight={'semibold'} fontSize={'19'} mb={5}>Notifications</Text>
                            {
                                chatReq.map((noti1)=>(
                                    <Notification key={noti1.id} type={'chatreq'} name={noti1.user} msg={" has requested to chat with you"}/>
                                ))}{
                                friendReq.map((noti2)=>(
                                    <Notification key={noti2.id} type={'friendreq'} name={noti2.user} msg={" has requested to be your friend"}/>
                                ))
                            }
                        </MenuList>
                    </>
                )}
            </Menu>
            <Button colorScheme="teal">Logout</Button>
        </Flex>
    );
}

export default Topbar;