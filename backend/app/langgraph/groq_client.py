from langchain_groq import ChatGroq

from app.config.settings import (
    GROQ_API_KEY,
    MODEL_NAME,
)
from app.schemas.ai import InteractionExtraction



llm = ChatGroq(
    api_key=GROQ_API_KEY,
    model=MODEL_NAME,
)

structured_llm = llm.with_structured_output(
    InteractionExtraction
)