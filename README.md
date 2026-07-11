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
