"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
// chatter.js
var pdf_1 = require("langchain/document_loaders/fs/pdf");
var text_splitter_1 = require("langchain/text_splitter");
var hnswlib_1 = require("@langchain/community/vectorstores/hnswlib");
var chains_1 = require("langchain/chains");
var togetherai_1 = require("@langchain/community/embeddings/togetherai");
var togetherai_2 = require("@langchain/community/chat_models/togetherai");
function run(query) {
    return __awaiter(this, void 0, void 0, function () {
        var loader, docs, splitter, splittedDocs, embeddings, vectorStore, vectorStoreRetriever, model, chain, answer, text, cleanedText, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    loader = new pdf_1.PDFLoader("C:\\Users\\loveb\\Documents\\react\\MECSphere\\mec-sphere-frontend\\src\\Components\\Chatbot\\docs1\\MECChat1.pdf");
                    return [4 /*yield*/, loader.load()];
                case 1:
                    docs = _a.sent();
                    splitter = new text_splitter_1.RecursiveCharacterTextSplitter({
                        chunkSize: 1000,
                        chunkOverlap: 100,
                    });
                    return [4 /*yield*/, splitter.splitDocuments(docs)];
                case 2:
                    splittedDocs = _a.sent();
                    embeddings = new togetherai_1.TogetherAIEmbeddings({
                        apiKey: process.env.TOGETHER_AI_API_KEY, // Default value
                        model: "togethercomputer/m2-bert-80M-32k-retrieval", // Default value
                    });
                    return [4 /*yield*/, hnswlib_1.HNSWLib.fromDocuments(splittedDocs, embeddings)];
                case 3:
                    vectorStore = _a.sent();
                    vectorStoreRetriever = vectorStore.asRetriever();
                    model = new togetherai_2.ChatTogetherAI({
                        temperature: 0.9,
                        apiKey: process.env.TOGETHER_AI_API_KEY,
                        model: 'meta-llama/Llama-3-70b-chat-hf'
                    });
                    chain = chains_1.RetrievalQAChain.fromLLM(model, vectorStoreRetriever);
                    return [4 /*yield*/, chain.call({
                            query: query // Use the provided query
                        })];
                case 4:
                    answer = _a.sent();
                    if (typeof answer === 'object' && 'text' in answer) {
                        text = answer.text;
                        cleanedText = text.replace('text: ', '');
                        return [2 /*return*/, cleanedText]; // Return the cleaned text
                    }
                    else {
                        return [2 /*return*/, answer]; // Return the answer
                    }
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.error("An error occurred:", error_1);
                    throw error_1; // Re-throw the error to be handled by the caller
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.run = run;
