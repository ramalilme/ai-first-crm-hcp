from app.langgraph.graph import crm_graph

result = crm_graph.invoke(
    {
        "user_input": "Recommend follow-up actions for Dr. Sarah Johnson.",
        "extraction": None,
        "interaction": None,
        "hcp_id": None,
        "intent": "",
        "recommendations": None,
        "success": False,
        "message": "",
    }
)

print(result)