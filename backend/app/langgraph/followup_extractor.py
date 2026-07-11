from langchain_core.messages import HumanMessage, SystemMessage

from app.langgraph.groq_client import llm
from app.prompts.followup_prompt import SYSTEM_PROMPT
from app.schemas.followup import FollowUpRecommendation

structured_llm = llm.with_structured_output(FollowUpRecommendation)


def generate_followup(text: str):
    return structured_llm.invoke(
        [
            SystemMessage(content=SYSTEM_PROMPT),
            HumanMessage(content=text),
        ]
    )