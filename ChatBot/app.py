from flask import Flask, request, jsonify

from langchain_community.document_loaders import DirectoryLoader
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings

from langchain.prompts import PromptTemplate
from langchain.chains.question_answering import load_qa_chain
from langchain_openai import OpenAI
from langchain.output_parsers import RegexParser


app = Flask(__name__)
os.environ['OPENAI_API_KEY']='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'

loader = DirectoryLoader(f'docs', glob="./*.pdf", loader_cls=PyPDFLoader)
documents = loader.load()
chunk_size_value = 1000
chunk_overlap=100
text_splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size_value, chunk_overlap=chunk_overlap,length_function=len)
texts = text_splitter.split_documents(documents)
docembeddings = FAISS.from_documents(texts, OpenAIEmbeddings())
docembeddings.save_local("llm_faiss_index")
docembeddings = FAISS.load_local("llm_faiss_index",OpenAIEmbeddings())




prompt_template = """Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.

This should be in the following format:

Question: [question here]
Helpful Answer: [answer here]
Score: [score between 0 and 100]

Begin!

Context:
---------
{context}
---------
Question: {question}
Helpful Answer:"""
output_parser = RegexParser(
    regex=r"(.*?)\nScore: (.*)",
    output_keys=["answer", "score"],
)
PROMPT = PromptTemplate(
    template=prompt_template,
    input_variables=["context", "question"],
    output_parser=output_parser
)
chain = load_qa_chain(OpenAI(temperature=0), chain_type="map_rerank", return_intermediate_steps=True, prompt=PROMPT)


def getanswer(query):
    relevant_chunks = docembeddings.similarity_search_with_score(query,k=2)
    chunk_docs=[]
    for chunk in relevant_chunks:
        chunk_docs.append(chunk[0])
    results = chain({"input_documents": chunk_docs, "question": query})
    text_reference=""
    for i in range(len(results["input_documents"])):
        text_reference+=results["input_documents"][i].page_content
    output={"Answer":results["output_text"]}
    return output



@app.route('/docqna',methods = ["POST"])
def processclaim():
    try:
        input_json = request.get_json(force=True)
        query = input_json["query"]
        output=getanswer(query)
        return output
    except:
        return jsonify({"Status":"Failure --- some error occured"})
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8095, debug=False)