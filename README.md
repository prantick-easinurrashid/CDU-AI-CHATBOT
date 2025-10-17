# CDU-AI-CHATBOT
TutorMind: Falcon-RAG Academic Chatbot - An AI-based chatbot designed to assist CDU students by providing context-based answers sourced from university materials and resources.


**TutorMind** is an AI-based chatbot designed to assist CDU students by providing **context-based answers** sourced from university resources. It leverages **Falcon 7B Instruct** and **Retrieval-Augmented Generation (RAG)** to deliver accurate and domain-specific responses.

This repository contains the **frontend** implementation, while the backend model is hosted in a separate **Colab notebook**.

---

## Repository Structure

- `Frontend-Falcon-rag-main/` – Frontend code built using Node.js and npm  
- `Backend model/` – Colab notebook implementing Falcon 7B Instruct with RAG  

---

## Features

- AI-powered chatbot providing academic support  
- Context-aware answers from CDU resources  
- Frontend interface for user interaction  
- RAG-enabled backend for domain-specific answer retrieval  
- Integration between frontend and backend using **ngrok**  
- Optional deployment of frontend via **Vercel**  

---

## Prerequisites

- Node.js and npm installed  
- VS Code or any code editor (optional)  
- Ngrok account (to expose the backend Colab server)  
- Google Colab account for running the backend model  

---

## Setup Instructions

### 1. Backend Setup

1. Open the **Backend model** Colab notebook  
2. Add your **ngrok token** in the designated section:

```python
!ngrok authtoken YOUR_NGROK_TOKEN

git clone https://github.com/<your-username>/Frontend-Falcon-rag-main.git
cd Frontend-Falcon-rag-main


