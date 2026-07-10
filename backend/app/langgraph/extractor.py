from langchain_core.messages import HumanMessage, SystemMessage

from app.langgraph.groq_client import structured_llm
from app.prompts.interaction_prompt import SYSTEM_PROMPT


def extract_interaction(text: str):
    response = structured_llm.invoke(
        [
            SystemMessage(content=SYSTEM_PROMPT),
            HumanMessage(content=text),
        ]
    )

    return response