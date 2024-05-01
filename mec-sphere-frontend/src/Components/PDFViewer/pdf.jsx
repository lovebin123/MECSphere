import React, { useState, useEffect } from 'react';
import { Flex, Text, useDisclosure, Button, Input } from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
} from '@chakra-ui/react';
import { FaDownload,FaFilePdf } from 'react-icons/fa';
import {pdfjs} from 'react-pdf'
import {Document,Page} from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PdfViewer() {
    const [pdfFiles, setPdfFiles] = useState([]); // State to store uploaded PDF files
    const [selectedPdf, setSelectedPdf] = useState(null); // State to store the selected PDF to open in modal
    const [numPages, setNumPages] = useState(0); // State to store the number of pages in the selected PDF
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPdfFiles([...pdfFiles, { name: file.name, url: URL.createObjectURL(file) }]);
        }
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const downloadPdf = (url, fileName) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
    };

    useEffect(() => {
        // XMLHttpRequest to fetch image
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost/image.jpg");
        xhr.responseType = "blob";

        xhr.onload = function() {
            if (xhr.status === 200) {
                var blob = xhr.response;
                var imageUrl = URL.createObjectURL(blob);
                console.log("Image URL:", imageUrl);
                // Perform any action with imageUrl, like displaying it or setting it to a state variable
            } else {
                console.error("Failed to download image:", xhr.statusText);
            }
        };

        xhr.onerror = function() {
            console.error("Network error occurred while downloading image.");
        };

        xhr.send();
    }, []);

    return (
        <Flex position="relative" h="100vh" w={'80vw'} gap={20} p={20} direction={'column'}>
            <Flex direction={'column'} justifyContent={'center'} alignItems={'center'}>
                <label htmlFor="upload" style={{ cursor: 'pointer' }}>
                    <Flex justifyContent="center" w={60} h={40} borderRadius={12} border={'dotted'} alignItems="center" direction={'column'}>
                        <FaDownload size={20}/>
                        <Text>Upload your file</Text>
                    </Flex>
                    <Input id="upload" type="file" opacity="0" cursor="pointer" aria-hidden="true" accept=".pdf" display="none" onChange={handleFileChange} />
                </label>
            </Flex>
            <Flex gap={20} cursor={'pointer'} alignContent={'flex-start'} justifyContent={'flex-start'}>
                {pdfFiles.map((pdf, index) => (
                    <Flex key={index} direction={'column'} justifyContent={'center'} alignItems={'center'} onClick={() => { setSelectedPdf(pdf); onOpen(); }} cursor="pointer">
                        <FaFilePdf color='red' size={80} />
                        <Text fontWeight={'bold'}>{pdf.name}</Text>
                    </Flex>
                ))}
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} size={'3xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <Document file={selectedPdf ? selectedPdf.url : null} onLoadSuccess={onDocumentLoadSuccess}>
                        <Flex justifyContent={'flex-start'} mt={2}>
                            <Button onClick={() => downloadPdf(selectedPdf.url, selectedPdf.name)} variant={'ghost'}>
                                <FaDownload size={15} />
                            </Button>
                        </Flex>
                            {Array.from(Array(numPages), (_, i) => (
                                <Page key={i + 1} pageNumber={i + 1} renderTextLayer={false} renderAnnotationLayer={false} />
                            ))}
                        </Document>
                       
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Flex>
    );
}

export default PdfViewer;
