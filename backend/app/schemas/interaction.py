from datetime import date
from typing import Optional

from pydantic import BaseModel


class InteractionBase(BaseModel):
    hcp_id: int
    interaction_type: str
    interaction_date: date
    summary: str
    follow_up_date: Optional[date] = None
    sentiment: Optional[str] = None


class InteractionCreate(InteractionBase):
    pass


class InteractionUpdate(InteractionBase):
    pass


class InteractionResponse(InteractionBase):
    id: int

    class Config:
        from_attributes = True