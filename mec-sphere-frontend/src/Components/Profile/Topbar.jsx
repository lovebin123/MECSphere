import { Button, Flex } from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";
const Topbar = () => {
    return ( 
        <Flex  bgColor={'blue.50'} h={'120'} w={'100%'} alignItems={'center'} gap={5} justifyContent={'end'}p={2}>
            <Button colorScheme="teal"><FaBell />
            </Button>
            <Button colorScheme="teal">Logout</Button>
        </Flex>
     );
}
 
export default Topbar;