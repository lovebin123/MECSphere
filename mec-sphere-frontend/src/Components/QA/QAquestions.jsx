import React, { useState, useEffect } from 'react';
import { Center, Divider, Textarea } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { Button, Flex, Text, useDisclosure, useToast } from '@chakra-ui/react';
import QAtable from './QAtable';

function QAquestions() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [textValue, setTextValue] = useState(""); // State variable to store textarea content
    const [questions, setQuestions] = useState([]); // State variable to store questions
    const [currentQuestion, setCurrentQuestion] = useState(""); // State variable to store the current question
    const toast = useToast(); // To use the toast

    useEffect(() => {
        fetchQuestions(); // Fetch questions when component mounts
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await fetch('http://localhost:4000/questions');
            const data = await response.json();
            setQuestions(data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const handleTextareaChange = (event) => {
        setTextValue(event.target.value); // Update the state variable with textarea content
    };

    const handleOpenModal = (question) => {
        setCurrentQuestion(question); // Set the current question when opening the modal
        onOpen(); // Open the modal
    };

    const handlePost = () => {
        // Your post logic
    };

    return (
        <Flex direction={'row'} justifyContent={'space-evenly'}>
            <Flex direction={'column'} gap={5}>

                {questions.map((question) => (
                    <React.Fragment key={question.id}>
                        <Center>
                            <Divider w={'40vw'} borderColor={'blue.200'} />
                        </Center>
                        <Text textAlign={'center'} fontWeight={'bold'} fontSize={'xl'}>
                            {question.description}
                        </Text>
                        <Flex justifyContent={'center'} direction={'row'} alignItems={'center'} gap={10}>
                            <Button onClick={() => handleOpenModal(question.text)} bgColor='#5db1fd'>
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
                                asked {question.time} ago by <b>{question.user}</b>
                            </Text>

                        </Flex>

                        <Center>
                            <Divider w={'40vw'} borderColor={'blue.200'} />
                        </Center>
                    </React.Fragment>
                ))}

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
            <QAtable />
        </Flex>
    );
}

export default QAquestions;
