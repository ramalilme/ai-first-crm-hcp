from typing import Optional

from pydantic import BaseModel


class InteractionExtraction(BaseModel):
    doctor_name: Optional[str] = None
    interaction_type: Optional[str] = None
    summary: Optional[str] = None
    follow_up_date: Optional[str] = None