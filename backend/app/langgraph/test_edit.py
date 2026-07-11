from app.langgraph.edit_extractor import extract_edit

result = extract_edit(
    """
Change Dr. Sarah Johnson's last interaction.

Sentiment should be Negative.

Follow up in two weeks.
"""
)

print(result)