# AI-First CRM HCP Module

An AI-powered Customer Relationship Management (CRM) application designed for Healthcare Professionals (HCPs). The system enables medical representatives to log, edit, search, summarize, and generate follow-up recommendations for HCP interactions using natural language.

Instead of manually completing interaction forms, users communicate with an AI Assistant that understands conversational input, extracts structured information using a Large Language Model (LLM), and automatically updates the CRM form.

The project is built using **React**, **FastAPI**, **PostgreSQL**, **LangGraph**, and **Groq LLM**, following an AI-first workflow where LangGraph routes user requests to specialized tools.

---

## Project Objective

The objective of this project is to demonstrate how AI agents can simplify CRM workflows in the life sciences domain by allowing sales representatives to interact with the system through natural language instead of traditional form-based data entry.

The application satisfies the assignment requirements by implementing a LangGraph-powered AI agent with five specialized tools:

- Log Interaction
- Edit Interaction
- Search HCP
- Summarize Interaction
- Follow-up Recommendation

The AI assistant automatically understands user intent, routes requests to the appropriate LangGraph node, performs the requested operation, and returns structured results to the frontend.
