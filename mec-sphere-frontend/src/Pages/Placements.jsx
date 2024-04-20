import { Divider, Flex, Heading, Image, Text } from '@chakra-ui/react';
import Barchart from '../Components/Placements/Barchart';
import DonutChart from '../Components/Placements/Donutchart';
import banner from '../Images/banner.svg'
import high from '../Images/deshaw.svg'
import comp1 from '../Images/deloitte.png'
import comp2 from '../Images/airindia.png'
import comp3 from '../Images/ibm.png'
import Tablecomp from '../Components/Placements/Tablecomp';
import { useEffect, useState } from 'react';
function Placements() {
  const [studentsPlaced, setStudentsPlaced] = useState(0);
  useEffect(() => {
    let interval
    const animateCounter = () => {
      let counter = 0;
      const interval = setInterval(() => {
        counter++;
        setStudentsPlaced(counter);
        if (counter >= 250) {
          clearInterval(interval);
        }
      }, 20);
    };
    animateCounter();
    return () => clearInterval(interval);
  }, []);
  return (
    <Flex  position="relative"  w={'80vw'} flexDirection={'column'} gap={2} p={2}>
      <Flex m={3} justifyContent={'center'} alignItems={'center'} >
        <Flex direction={'column'} flex={{ base: 1, md: 'unset' }}>
          <Flex gap={10}>
            <Flex h={160} w={{ base: '100%', md: '50%' }} borderRadius={10} alignItems={'center'} bgColor={'rgba(177,196,248,0.5)'} justifyContent={'space-between'} boxShadow={'sm'}>
              <Flex p={3} direction={'column'} color={'blue.800'} ml={4} minW={150}>
                <Heading mb={3}>{studentsPlaced}+</Heading>
                <Text fontWeight={'semibold'}>Students Placed</Text>
              </Flex>
              <Image h={185} w={250} mr={-20} src={banner} />
            </Flex>
            <Flex gap={2} pt={10} h={160} w={{ base: '70%', md: '40%' }} boxShadow={'sm'} bgColor={'teal.100'} borderRadius={10} p={4} direction={'column'} ml={3} >
              <Text fontWeight={'semibold'}>Highest Package</Text>
              <Heading fontSize={25}>55 LPA</Heading>
              <Image src={high} h={100} w={100} mt={-39} />
            </Flex>
          </Flex>
          <Flex mt={'3'} alignItems={'center'} justifyContent={'center'}> 
            <Barchart w={'100%'}/>
          </Flex>
        </Flex>
        <Flex direction={'column'} bgColor={'gray.50'} boxShadow={'sm'} alignItems={'center'} >
          <DonutChart />
          <Divider mt={-30} />
          <Flex gap={3} direction={'column'} mt={4} w={'20vw'}>
            <Text fontWeight={'semibold'}>Top Recruiters</Text>
            <Flex direction={'column'} gap={3}>
              <Flex boxShadow={'sm'} borderRadius={'10'} p={5} justify={'space-between'}alignItems={'center'}>
                <Image src={comp1} h={'20px'}/>
                <Text color={'gray.600'}fontWeight={'semibold'}>12 placed</Text>
              </Flex>
              <Flex boxShadow={'sm'} p={5} justify={'space-between'}alignItems={'center'}>
                <Image src={comp2} h={'20px'}/>
                <Text color={'gray.600'}fontWeight={'semibold'}>11 placed</Text>
              </Flex>
              <Flex boxShadow={'sm'} p={5} justify={'space-between'}alignItems={'center'}>
                <Image src={comp3} h={'20px'}/>
                <Text color={'gray.600'}fontWeight={'semibold'}>8 placed</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Tablecomp/>
    </Flex>
  );
}

export default Placements;
{/* 
<Flex gap={2}>
            <Barchart/>
            <DonutChart/>
        </Flex>
        <Tablecomp/>*/}
