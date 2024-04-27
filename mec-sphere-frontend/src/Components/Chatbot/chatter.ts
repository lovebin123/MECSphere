// chatter.js
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { RetrievalQAChain } from "langchain/chains";
import { OpenAI } from "@langchain/openai";
import { TogetherAIEmbeddings } from "@langchain/community/embeddings/togetherai";
import { ChatTogetherAI } from "@langchain/community/chat_models/togetherai";

export async function run(query) {
  try {
    const loader = new PDFLoader("C:\\Users\\loveb\\Documents\\MECSphere\\mec-sphere-frontend\\src\\Components\\Chatbot\\docs1\\MECChat1.pdf");
    const docs = await loader.load();

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 100,
    });
    const splittedDocs = await splitter.splitDocuments(docs);

    const embeddings = new TogetherAIEmbeddings({
      apiKey: process.env.TOGETHER_AI_API_KEY, // Default value
      model: "togethercomputer/m2-bert-80M-32k-retrieval", // Default value
    });
    const vectorStore = await HNSWLib.fromDocuments(splittedDocs, embeddings);
    const vectorStoreRetriever = vectorStore.asRetriever();

    
    const model = new ChatTogetherAI({
      temperature: 0.9,
      apiKey: process.env.TOGETHER_AI_API_KEY,
      model:'meta-llama/Llama-3-70b-chat-hf'
    });


    const chain = RetrievalQAChain.fromLLM(model, vectorStoreRetriever);

    const answer = await chain.call({
      query: query // Use the provided query
    });

    if (typeof answer === 'object' && 'text' in answer) {
      const text = answer.text;
      const cleanedText = text.replace('text: ', '');
      return cleanedText; // Return the cleaned text
    } else {
      return answer; // Return the answer
    }
    
  } catch (error) {
    console.error("An error occurred:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}
