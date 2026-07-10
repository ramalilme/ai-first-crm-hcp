from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from app.config.settings import DATABASE_URL

# Create the SQLAlchemy engine
engine = create_engine(
    DATABASE_URL,
    echo=True  # Shows SQL queries in the terminal (great for learning)
)

# Create sessions
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

# Base class for all models
Base = declarative_base()