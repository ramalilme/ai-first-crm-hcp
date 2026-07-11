from langgraph.graph import StateGraph, END
from app.langgraph.router_node import route_intent_node
from app.langgraph.edit_nodes import edit_interaction_node
from app.langgraph.state import CRMState
from app.langgraph.nodes import (
    extract_node,
    find_hcp_node,
    save_interaction_node,
)

builder = StateGraph(CRMState)
builder.add_node("router", route_intent_node)
builder.add_node("extract", extract_node)
builder.add_node("find_hcp", find_hcp_node)
builder.add_node("save_interaction", save_interaction_node)
builder.add_node("edit_interaction", edit_interaction_node)

builder.set_entry_point("router")



def route_after_router(state: CRMState):
    if state["intent"] == "log_interaction":
        return "extract"

    if state["intent"] == "edit_interaction":
        return "edit_interaction"

    return END


builder.add_conditional_edges(
    "router",
    route_after_router,
    {
        "extract": "extract",
        "edit_interaction": "edit_interaction",
        END: END,
    },
)
builder.add_edge("extract", "find_hcp")
builder.add_edge("find_hcp", "save_interaction")
builder.add_edge("save_interaction", END)

crm_graph = builder.compile()