from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.schemas.hcp import HCPCreate, HCPResponse
from app.services.hcp_service import create_hcp

router = APIRouter(
    prefix="/hcp",
    tags=["HCP"]
)


@router.post("/", response_model=HCPResponse)
def add_hcp(
    hcp: HCPCreate,
    db: Session = Depends(get_db)
):
    return create_hcp(db, hcp)