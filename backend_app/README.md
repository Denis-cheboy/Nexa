# Nexa Assistant Backend API

Welcome to the backend API for the Nexa Assistant, an AI Brainstorming Assistant application! This service powers the core functionalities of the assistant, handling interactions with the AI, managing conversation history, and storing data.

## 🚀 Features

This backend API provides the following key functionalities:

- **Intelligent Conversation Management:**
  - **Start New Conversations:** Seamlessly initiate new AI interactions.
  - **Continue Existing Chats:** Pick up where you left off with any conversation.
  - **Retrieve Chat History:** Easily view the full history of any specific conversation.
  - **View All Conversations:** Get an overview of all your saved discussions.
  - **Clear Conversations:** Option to delete all stored conversations for a fresh start.
- **AI-Powered Responses:**
  - **Real-time AI Interaction:** Sends your messages to a powerful AI model (Gemini API) and streams back its responses.
  - **Contextual Understanding:** Maintains conversation context to ensure the AI's replies are relevant and helpful.
- **Robust Data Storage:**
  - **Persistent Conversations:** All your conversations and messages are securely saved in a database, so you never lose your brainstorming sessions.

## 🛠️ Technologies Used (Tech Stack)

The Nexa Assistant Backend is built with modern, efficient, and scalable technologies:

- **Python:** The primary programming language, known for its readability and extensive libraries.
- **FastAPI:** A high-performance web framework for building APIs with Python, offering speed and ease of use.
- **MongoDB:** A flexible NoSQL database used for storing conversation data. It's great for handling evolving data structures.
- **Motor:** An asynchronous Python driver for MongoDB, allowing the API to handle many requests concurrently without blocking.
- **Uvicorn:** A lightning-fast ASGI server that runs the FastAPI application.
- **python-dotenv:** Manages environment variables, keeping sensitive information (like API keys) out of the code.
- **httpx:** An asynchronous HTTP client used for making requests to the Gemini AI API.
- **Pydantic:** Ensures data sent to and from the API is valid and correctly structured.

## ⚙️ Getting Started

Follow these steps to get the Nexa Assistant Backend API up and running on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8 or higher:** Download from [python.org](https://www.python.org/downloads/).
- **`pip`:** Python's package installer, usually comes with Python.

### Installation

1.  **Navigate to the Backend Directory:**
    Open your terminal or command prompt and go to the `backend_app` directory of your project:

    ```bash
    cd  backend_app
    ```

2.  **Create a Virtual Environment (Recommended Though OPTIONAL):**
    **Note:** (OPTIONAL) It's best practice to use a virtual environment to manage project dependencies separately.

    ```bash
    python3 -m venv venv
    ```

    - **Activate the virtual environment:**
      - **macOS/Linux:**
        ```bash
        source venv/bin/activate
        ```
      - **Windows:**
        ```bash
        .\venv\Scripts\activate
        ```

3.  **Install Dependencies:**
    With your virtual environment activated, install all required Python packages:
    ```bash
    pip3 install -r requirements.txt
    ```

### Configuration (`.env` file)

The application requires certain environment variables to connect to the AI service and the database.

1.  **Create a `.env` file:** In the `backend_app` directory, create a new file named `.env`.
2.  **Add/Paste the following variables:**

    ```bash
    MONGO_URI=mongodb+srv://denocheboy:36251972@cluster0.v6smfcs.mongodb.net/Willow?retryWrites=true&w=majority
    GEMINI_API_ENDPOINT=https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent
    GEMINI_API_KEY=AIzaSyBXhf9wNN7DnakOeWGmSZ8aLQw-tbxgXkk
    DATABASE_NAME=Willow
    ```

    ` - **`GEMINI_API_KEY`**: Obtain this from the Google AI Studio or Google Cloud Console. - **`GEMINI_API_ENDPOINT`**: This is the URL for the Gemini API. A common endpoint for Google's Gemini API might look like `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`. - **`MONGO_URI`**: The connection string for your MongoDB instance. If MongoDB is running locally on its default port, `mongodb://localhost:27017` is usually correct. - **`DATABASE_NAME`**: The name of the database that the application will use within MongoDB.

### Running the Server

Once all dependencies are installed and your `.env` file is configured, you can start the FastAPI server:

1.  **Ensure your virtual environment is active.**
2.  **Run the application using Uvicorn:**

    ```bash
    fastapi dev main.py
    ```

    You should see output indicating that the server is running, typically at `http://127.0.0.1:8000/api`.

## 🌐 API Endpoints

Here are some of the main API endpoints provided by this backend:

- **`GET /api/`**: A simple welcome message to confirm the API is running.
- **`GET /api/chat/all/conversations`**: Retrieves a list of all stored conversations.
- **`DELETE /api/chat/conversations`**: Deletes all conversations from the database.
- **`GET /api/chat/history/{conversation_id}`**: Fetches the message history for a specific conversation ID.
- **`POST /api/chat/send`**: Sends a user message to the AI, gets a streaming response, and saves the interaction.

---
