from fastapi import FastAPI
from app.config.settings import MODEL_NAME
from app.database.connection import Base, engine
from app.api.hcp import router as hcp_router
import app.models

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(hcp_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to the AI-First CRM HCP Backend!"
    }

