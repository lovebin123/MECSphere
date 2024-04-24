import { Avatar, Button, Flex, Text } from "@chakra-ui/react";

const Friendbox = (props) => {
    return (
        <Flex w={'100%'} borderRadius={'20'} p={3}boxShadow={'sm'} border={'1.5px solid lightblue '}  alignItems={'center'}  justifyContent={'space-between'}>
            <Flex alignItems={'center'} gap={3}>
                <Avatar size={'md'} />
                <Text>{props.username}</Text>
            </Flex>
            <Button colorScheme="teal">Message</Button>
        </Flex>
    );
}

export default Friendbox;