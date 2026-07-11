from app.database.connection import SessionLocal
from app.langgraph.extractor import extract_interaction
from app.langgraph.state import CRMState
from app.services.hcp_service import get_hcp_by_name
from app.services.interaction_service import get_latest_interaction_for_hcp


def summarize_node(state: CRMState):
    db = SessionLocal()

    try:
        extraction = extract_interaction(state["user_input"])

        doctor = get_hcp_by_name(db, extraction.doctor_name)

        if not doctor:
            state["success"] = False
            state["message"] = "HCP not found."
            return state

        interaction = get_latest_interaction_for_hcp(db, doctor.id)

        if not interaction:
            state["success"] = False
            state["message"] = "No interaction found."
            return state

        summary = f"""
Interaction with {doctor.name}

• Type: {interaction.interaction_type}
• Date: {interaction.interaction_date}
• Summary: {interaction.summary}
• Sentiment: {interaction.sentiment}
• Follow-up Date: {interaction.follow_up_date}
"""

        state["summary"] = summary
        state["hcp_id"] = doctor.id
        state["doctor"] = doctor
        state["success"] = True
        state["message"] = "Interaction summarized."

    finally:
        db.close()

    return state