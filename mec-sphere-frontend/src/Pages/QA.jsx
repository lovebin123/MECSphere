import React, { useContext, useState } from "react";
import {
  Button,
  Container,
  Flex,
  HStack,
  Image,
  Input,
  VStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import QAbody from "../Components/QA/QAbody";
import QAquestions from "../Components/QA/QAquestions";
import apiClient from "../services/api-client";
import AuthContext from "../contexts/AuthContext";

function QA() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [question, setQuestion] = useState("");
  const { User, setUser } = useContext(AuthContext);
  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://mecsphere.onrender.com/questions/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: User.name+" "+User.lastname,
          description: question,
        }),
      });

      if (response.ok) {
        console.log("Question added successfully.");
        // Optionally, perform additional actions upon successful addition of the question
      } else {
        console.error("Failed to add question:", response.statusText);
        // Optionally, handle the error, such as showing an error toast or alerting the user
      }
    } catch (error) {
      console.error("Error adding question:", error);
      // Optionally, handle the error, such as showing an error toast or alerting the user
    }

    setQuestion("");
    onClose();
  };

  return (
    <Flex direction={"column"} h="100vh" w={"80vw"} gap={10}>
      <Container
        mt={10}
        boxShadow={"sm"}
        borderRadius={12}
        h={"120px"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        onClick={onOpen}
        cursor={"pointer"}
      >
        <Flex gap={1} p={3} w={'100%'}>
          <Image
            src="https://img.icons8.com/color/48/circled-user-male-skin-type-3--v1.png"
            w={"45px"}
            h={"45px"}
            mt={"-2"}
          />
          <Flex direction={"column"} alignItems={"flex-start"} gap={4} w={'100%'}>
            <Input w={'80%'} color={"gray"} cursor={"pointer"} />
            <Button w={75} bgColor={'rgba(93,117,253, 0.6)'} _hover={{bgColor:'rgba(93,117,253, 0.8)'}} color='white'>
               Ask
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
            <QAbody />
          </TabPanel>
          <TabPanel>
            <QAquestions />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Modal
        closeOnOverlayClick={false}
        size={"md"}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>Ask Your Question here</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              variant={"flushed"}
              placeholder='Start your question with "What","Why","How" etc'
              mb={20}
              _focus={{ border: "none" }}
              value={question}
              onChange={handleInputChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose} bgColor={"transparent"}>
              Close
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleSubmit}
              disabled={question.trim() === ""}
              style={{
                cursor: question.trim() === "" ? "not-allowed" : "pointer",
              }}
            >
              Add question
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default QA;
