from app.langgraph.followup_extractor import generate_followup
from app.langgraph.state import CRMState


def followup_node(state: CRMState):

    recommendations = generate_followup(state["user_input"])

    state["success"] = True
    state["message"] = "Follow-up recommendations generated."
    state["recommendations"] = recommendations.recommendations

    return state