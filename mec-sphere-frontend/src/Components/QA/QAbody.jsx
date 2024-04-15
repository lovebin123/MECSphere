import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody, CardFooter, Flex, Image, Text, useDisclosure } from '@chakra-ui/react';
import './QAbody.css'
function QAbody() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);

  const toggleButtonColor = (index) => {
    if (selectedButtonIndex === index) {
      setSelectedButtonIndex(null);
    } else {
      setSelectedButtonIndex(index);
    }
  };

  return (
    <Flex justifyContent='flex-start' alignContent={'space-between'}  mt={12}>
      <Flex gap={10}>
        {[0, 1].map((index) => ( // Loop through an array to generate cards
          <Card key={index} maxW="sm" maxH="lg" boxShadow={' rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;'}>
            <CardHeader>
              <Image w="60px" h="60px" marginTop={-35} marginRight={20} borderRadius={50} src={index === 0 ? "https://people.com/thmb/4nQ7-MjL_jCoW-JofmlUcCHabJs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(599x0:601x2):format(webp)/new-dad-ed-sheeran-44dcff70fc8a40b1be722788d8253c25.jpg" : "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
              <Flex direction="column" gap={5}>
                <Text fontSize={10}>Yesturday</Text>
                <Text fontSize={'large'} fontWeight={'bold'}  textAlign="center">
                  What will drinking one cup of green tea a day do to my health?
                </Text>
              </Flex>
            </CardHeader>
            <CardBody>
              As an owner of tea business for eight running now, I get asked this question and like it all the time. People want me to recommend a tea to cure their cancer, halitosis, premature balding, and tennis
            </CardBody>
            <CardFooter>
              <Button
                position="absolute"
                right={1}
                mt={-6}
                colorScheme='none'
                border="none"
                className="btn"
                color={selectedButtonIndex === index ? "red" : "gray"} // Check if current button index matches selected index
                onClick={() => toggleButtonColor(index)} // Pass button index to toggleButtonColor function
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                </svg>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </Flex>
    </Flex>
  );
}

export default QAbody;
