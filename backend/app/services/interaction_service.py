from sqlalchemy.orm import Session

from app.models.interaction import Interaction
from app.schemas.interaction import InteractionCreate


def create_interaction(
    db: Session,
    interaction: InteractionCreate
):
    new_interaction = Interaction(
        hcp_id=interaction.hcp_id,
        interaction_type=interaction.interaction_type,
        interaction_date=interaction.interaction_date,
        summary=interaction.summary,
        follow_up_date=interaction.follow_up_date,
        sentiment=interaction.sentiment,
    )

    db.add(new_interaction)
    db.commit()
    db.refresh(new_interaction)

    return new_interaction

from datetime import date, timedelta

from app.models.interaction import Interaction


def create_interaction_from_ai(
    db,
    hcp_id: int,
    extraction,
):
    follow_up = None

    if extraction.follow_up_date:
        text = extraction.follow_up_date.lower()

        if "two week" in text:
            follow_up = date.today() + timedelta(days=14)

        elif "next week" in text:
            follow_up = date.today() + timedelta(days=7)

        elif "tomorrow" in text:
            follow_up = date.today() + timedelta(days=1)

    interaction = Interaction(
        hcp_id=hcp_id,
        interaction_type=extraction.interaction_type,
        interaction_date=date.today(),
        summary=extraction.summary,
        follow_up_date=follow_up,
        sentiment=None,
    )

    db.add(interaction)
    db.commit()
    db.refresh(interaction)

    return interaction

from app.models.interaction import Interaction

def get_interactions(db):
    return db.query(Interaction).all()


def get_latest_interaction_for_hcp(db, hcp_id: int):
    return (
        db.query(Interaction)
        .filter(Interaction.hcp_id == hcp_id)
        .order_by(Interaction.interaction_date.desc(), Interaction.id.desc())
        .first()
    )


def update_interaction_from_ai(
    db,
    interaction,
    extraction,
):
    if extraction.interaction_type is not None:
        interaction.interaction_type = extraction.interaction_type

    if extraction.summary is not None:
        interaction.summary = extraction.summary

    if extraction.sentiment is not None:
        interaction.sentiment = extraction.sentiment

    if extraction.follow_up_date is not None:
        text = extraction.follow_up_date.lower()

        if "two week" in text:
            interaction.follow_up_date = date.today() + timedelta(days=14)
        elif "next week" in text:
            interaction.follow_up_date = date.today() + timedelta(days=7)
        elif "tomorrow" in text:
            interaction.follow_up_date = date.today() + timedelta(days=1)

    db.commit()
    db.refresh(interaction)

    return interaction