# AI-First CRM HCP Module

An AI-powered Customer Relationship Management (CRM) application designed for Healthcare Professionals (HCPs). The system enables medical representatives to manage HCP interactions using natural language through an intelligent AI assistant instead of manually completing CRM forms.

The application follows an **AI-first workflow**, where a conversational assistant understands user requests, identifies the intended action using **LangGraph**, and executes the appropriate AI tool. Information extracted from conversations is automatically populated into the CRM interface, providing a faster, more intuitive, and more efficient user experience.

This project was developed as part of a technical assessment to demonstrate the integration of **React**, **FastAPI**, **PostgreSQL**, **LangGraph**, and **Groq LLM** into a real-world healthcare CRM use case.

---

# Project Objective

Traditional CRM systems require users to manually enter interaction details into lengthy forms. This project reimagines that workflow by allowing healthcare representatives to communicate with an AI assistant using natural language.

The AI assistant analyzes user messages, extracts relevant information, routes requests through LangGraph, and performs CRM operations automatically.

The project implements five LangGraph-powered AI tools:

- 📝 Log Interaction
- ✏️ Edit Interaction
- 🔍 Search HCP
- 📄 Summarize Interaction
- 💡 Follow-up Recommendation

These tools work together to automate CRM tasks while maintaining a clean and intuitive user interface.

---

# Key Features

- AI-powered conversational interface for managing HCP interactions
- Automatic extraction of interaction details from natural language
- Automatic population of CRM forms using AI
- Intelligent routing of user requests using LangGraph
- Support for editing previously extracted interaction details
- Search existing Healthcare Professionals (HCPs)
- Generate concise summaries of previous interactions
- AI-generated follow-up recommendations for future engagements
- PostgreSQL database integration for persistent data storage
- Responsive React-based frontend with an AI Assistant panel
- FastAPI backend providing RESTful APIs
- Modern UI styled using the Google Inter font

---

# Tech Stack

## Frontend

- React.js
- React Router
- Axios
- CSS3
- Google Inter Font

## Backend

- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn

## Artificial Intelligence

- LangGraph
- Groq API
- Llama 3.3 70B Versatile
- LangChain

## Database

- PostgreSQL

## Development Tools

- Visual Studio Code
- Git
- GitHub
- Postman
- Swagger UI

---

# System Architecture

The application follows a client-server architecture powered by a LangGraph AI agent.

```
                User
                  │
                  ▼
        React Frontend (AI Chat)
                  │
          REST API (Axios)
                  │
                  ▼
        FastAPI Backend
                  │
                  ▼
          LangGraph Router
                  │
    ┌─────────┬──────────┬──────────┬────────────┬────────────┐
    ▼         ▼          ▼          ▼            ▼
 Log Tool   Edit Tool  Search HCP  Summarize   Follow-up
                                           Recommendation
                  │
                  ▼
          PostgreSQL Database
```

The React frontend provides an AI-powered conversational interface that communicates with the FastAPI backend. The backend uses LangGraph to classify user intent and route requests to one of five specialized AI tools. Each tool performs a specific CRM operation and interacts with the PostgreSQL database when necessary before returning structured data to the frontend.

---

# LangGraph AI Agent

The AI Assistant is powered by **LangGraph**, which acts as the orchestration layer for all user requests.

Instead of hardcoding application logic, the LangGraph agent analyzes the user's natural language input, identifies the user's intent using a routing node, and dynamically invokes the appropriate tool. This approach enables the CRM to support conversational workflows while maintaining modularity and extensibility.

Each tool is responsible for a specific CRM operation and updates the shared application state before returning the results to the frontend.

### LangGraph Workflow

```
User Prompt
      │
      ▼
React AI Assistant
      │
      ▼
FastAPI Backend
      │
      ▼
LangGraph Router
      │
      ├──────────────┬──────────────┬──────────────┬──────────────┬──────────────┐
      ▼              ▼              ▼              ▼              ▼
Log Interaction   Edit Interaction  Search HCP   Summarize   Follow-up Recommendation
      │              │              │              │              │
      └──────────────┴──────────────┴──────────────┴──────────────┘
                             │
                             ▼
                     PostgreSQL Database
```

The router determines the user's intent and dispatches the request to one of the five specialized tools. Each tool performs its task independently and returns structured data that is displayed by the React frontend.

---

# LangGraph Tools

## 1. Log Interaction Tool

**Purpose**

Captures HCP interaction details from natural language and automatically populates the interaction form.

**Workflow**

- Receives a conversational prompt from the user.
- Uses the LLM to extract structured information.
- Identifies the HCP.
- Detects interaction type.
- Extracts summary and sentiment.
- Populates the CRM form automatically.

**Example Prompt**

```
Today I met Dr. Sarah Johnson and discussed Product X efficacy.
The meeting was positive and I shared product brochures.
```

---

