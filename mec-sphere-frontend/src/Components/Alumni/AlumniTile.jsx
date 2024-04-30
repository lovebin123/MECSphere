// AlumniTile.js
import React from 'react';
import { Flex, Image, Button, Badge, Heading, Text } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'

const AlumniTile = ({ alumni }) => {
    return (
        <Flex
            cursor="pointer"
            position="relative"
            w="16vw"
            p={3}
            direction="column"
            gap={1}
            justifyContent="space-around"
            alignItems="center"
            borderRadius={10}
            boxShadow="md"
        >
            <Avatar size='lg'/>
            <Flex direction="column" w={200} pl={7} pt={3} pb={4} gap={2}>
                
                <Flex justifyContent="space-between">
                    <Flex direction="column">
                        <Heading fontSize="16" color="gray.700" textAlign='center'>
                            {alumni.name}
                        </Heading>
                        <Badge
                    maxW="max-content"
                    display="flex"
                    alignItems="center"
                    gap="1"
                    colorScheme="green"
                >
                    <FaStar />
                    {alumni.job}
                </Badge>
                        {/* Optional: You can display additional details about the alumni here */}
                        <Text fontSize="12" fontWeight="semibold" color="gray.600">
                            {/* Additional details */}
                        </Text>
                    </Flex>
                    {/* Optional: You can display additional information here */}
                </Flex>
            </Flex>
            <Link to={`/alumni/${alumni.id}`}>
                <Button
                    _hover={{ bgColor: "green.200" }}
                    size="sm"
                    bgColor="green.100"
                    borderRadius={10}
                >
                    View Details
                </Button>
            </Link>
        </Flex>
    );
}

export default AlumniTile;
