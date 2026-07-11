from typing import Optional
from pydantic import BaseModel


class AgentRequest(BaseModel):
    message: str


class AgentResponse(BaseModel):
    success: bool
    message: str

    hcp_id: Optional[int] = None

    doctor_name: Optional[str] = None
    interaction_type: Optional[str] = None
    summary: Optional[str] = None
    attendees: Optional[str] = None
    materials_shared: Optional[str] = None
    samples_distributed: Optional[str] = None
    sentiment: Optional[str] = None
    outcomes: Optional[str] = None
    follow_up_actions: Optional[str] = None
    follow_up_date: Optional[str] = None
    intent: Optional[str] = None
    recommendations: list[str] | None = None
