from app.langgraph.followup_extractor import generate_followup

result = generate_followup(
    """
Met Dr. Sarah Johnson today.

Discussed CardioX.

Shared brochures.

Doctor was interested.

Follow up in two weeks.
"""
)

print(result)