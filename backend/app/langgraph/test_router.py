from app.langgraph.router_node import route_intent_node

state = {
    "user_input": "I met Dr. Sarah Johnson today.",
    "intent": None,
}

result = route_intent_node(state)

print(result)