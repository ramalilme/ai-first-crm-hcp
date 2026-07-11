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

    hcp_id=result["hcp_id"],

    doctor_name=result["extraction"].doctor_name,
    interaction_type=result["extraction"].interaction_type,
    summary=result["extraction"].summary,

    attendees=result["extraction"].attendees,
    materials_shared=result["extraction"].materials_shared,
    samples_distributed=result["extraction"].samples_distributed,
    sentiment=result["extraction"].sentiment,
    outcomes=result["extraction"].outcomes,
    follow_up_actions=result["extraction"].follow_up_actions,

    follow_up_date=result["extraction"].follow_up_date,
)