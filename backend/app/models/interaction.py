from datetime import datetime

from sqlalchemy import Column, Date, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from app.database.connection import Base


class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)

    hcp_id = Column(Integer, ForeignKey("hcp.id"), nullable=False)

    interaction_type = Column(String(100), nullable=False)

    interaction_date = Column(Date, nullable=False)

    summary = Column(Text, nullable=False)

    follow_up_date = Column(Date)

    sentiment = Column(String(50))

    created_at = Column(DateTime, default=datetime.utcnow)

    hcp = relationship("HCP", back_populates="interactions")