from app.langgraph.edit_extractor import extract_edit
from app.langgraph.state import CRMState
from app.database.connection import SessionLocal
from app.services.hcp_service import get_hcp_by_name
from app.services.interaction_service import (
    get_latest_interaction_for_hcp,
    update_interaction_from_ai,
)


def edit_interaction_node(state: CRMState):
    db = SessionLocal()

    try:
        extraction = extract_edit(state["user_input"])

        doctor = None

        if extraction.doctor_name:
            doctor = get_hcp_by_name(db, extraction.doctor_name)
        elif state.get("hcp_id"):
            class _Doctor:
                def __init__(self, id):
                    self.id = id
            doctor = _Doctor(state["hcp_id"])

        if not doctor:
            state["success"] = False
            state["message"] = "Please specify which doctor's interaction to edit."
            return state

        interaction = get_latest_interaction_for_hcp(db, doctor.id)

        if not interaction:
            state["success"] = False
            state["message"] = "No interaction found"
            return state

        interaction = update_interaction_from_ai(
            db=db,
            interaction=interaction,
            extraction=extraction,
        )

        state["interaction"] = interaction
        state["hcp_id"] = doctor.id
        state["extraction"] = extraction
        state["success"] = True
        state["message"] = f"Interaction #{interaction.id} updated successfully."

    finally:
        db.close()

    return state