## 2. Edit Interaction Tool

**Purpose**

Updates previously extracted interaction information without requiring manual editing of the form.

**Workflow**

- Receives the user's correction.
- Identifies which fields need modification.
- Preserves unchanged values.
- Updates only the requested fields.

**Example Prompt**

```
Actually the sentiment was Negative and the doctor's name was Dr. John Smith.
```

---

## 3. Search HCP Tool

**Purpose**

Searches the CRM database for Healthcare Professionals.

**Workflow**

- Extracts the doctor's name.
- Queries PostgreSQL.
- Returns matching HCP information.
- Displays the results in the AI Assistant.

**Example Prompt**

```
Show Dr. Sarah Johnson
```

---

## 4. Summarize Interaction Tool

**Purpose**

Retrieves and summarizes the most recent interaction with an HCP.

**Workflow**

- Identifies the requested HCP.
- Retrieves the latest interaction.
- Generates a concise interaction summary.
- Returns the summary to the frontend.

**Example Prompt**

```
Summarize my interaction with Dr. Sarah Johnson.
```

---

## 5. Follow-up Recommendation Tool

**Purpose**

Generates AI-assisted follow-up recommendations based on previous HCP interactions.

**Workflow**

- Retrieves the latest interaction.
- Analyzes interaction context.
- Generates actionable recommendations using the LLM.
- Displays recommendations in both the AI chat and the CRM interface.

**Example Prompt**

```
Recommend follow-up actions for Dr. Sarah Johnson.
```
---

# Project Structure

```
AI-First-CRM-HCP/
│
├── backend/
│   ├── app/
│   │   ├── api/                    # FastAPI routes
│   │   ├── config/                 # Application configuration
│   │   ├── database/               # Database connection
│   │   ├── langgraph/              # LangGraph workflow
│   │   │   ├── graph.py
│   │   │   ├── state.py
│   │   │   ├── router_node.py
│   │   │   ├── extractor.py
│   │   │   ├── followup_node.py
│   │   │   ├── summarize_node.py
│   │   │   ├── search_node.py
│   │   │   └── edit_nodes.py
│   │   ├── models/                 # SQLAlchemy models
│   │   ├── prompts/                # LLM prompts
│   │   ├── schemas/                # Pydantic schemas
│   │   ├── services/               # Business logic
│   │   └── main.py                 # FastAPI entry point
│   │
│   ├── requirements.txt
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── screenshots/
│
├── docs/
│
├── README.md
│
└── .gitignore
```

---

# Project Workflow

The application follows an AI-first workflow where users interact exclusively through the AI Assistant instead of manually filling CRM forms.

### Step 1 — User Interaction

The user enters a natural language prompt into the AI Assistant.

Example:

```
Today I met Dr. Sarah Johnson.
We discussed Product X.
The sentiment was positive and I shared brochures.
```

---

### Step 2 — Intent Detection

The request is sent to the FastAPI backend.

The LangGraph Router analyzes the prompt and determines which tool should process it.

---

### Step 3 — Tool Execution

Depending on the detected intent, one of the five LangGraph tools executes.

Examples include:

- Log Interaction
- Edit Interaction
- Search HCP
- Summarize Interaction
- Follow-up Recommendation

---

### Step 4 — Database Operations

When required, the selected tool retrieves or stores data in the PostgreSQL database.

---

### Step 5 — Response Generation

The selected tool returns structured data to the frontend.

Examples include:

- Updated interaction fields
- HCP details
- Interaction summaries
- AI-generated follow-up recommendations

---

### Step 6 — Frontend Update

The React frontend automatically updates:

- CRM interaction form
- AI Assistant chat
- Follow-up recommendation panel

without requiring manual data entry.

---

# Installation

## Prerequisites

Before running the project, ensure the following software is installed:

- Python 3.11+
- Node.js 18+
- PostgreSQL
- Git

---

## Backend Setup

Clone the repository:

```bash
git clone https://github.com/<your-username>/AI-First-CRM-HCP.git
```

Navigate to the backend folder:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment.

macOS/Linux:

```bash
source venv/bin/activate
```

Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the backend server:

```bash
uvicorn app.main:app --reload
```

Backend URL:

```
http://127.0.0.1:8000
```

Swagger Documentation:

```
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the React application:

```bash
npm run dev
```

Frontend URL:

```
http://localhost:5173
```

---

# Database Configuration

Create a PostgreSQL database.

Update the database connection in the backend configuration file with your PostgreSQL credentials.

After configuring the database, start the FastAPI server.

The required tables will be created automatically by SQLAlchemy.

---

# API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/agent/chat` | AI Assistant endpoint |
| POST | `/hcp` | Create Healthcare Professional |
| GET | `/hcp/{id}` | Retrieve HCP details |
| POST | `/interaction` | Save interaction |
| GET | `/interaction/{id}` | Retrieve interaction |
