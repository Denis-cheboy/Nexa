# Nexa Assistant - AI Brainstorming Application

Welcome to Nexa Assistant, a full-stack AI-powered brainstorming and conversation application. This project allows users to interact with an intelligent AI, manage multiple conversations, and have their chat history persistently stored for future reference.

## 🏛️ Architecture Overview

The application is built with a modern, decoupled architecture:

- **Frontend:** A dynamic and responsive user interface built with **React.js**. It handles all user interactions and communicates with the backend.
- **Backend:** A powerful and fast API built with **Python and FastAPI**. It manages AI interactions, conversation logic, and data persistence with MongoDB.

## ✨ Core Features

- **Real-time AI Interaction:** Engage in seamless, streaming conversations with the Gemini AI model.
- **Persistent Chat History:** All conversations are saved to a MongoDB database, so you can pick up where you left off.
- **Full Conversation Management:** Start new chats, view past conversations, and clear your history with ease.
- **Interactive & Modern UI:** A clean, intuitive interface built with React and styled for a great user experience, including smooth animations.
- **Decoupled & Scalable:** The separate frontend and backend allow for independent development, scaling, and deployment.

## 🛠️ Tech Stack

### Frontend (`frontend_app`)

- **React.js:** For building the user interface.
- **Vite:** As the frontend build tool and development server.
- **Framer Motion:** For fluid animations and transitions.
- **Axios:** For making HTTP requests to the backend API.
- **Tailwind CSS:** For styling the application.

### Backend (`backend_app`)

- **Python:** The core programming language.
- **FastAPI:** A high-performance web framework for the API.
- **MongoDB:** The NoSQL database for storing conversation data.
- **Motor:** Asynchronous driver for MongoDB.
- **Uvicorn:** The ASGI server to run the application.

## 📂 Project Structure

```
nexa-assistant/
├── backend_app/        # Contains the Python FastAPI backend
│   └── README.md       # Backend-specific documentation
├── frontend_app/       # Contains the React.js frontend
│   └── README.md       # Frontend-specific documentation
└── README.md           # You are here! (Overall project documentation)
```

## 🚀 Quick Start Guide

To run the full application, you will need to start both the backend server and the frontend development server.

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (LTS version recommended)
- **Python** (3.8 or higher)

## 📚 Detailed Documentation

For more detailed information on the setup, configuration, and API endpoints for each part of the application, please refer to their individual `README` files:

- [Client Documentation](./frontend_app/README.md)
- [Server Documentation](./backend_app/README.md)
