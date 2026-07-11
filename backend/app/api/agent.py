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
    summary = result.get("summary")
    print(result)
    
    extraction = result.get("extraction")

    doctor = result.get("doctor")
    summary = result.get("summary")

    return AgentResponse(
        success=result["success"],
        message=result["message"],
        intent=result["intent"],

        doctor_name=(
            doctor.name
            if doctor
            else (
                extraction.doctor_name
                if extraction else None
            )
        ),

        interaction_type=(
            extraction.interaction_type
            if extraction else None
        ),

        summary=(
            summary
            if summary
            else (
                extraction.summary
                if extraction else None
            )
        ),

        attendees=(
            extraction.attendees
            if extraction else None
        ),

        materials_shared=(
            extraction.materials_shared
            if extraction else None
        ),

        samples_distributed=(
            extraction.samples_distributed
            if extraction else None
        ),

        sentiment=(
            extraction.sentiment
            if extraction else None
        ),

        outcomes=(
            extraction.outcomes
            if extraction else None
        ),

        follow_up_actions=(
            extraction.follow_up_actions
            if extraction else None
        ),

        follow_up_date=(
            extraction.follow_up_date
            if extraction else None
        ),

        hcp_id=result.get("hcp_id"),
        recommendations=result.get("recommendations"),
    )