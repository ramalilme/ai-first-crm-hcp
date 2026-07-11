from app.database.connection import SessionLocal
from app.langgraph.state import CRMState
from app.services.hcp_service import get_hcp_by_name
from app.langgraph.extractor import extract_interaction


def search_hcp_node(state: CRMState):
    db = SessionLocal()

    try:
        extraction = extract_interaction(state["user_input"])

        doctor = get_hcp_by_name(db, extraction.doctor_name)

        if not doctor:
            state["success"] = False
            state["message"] = "HCP not found."
            return state

        state["hcp_id"] = doctor.id
        state["doctor"] = doctor
        state["success"] = True
        state["message"] = f"Found {doctor.name}"

    finally:
        db.close()

    return state