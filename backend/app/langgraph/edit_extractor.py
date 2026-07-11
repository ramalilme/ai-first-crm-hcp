from langchain_core.messages import HumanMessage, SystemMessage

from app.langgraph.groq_client import llm
from app.schemas.edit_interaction import EditInteraction
from app.prompts.edit_prompt import SYSTEM_PROMPT

structured_llm = llm.with_structured_output(EditInteraction)


def extract_edit(text: str):
    return structured_llm.invoke(
        [
            SystemMessage(content=SYSTEM_PROMPT),
            HumanMessage(content=text),
        ]
    )