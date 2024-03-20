import React, { useEffect } from 'react';
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { RetrievalQAChain } from "langchain/chains";
import { OpenAI } from "@langchain/openai";

const YourComponent = () => {
    useEffect(() => {
        const run = async () => {
            try {
                const loader = new PDFLoader("C:\\Users\\loveb\\Documents\\react\\mec\\mec-sphere\\src\\Components\\Chatbot\\docs1\\MECChat1.pdf");
                const docs = await loader.load();

                const splitter = new RecursiveCharacterTextSplitter({
                    chunkSize: 1000,
                    chunkOverlap: 100,
                });
                const splittedDocs = await splitter.splitDocuments(docs);

                const embeddings = new OpenAIEmbeddings();
                const vectorStore = await HNSWLib.fromDocuments(splittedDocs, embeddings);
                const vectorStoreRetriever = vectorStore.asRetriever();

                const openAIApiKey = process.env.OPENAI_API_KEY;
                if (!openAIApiKey) {
                    throw new Error("OpenAI API key not found. Please set the OPENAI_API_KEY environment variable.");
                }

                const model = new OpenAI({
                    modelName: 'gpt-3.5-turbo',
                    openAIApiKey: openAIApiKey // Provide the API key here
                });

                const chain = RetrievalQAChain.fromLLM(model, vectorStoreRetriever);
                const question = 'Departments of MEC';

                const answer = await chain.call({
                    query: question
                });

                if (typeof answer === 'object' && 'text' in answer) {
                    const text = answer.text;
                    const cleanedText = text.replace('text: ', '');
                    console.log(cleanedText);
                } else {
                    console.log(answer);
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        };

        run();
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

    return <div>Your Component Content</div>;
};

export default YourComponent;
