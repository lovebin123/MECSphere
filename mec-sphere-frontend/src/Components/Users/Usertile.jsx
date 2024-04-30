import { Avatar, Badge, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { FaPlus, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Usertile = (props) => {
    return (
        <Flex p={3} direction="column" gap={1} justifyContent="space-around" alignItems="center" borderRadius={10} boxShadow="md">
            <Avatar size={'lg'} />
            <Flex direction="column" p={4} gap={3} alignItems={'center'}>
                <Heading fontSize="16" color="gray.700">{props.username}</Heading>
                <Button borderRadius={'20'} color={'white'} bgColor={'rgba(100,138,242, 0.8)'} _hover={{bgColor:'rgba(100,138,242, 1)'}}>Add Friend</Button>
            </Flex>
        </Flex>
    );
}

export default Usertile;