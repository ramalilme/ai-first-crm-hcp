from app.langgraph.graph import crm_graph

state = {
    "user_input": "Actually change Dr. Sarah Johnson's sentiment to Negative.",
    "intent": None,
    "extraction": None,
    "hcp_id": None,
    "interaction": None,
    "success": False,
    "message": "",
}

result = crm_graph.invoke(state)

print(result)