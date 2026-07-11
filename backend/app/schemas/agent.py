from pydantic import BaseModel


class AgentRequest(BaseModel):
    message: str


class AgentResponse(BaseModel):
    success: bool
    message: str