import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios for making HTTP requests
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import "./QAbody.css";

function QAbody() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [answers, setAnswers] = useState([]); // State variable to store answers

  useEffect(() => {
    // Fetch answers from your route when the component mounts
    axios
      .get("http://localhost:4000/answers") // Replace '/answers' with your actual endpoint
      .then((response) => {
        setAnswers(response.data); // Set the fetched answers in state
      })
      .catch((error) => {
        console.error("Error fetching answers:", error);
      });
  }, []); // Run this effect only once when the component mounts

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return interval + " year" + (interval === 1 ? "" : "s") + " ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval + " month" + (interval === 1 ? "" : "s") + " ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval + " day" + (interval === 1 ? "" : "s") + " ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval + " hour" + (interval === 1 ? "" : "s") + " ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + " minute" + (interval === 1 ? "" : "s") + " ago";
    }
    return Math.floor(seconds) + " second" + (seconds === 1 ? "" : "s") + " ago";
  };

  return (
    <Flex justifyContent="flex-start" alignContent={"space-between"} mt={12}>
      <Flex gap={10}>
        {answers.map(
          (
            answer,
            index // Loop through the fetched answers to generate cards
          ) => (
            <Card
              key={index}
              maxW="sm"
              maxH="lg"
              boxShadow={
                " rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;"
              }
            >
              <CardHeader>
                <Image
                  w="60px"
                  h="60px"
                  marginTop={-35}
                  marginRight={20}
                  borderRadius={50}
                  src={
                    index === 0
                      ? "https://people.com/thmb/4nQ7-MjL_jCoW-JofmlUcCHabJs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(599x0:601x2):format(webp)/new-dad-ed-sheeran-44dcff70fc8a40b1be722788d8253c25.jpg"
                      : "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                />
                <Flex direction="column" gap={5}>
                <Text fontSize={10}>{timeAgo(answer.createdAt)}</Text> {/* Display time ago */}
                  {/* Assuming answer has a createdAt property */}
                  <Text
                    fontSize={"large"}
                    fontWeight={"bold"}
                    textAlign="center"
                  >
                    {answer.question}
                  </Text>
                </Flex>
              </CardHeader>
              <CardBody>{answer.ans}</CardBody>
              <CardFooter>
                <Button
                  position="absolute"
                  right={1}
                  mt={-6}
                  colorScheme="none"
                  border="none"
                  className="btn"
                  color="gray"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-heart-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                    />
                  </svg>
                </Button>
              </CardFooter>
            </Card>
          )
        )}
      </Flex>
    </Flex>
  );
}

export default QAbody;
