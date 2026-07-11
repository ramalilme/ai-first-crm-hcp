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

        doctor = get_hcp_by_name(db, extraction.doctor_name)

        if not doctor:
            state["success"] = False
            state["message"] = "HCP not found"
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
        state["success"] = True
        state["message"] = f"Interaction #{interaction.id} updated successfully."

    finally:
        db.close()

    return state