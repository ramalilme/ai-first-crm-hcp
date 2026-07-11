from langgraph.graph import StateGraph, END

from app.langgraph.state import CRMState
from app.langgraph.nodes import (
    extract_node,
    find_hcp_node,
    save_interaction_node,
)

builder = StateGraph(CRMState)

builder.add_node("extract", extract_node)
builder.add_node("find_hcp", find_hcp_node)
builder.add_node("save_interaction", save_interaction_node)

builder.set_entry_point("extract")

builder.add_edge("extract", "find_hcp")
builder.add_edge("find_hcp", "save_interaction")
builder.add_edge("save_interaction", END)

crm_graph = builder.compile()