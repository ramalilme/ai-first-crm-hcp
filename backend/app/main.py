from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config.settings import MODEL_NAME
from app.database.connection import Base, engine
from app.api.hcp import router as hcp_router
from app.api.interaction import router as interaction_router
import app.models
from app.api.agent import router as agent_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(hcp_router)
app.include_router(interaction_router)
app.include_router(agent_router)

@app.get("/")
def home():
    return {
        "message": "Welcome to the AI-First CRM HCP Backend!"
    }

