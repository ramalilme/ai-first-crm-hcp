from app.langgraph.nodes import (
    extract_node,
    find_hcp_node,
    save_interaction_node
)

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

state = extract_node(state)
state = find_hcp_node(state)
state = save_interaction_node(state)
print(state)