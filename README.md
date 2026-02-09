# 📄 Offline Analysis of Documents Using LLM Conversational Workflow

## 🎓 Final Year Project (BS Computer Science)
**Institute of Space Technology (IST), Islamabad**

---

## 📌 Project Overview
This project focuses on the development of an **offline document analysis and conversational AI system** that allows users to upload documents and interact with them using a chatbot powered by **Large Language Models (LLMs)** without requiring an internet connection.

The system supports multiple document formats, generates document summaries, answers context-aware questions, and performs **sentiment analysis** on user queries. A specialized chatbot workflow is also designed to assist users with **Institute of Space Technology (IST)**-related queries.

---

## 🎯 Objectives
- Enable **offline document analysis** using LLMs  
- Support **multiple document formats** (PDF, TXT, CSV, JSON)  
- Provide **intelligent question-answering** based on document context  
- Generate concise **document summaries**  
- Allow **multiple document uploads**  
- Develop an **IST-specific chatbot** for institutional queries  
- Analyze user emotions using **sentiment analysis**  

---

## 🚀 Key Features
- 📂 Multi-document upload support  
- 📑 Document summarization  
- 🤖 Offline LLM-powered chatbot  
- 🔍 Context retrieval using vector embeddings  
- 😊 Real-time sentiment analysis of user queries  
- 🏫 IST-focused conversational assistant  
- 🔐 Privacy-preserving (no cloud dependency)

---

## 🏗 System Architecture (High-Level)
1. User uploads one or more documents  
2. Documents are preprocessed and converted into text  
3. Text is chunked and converted into vector embeddings  
4. Embeddings are stored in a vector database  
5. User queries are embedded and matched using similarity search  
6. Relevant context is passed to the offline LLM  
7. Response is generated and sentiment is analyzed  

---

## 🛠 Technology Stack

### 🔹 Programming Language
- **Python**

### 🔹 Large Language Model (Offline)
- **Mistral LLM**
- Executed locally using **Ollama**

### 🔹 LLM Framework
- **LangChain**
  - Document loaders
  - Text chunking
  - Embedding generation
  - Retrieval-based QA

### 🔹 Vector Database
- **ChromaDB**
  - Stores document embeddings
  - Enables fast similarity search

### 🔹 Similarity Search
- **Cosine Similarity**

### 🔹 Sentiment Analysis
- **Custom-trained Bidirectional LSTM (BiLSTM)**
- **GloVe word embeddings**
- Used to classify emotional tone of user queries

### 🔹 Frontend
- **React.js**
  - Chat interface
  - File upload system

### 🔹 Database
- **SQLite**
  - Chat history
  - Metadata storage

### 🔹 Supported Document Formats
- PDF  
- TXT  
- CSV  
- JSON  

---

## 🧠 Machine Learning Model (Sentiment Analysis)
- Model: **Bidirectional LSTM**
- Embeddings: **GloVe (pre-trained)**
- Dataset size: ~13,000 samples  
- Train/Test Split: 80/20  
- Purpose:
  - Detect emotional context of user queries
  - Enhance conversational response quality

---

## 📄 Documentation & Research

- 📊 **Project Presentation**  
  👉 [View Presentation](FYP_Presentation.pptx)
  
- 📑 **Research Paper**  
   
  
---

## 🤝 Collaboration & Code Ownership
This project was developed as a **team-based Final Year Project** at the Institute of Space Technology (IST).

**Team Members:**
- Shumail Inam  
- Eman Tahir  
- Faiza Iftikhar  

This repository is maintained for **academic documentation and individual portfolio purposes**.

---


## 📌 Use Cases
- Offline academic document analysis  
- Secure document-based AI systems  
- University assistance chatbot  
- Privacy-preserving conversational AI  

---

 
