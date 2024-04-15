import React, { useState } from 'react';
import { Center, Divider, Textarea } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { Button, Flex, Text, useDisclosure, useToast } from '@chakra-ui/react';
import QAtable from './QAtable';

function QAquestions() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [textValue, setTextValue] = useState(""); // State variable to store textarea content
  const [answers, setAnswers] = useState([]); // State variable to store answers
  const [currentQuestion, setCurrentQuestion] = useState(""); // State variable to store the current question
  const toast = useToast(); // To use the toast

  const handleTextareaChange = (event) => {
    setTextValue(event.target.value); // Update the state variable with textarea content
  };

  const handleOpenModal = (question) => {
    setCurrentQuestion(question); // Set the current question when opening the modal
    onOpen(); // Open the modal
  };

  const handlePost = () => {
    const newAnswer = textValue.trim(); // Remove leading and trailing whitespace
    if (newAnswer) {
      setAnswers([...answers, { question: currentQuestion, answer: newAnswer }]); // Add the new answer with its question to the answers array
      onClose(); // Close the modal after posting the answer
      // Display the toast
      toast({
        title: 'Answer posted.',
        description: 'Your answer has been successfully posted.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position:'top'
      });
      setTextValue(""); // Clear the textarea value
    } else {
      // If the answer is empty, show an error toast
      toast({
        title: 'Empty Answer',
        description: 'Please provide an answer before posting.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position:'top'
      });
    }
  };

  return (
    <Flex direction={'row'} justifyContent={'space-evenly'}>
    <Flex direction={'column'} gap={5}>
    
      <Center>
        <Divider w={'40vw'} borderColor={'blue.200'} />
      </Center>
      <Text textAlign={'center'} fontWeight={'bold'} fontSize={'xl'}>
        What is the maximum number of trailing zeros?
      </Text>
      <Flex justifyContent={'center'} direction={'row'} alignItems={'center'} gap={10}>
        <Button onClick={() => handleOpenModal("What is the maximum number of trailing zeros?")} bgColor='#5db1fd'>
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g stroke-width="1.5" fill="none" fill-rule="evenodd">
              <path d="M18.571 5.429h0a2 2 0 0 1 0 2.828l-9.9 9.9-4.24 1.416 1.412-4.245 9.9-9.9h0a2 2 0 0 1 2.828 0Z" class="icon_svg-stroke" stroke="#666" stroke-linecap="round" stroke-linejoin="round"></path>
              <path class="icon_svg-fill_as_stroke" fill="#666" d="m4.429 19.571 2.652-.884-1.768-1.768z"></path>
              <path d="M14.5 19.5h5v-5m-10-10h-5v5" class="icon_svg-stroke" stroke="#666" stroke-linecap="round" stroke-linejoin="round"></path>
            </g>
          </svg>
          <Text textColor={'black'}>
          Answer
          </Text>
        </Button>
        <Text fontSize={'10'}>
          asked 17 hours ago by <b>joseph</b>
        </Text>
        
      </Flex>

      <Center>
        <Divider w={'40vw'} borderColor={'blue.200'} />
      </Center>
      <Text textAlign={'center'} fontWeight={'bold'} fontSize={'xl'}>
      How many digits are there in "8984692"
      </Text>
      <Flex justifyContent={'center'} direction={'row'} alignItems={'center'} gap={10}>
        <Button onClick={() => handleOpenModal("How many digits are there in '8984692'?")} bgColor='#5db1fd'>
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g stroke-width="1.5" fill="none" fill-rule="evenodd">
              <path d="M18.571 5.429h0a2 2 0 0 1 0 2.828l-9.9 9.9-4.24 1.416 1.412-4.245 9.9-9.9h0a2 2 0 0 1 2.828 0Z" class="icon_svg-stroke" stroke="#666" stroke-linecap="round" stroke-linejoin="round"></path>
              <path class="icon_svg-fill_as_stroke" fill="#666" d="m4.429 19.571 2.652-.884-1.768-1.768z"></path>
              <path d="M14.5 19.5h5v-5m-10-10h-5v5" class="icon_svg-stroke" stroke="#666" stroke-linecap="round" stroke-linejoin="round"></path>
            </g>
          </svg>
          <Text textColor={'black'}>
          Answer
          </Text>
        </Button>
        <Text fontSize={'10'}>
          asked 22 hours ago by <b>georgy456</b>
        </Text>
        
      </Flex>

      <Center>
        <Divider w={'40vw'} borderColor={'blue.200'} />
      </Center>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={'center'} alignItems={'center'} justifyContent={'center'}>
            {currentQuestion} {/* Display the current question in the modal header */}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea placeholder='Write your answer here' h={400} value={textValue} onChange={handleTextareaChange} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='green' onClick={handlePost}>Post</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    
      </Flex>
      <QAtable/>
    </Flex>
  );
}

export default QAquestions;
