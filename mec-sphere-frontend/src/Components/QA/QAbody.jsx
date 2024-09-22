import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Avatar,
} from "@chakra-ui/react";
import "./QAbody.css";

function QAbody() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [answers, setAnswers] = useState([]);
  const [expandedAnswers, setExpandedAnswers] = useState({});

  useEffect(() => {
    axios
      .get("https://mecsphere.onrender.com/answers")
      .then((response) => {
        // Shuffle the answers array
        const shuffledAnswers = shuffleArray(response.data);
        setAnswers(shuffledAnswers);
      })
      .catch((error) => {
        console.error("Error fetching answers:", error);
      });
  }, []);

  // Function to shuffle the array
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

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

  const toggleLove = (index) => {
    const newAnswers = [...answers];
    newAnswers[index].loved = !newAnswers[index].loved;
    setAnswers(newAnswers);
  };

  const toggleExpand = (index) => {
    setExpandedAnswers((prevExpanded) => ({
      ...prevExpanded,
      [index]: !prevExpanded[index],
    }));
  };

  return (
    <Flex mt={12} justifyContent="center">
      <Flex gap={10} flexWrap="wrap" justifyContent="center">
        {answers.map((answer, index) => (
          <Card key={index} w={"80%"} boxShadow="md" borderRadius="xl" border={"1.5px solid rgba(93,117,253, 0.3)"}>
            <CardHeader >
              <Avatar ml={5} />
              <Flex direction="column" gap={2}>
                <Text ml={2} mt={1} fontSize="sm" color="gray.500">
                  {timeAgo(answer.createdAt)}
                </Text>
                <Text fontSize="xl" fontWeight="bold" color={'gray.700'} textAlign="center">
                  {answer.question}
                </Text>
              </Flex>
            </CardHeader>
            <CardBody maxH={expandedAnswers[index] ? "none" : "150px"} overflow="hidden">
              {answer.ans.length > 150 ? (
                <React.Fragment>
                  {expandedAnswers[index] ? (
                    <div>
                      {answer.ans}
                      <Button onClick={() => toggleExpand(index)} size="sm" bgColor={'transparent'} _hover={{ bgColor: 'transparent' }} color="blue.500">
                        Collapse
                      </Button>
                    </div>
                  ) : (
                    <div>
                      {answer.ans.substring(0, 150)}
                      <Button onClick={() => toggleExpand(index)} size="sm" bgColor={'transparent'} _hover={{ bgColor: 'transparent' }} color="blue.500">
                        ...Read More
                      </Button>
                    </div>
                  )}
                </React.Fragment>
              ) : (
                answer.ans
              )}

            </CardBody>
            <CardFooter>
              <Button
                onClick={() => toggleLove(index)}
                size="sm"
                colorScheme={answer.loved ? "red" : "gray"}
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
        ))}
      </Flex>
    </Flex>
  );
}

export default QAbody;

