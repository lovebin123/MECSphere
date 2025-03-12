import React from 'react'
import { Flex } from '@chakra-ui/react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,Text
  } from '@chakra-ui/react'
function QAtable() {
  return (
   <Flex>
    <TableContainer >
    <Text align={'center'} fontWeight={'bold'}>
        Most Answered by
    </Text>
  <Table variant='striped' colorScheme='blue'  mt={3} >
   
    <Thead >
      <Tr>
        <Th>Name</Th>
        <Th isNumeric>Count</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>george356</Td>
        <Td>20</Td>
       
      </Tr>
      <Tr>
        <Td>khushi54</Td>
        <Td>13</Td>
      
      </Tr>
      <Tr>
        <Td>anna89</Td>
        <Td>10</Td>
        
      </Tr>
    </Tbody>
   
  </Table>
</TableContainer>
   </Flex>
  )
}

export default QAtable