from typing import TypedDict, Optional

from app.schemas.ai import InteractionExtraction


class CRMState(TypedDict):
    user_input: str

    extraction: Optional[InteractionExtraction]

    hcp_id: Optional[int]

    success: bool

    message: str