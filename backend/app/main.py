from fastapi import FastAPI
from app.config.settings import MODEL_NAME
from app.database.connection import Base, engine
from app.api.hcp import router as hcp_router
from app.api.interaction import router as interaction_router
import app.models

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(hcp_router)
app.include_router(interaction_router)

@app.get("/")
def home():
    return {
        "message": "Welcome to the AI-First CRM HCP Backend!"
    }

