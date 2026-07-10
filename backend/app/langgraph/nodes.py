from app.langgraph.extractor import extract_interaction
from app.langgraph.state import CRMState
from app.database.connection import SessionLocal
from app.services.hcp_service import get_hcp_by_name
from app.services.interaction_service import create_interaction_from_ai


def extract_node(state: CRMState):

    extraction = extract_interaction(
        state["user_input"]
    )

    state["extraction"] = extraction

    return state

def find_hcp_node(state: CRMState):

    db = SessionLocal()

    try:
        doctor = get_hcp_by_name(
            db,
            state["extraction"].doctor_name
        )

        if doctor:
            state["hcp_id"] = doctor.id
            state["success"] = True
            state["message"] = "HCP found"

        else:
            state["success"] = False
            state["message"] = "HCP not found"

    finally:
        db.close()

    return state

def save_interaction_node(state: CRMState):

    if not state["success"]:
        return state

    db = SessionLocal()

    try:
        interaction = create_interaction_from_ai(
            db=db,
            hcp_id=state["hcp_id"],
            extraction=state["extraction"],
        )

        state["message"] = (
            f"Interaction #{interaction.id} created successfully."
        )

    finally:
        db.close()

    return state