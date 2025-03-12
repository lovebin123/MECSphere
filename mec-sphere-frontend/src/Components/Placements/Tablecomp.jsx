import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'
const Tablecomp = () => {
    return (
        <TableContainer borderRadius={5} p={4}>
            <Table variant='striped' >
                <Thead bgColor={'rgba(120,138,242, 0.6)'} >
                    <Tr >
                        <Th>Company</Th>
                        <Th>CSE</Th>
                        <Th>ECE</Th>
                        <Th>EEE</Th>
                        <Th>EBE</Th>
                        <Th>MECH</Th>
                        <Th>Total</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>Deloitte</Td>
                        <Td>5</Td>
                        <Td>3</Td>
                        <Td>2</Td>
                        <Td>2</Td>
                        <Td>0</Td>
                        <Td>12</Td>
                    </Tr>
                    <Tr>
                        <Td>Air India</Td>
                        <Td>6</Td>
                        <Td>4</Td>
                        <Td>1</Td>
                        <Td>0</Td>
                        <Td>0</Td>
                        <Td>11</Td>
                    </Tr>
                    <Tr>
                        <Td>IBM</Td>
                        <Td>3</Td>
                        <Td>3</Td>
                        <Td>2</Td>
                        <Td>0</Td>
                        <Td>0</Td>
                        <Td>8</Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    );
}

export default Tablecomp;