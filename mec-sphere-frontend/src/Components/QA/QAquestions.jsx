import React, { useState, useEffect } from 'react';
import { ButtonGroup, Center, Divider, Textarea } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { Button, Flex, Text, useDisclosure, useToast } from '@chakra-ui/react';
import QAtable from './QAtable';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
function QAquestions() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [textValue, setTextValue] = useState(""); // State variable to store textarea content
    const [questions, setQuestions] = useState([]); // State variable to store questions
    const [currentQuestion, setCurrentQuestion] = useState(""); // State variable to store the current question
    const [qidd, setQid] = useState(""); // State variable to store the question id
    const toast = useToast(); // To use the toast

    useEffect(() => {
        fetchQuestions(); // Fetch questions when component mounts
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await fetch('https://mecsphere.onrender.com/questions');
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
        const data = {
            user: 'sam',
            qid: qidd,
            ans: textValue
        }
        axios.post('https://mecsphere.onrender.com/answers/add', data).then((response) => {
            // Update questions state after posting the answer
            setQuestions([{
                _id: response.data._id,
                description: currentQuestion,
                time: 'just now', // Assuming time is added as 'just now' for newly posted answers
                user: 'sam' // Assuming the user is 'sam' for newly posted answers
            }, ...questions]);
            // Reset textarea value and close the modal
            setTextValue("");
            onClose();
            toast({
                title: "Success",
                description: "Answer posted successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }).catch(error => {
            console.error('Error posting answer:', error);
            toast({
                title: "Error",
                description: "Failed to post answer",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        });
    };

    return (
        <Flex direction={'row'} justifyContent={'space-evenly'}>
            <Flex direction={'column'} gap={5}>

                {questions.map((question) => (
                    <Flex p={4} direction={'column'} boxShadow="md" borderRadius="xl" border={"1.5px solid rgba(93,117,253, 0.3)"}>
                        <React.Fragment key={question._id}>
                            <Text textAlign={'center'} fontWeight={'bold'} fontSize={'xl'} mb={5}>
                                {question.description}
                            </Text>
                            <Flex justifyContent={'center'} direction={'row'} alignItems={'center'} gap={10}>
                                <ButtonGroup>
                                    <Button bgColor={'rgba(93,117,253, 0.6)'} _hover={{bgColor:'rgba(93,117,253, 0.8)'}} color='white' leftIcon={<FaEdit/>} onClick={() => { handleOpenModal(question.description); setQid(question._id) }}>
                                            Answer
                                    </Button>
                                </ButtonGroup>
                                <Text fontSize={'10'} >
                                    asked {question.time} ago by <b>{question.user}</b>
                                </Text>

                            </Flex>
                        </React.Fragment>
                    </Flex>
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
        </Flex>
    );
}

export default QAquestions;

