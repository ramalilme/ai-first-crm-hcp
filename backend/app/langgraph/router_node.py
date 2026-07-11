from langchain_core.messages import HumanMessage, SystemMessage

from app.langgraph.groq_client import llm
from app.langgraph.state import CRMState
from app.prompts.router_prompt import SYSTEM_PROMPT
from app.schemas.intent import IntentClassification

structured_router = llm.with_structured_output(IntentClassification)


def route_intent_node(state: CRMState):
    result = structured_router.invoke(
        [
            SystemMessage(content=SYSTEM_PROMPT),
            HumanMessage(content=state["user_input"]),
        ]
    )

    state["intent"] = result.intent

    return state