from fastapi import APIRouter

from app.langgraph.graph import crm_graph
from app.schemas.agent import AgentRequest, AgentResponse

router = APIRouter(
    prefix="/agent",
    tags=["AI Agent"],
)


@router.post("/chat", response_model=AgentResponse)
def chat(request: AgentRequest):

    state = {
        "user_input": request.message,
        "extraction": None,
        "hcp_id": None,
        "success": False,
        "message": "",
    }

    result = crm_graph.invoke(state)

    return AgentResponse(
        success=result["success"],
        message=result["message"],
    )