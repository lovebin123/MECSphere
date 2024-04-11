import { Flex } from '@chakra-ui/react';
import Barchart from '../Components/Placements/Barchart';
import DonutChart from '../Components/Placements/Donutchart';
function Placements() {
  return (
    <Flex position="relative" h="100vh" w={'80vw'} justify={'column'} gap={1} p={2}>
        <Flex gap={2}>
            <Barchart/>
            <DonutChart/>
        </Flex>
    </Flex>
  );
}

export default Placements;
