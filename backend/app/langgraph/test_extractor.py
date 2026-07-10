from app.langgraph.extractor import extract_interaction

result = extract_interaction(
    """
    I met Dr. Sarah Johnson today.

    We discussed a new oncology medication.

    Follow up in two weeks.
    """
)

print(result)
print(result.doctor_name)
print(result.interaction_type)
print(result.summary)
print(result.follow_up_date)