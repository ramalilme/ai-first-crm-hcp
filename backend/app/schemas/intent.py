from typing import Literal

from pydantic import BaseModel


class IntentClassification(BaseModel):
    intent: Literal[
        "log_interaction",
        "edit_interaction",
        "search_hcp",
        "summarize_interaction",
        "followup_recommendation",
    ]