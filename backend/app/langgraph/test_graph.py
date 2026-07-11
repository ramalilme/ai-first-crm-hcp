from app.langgraph.graph import crm_graph

state = {
    "user_input": """
    I met Dr. Sarah Johnson today.

    We discussed oncology medication.

    Follow up in two weeks.
    """,
    "extraction": None,
    "hcp_id": None,
    "success": False,
    "message": "",
}

result = crm_graph.invoke(state)

print(result)