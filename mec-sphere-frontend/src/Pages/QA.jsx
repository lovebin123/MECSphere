import { Button, Container, Flex, HStack, Image, Input, VStack, Text, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

import QAbody from '../Components/QA/QAbody';
import QAquestions from '../Components/QA/QAquestions';

function QA() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [question, setQuestion] = useState('');

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = () => {
    console.log(question); // This will print the value of the input field
    setQuestion(''); // Clear the input field after submitting
  };

  return (
    <Flex  direction={'column'} h="100vh" w={'80vw'} gap={10}>
      <Container
        mt={10}
       boxShadow={'sm'}
        borderRadius={12}
        
        h={'120px'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        onClick={onOpen}
        cursor={'pointer'}
      >
        <Flex gap={1}>
        <Image src='https://img.icons8.com/color/48/circled-user-male-skin-type-3--v1.png' w={'45px'} h={'45px'} mt={'-2'} />

          <Flex direction={'column'} alignItems={'flex-start'} gap={4}  >
            <Input
              h={8}
              width={'28rem'}
              color={'gray'}
              cursor={'pointer'}
              
            />
              <Button onClick={handleSubmit} bgColor={'#5db1fd'}   >
            <Flex   >
              <Image src='https://img.icons8.com/material-outlined/96/ask-question.png' w={6} />
              <Text>Ask</Text>
            </Flex>
          </Button>
          </Flex>
        
        </Flex>
      </Container>
      <Tabs>
  <TabList>
    <Tab>Answers</Tab>
    <Tab>Question</Tab>
   
  </TabList>

  <TabPanels>
    <TabPanel>
    <QAbody/>
    </TabPanel>
    <TabPanel>
   <QAquestions/>
    </TabPanel>
  </TabPanels>
</Tabs>
     
      <Modal closeOnOverlayClick={false} size={'md'} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={'center'}>Ask Your Question here</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
  <Input
    variant={'flushed'}
    placeholder='Start your question with "What","Why","How" etc'
    mb={20}
    _focus={{ border: 'none' }}
    value={question}
    onChange={handleInputChange}
  />
</ModalBody>

          <ModalFooter>

            <Button mr={3} onClick={onClose} bgColor={'transparent'}
          
            >
              Close
            </Button>
            <Button colorScheme='blue' onClick={handleSubmit} disabled={question.trim() === ''} style={{ cursor: question.trim() === '' ? 'not-allowed' : 'pointer' }}>
  Add question
</Button>


                  </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default QA;
