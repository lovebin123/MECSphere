// AlumniCatalog.js
import React from 'react';
import { useState } from 'react';
import { Flex, InputGroup, Input, InputRightAddon } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import AlumniTile from "./AlumniTile";

const AlumniCatalog = ({}) => {
    const handleSearch = () => {
        // Implement search functionality here
    };

    const [alumniData, setAlumniData] = useState([
        { id: 1, name: "John Doe", image: "src/assets/john-img.png", job: "Software Engineer", bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin euismod vehicula sem, at ullamcorper elit sodales nec." },
        { id: 2, name: "Alice Smith", image: "src/assets/alice-img.png", job: "Graphic Designer", bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin euismod vehicula sem, at ullamcorper elit sodales nec." },
        { id: 3, name: "Michael Brown", image: "src/assets/michael-img.png", job: "Marketing Manager", bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin euismod vehicula sem, at ullamcorper elit sodales nec." },
        { id: 4, name: "Emily Johnson", image: "src/assets/emily-img.png", job: "Project Manager", bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin euismod vehicula sem, at ullamcorper elit sodales nec." },
        /*{ id: 5, name: "David Lee", image: "src/assets/david-img.png", job: "Data Scientist", bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin euismod vehicula sem, at ullamcorper elit sodales nec." }*/
    ]);

    return (
        <div className="alumni-catalog">
            <Flex direction="column" alignItems="center" p={5}>
                <InputGroup w="75vw" mb={5}>
                    <Input placeholder="Search" borderRadius="30" onChange={handleSearch} />
                    <InputRightAddon borderTopRightRadius="30" borderBottomRightRadius="30" bgColor="gray.200">
                        <FaSearch onClick={handleSearch} />
                    </InputRightAddon>
                </InputGroup>
                <Flex w="100%" justifyContent="center" gap={5} flexWrap="wrap">
                    {alumniData.map(alumni => (
                        <AlumniTile key={alumni.id} alumni={alumni} width="30%" /> 
                    ))}
                </Flex>
            </Flex>
        </div>
    );
};

export default AlumniCatalog;
