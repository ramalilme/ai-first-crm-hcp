from typing import List

from pydantic import BaseModel


class FollowUpRecommendation(BaseModel):
    recommendations: List[str]