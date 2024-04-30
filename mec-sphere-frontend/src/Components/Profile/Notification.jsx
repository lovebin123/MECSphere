import { Avatar, Button, Divider, Flex, Text } from "@chakra-ui/react";

const Notification = (props) => {
    return (
        <Flex direction={'column'} gap={2} mt={2}>
            <Flex gap={5} alignItems={'center'} justifyContent={'space-between'}>
                <Flex alignItems={'center'} gap={1}>
                    <Text >{props.name}{props.msg}  </Text>
                </Flex>
                <Flex gap={1}>
                    <Button colorScheme="green">Accept</Button>
                    <Button colorScheme="red">Reject</Button>
                </Flex>
            </Flex>
            <Divider />
        </Flex>
    );
}

export default Notification;