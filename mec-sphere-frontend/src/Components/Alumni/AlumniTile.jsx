// AlumniTile.js
import React from 'react';
import { Flex, Image, Button, Badge, Heading, Text } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'

const AlumniTile = ({ alumni }) => {
    return (
        <Flex p={3} minW={210} direction="column" border={"1.5px solid rgba(93,117,253, 0.3)"}  gap={1} justifyContent="space-around" alignItems="center" borderRadius={10} boxShadow="md">
            <Avatar size={'lg'} />
            <Flex direction="column" p={4} gap={3} alignItems={'center'}>
                <Heading fontSize="18" color="gray.600">{alumni.name}</Heading>
                <Badge  color={'gray.600'} bgColor={'rgba(93,117,253, 0.3)'}>{alumni.job}</Badge>
                <Flex>
                    <Text color={'gray.600'} fontWeight={'semibold'} >{alumni.branch}   |  MEC'{alumni.pass_out}</Text>
                </Flex>
                <Button mt={2} borderRadius={'20'} color={'white'} bgColor={'rgba(100,138,242, 0.8)'} _hover={{bgColor:'rgba(100,138,242, 1)'}}>Add Friend</Button>
            </Flex>
        </Flex>
    );
}

export default AlumniTile;
