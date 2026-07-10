from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.schemas.hcp import (
    HCPCreate,
    HCPUpdate,
    HCPResponse
)
from app.services.hcp_service import (
    create_hcp,
    get_all_hcps,
    get_hcp_by_id,
    update_hcp,
    delete_hcp
)


router = APIRouter(
    prefix="/hcp",
    tags=["HCP"]
)

@router.get("/", response_model=list[HCPResponse])
def read_hcps(
    db: Session = Depends(get_db)
):
    return get_all_hcps(db)


@router.post("/", response_model=HCPResponse)
def add_hcp(
    hcp: HCPCreate,
    db: Session = Depends(get_db)
):
    return create_hcp(db, hcp)

@router.get("/{hcp_id}", response_model=HCPResponse)
def read_hcp(
    hcp_id: int,
    db: Session = Depends(get_db)
):
    hcp = get_hcp_by_id(db, hcp_id)

    if not hcp:
        raise HTTPException(
            status_code=404,
            detail="HCP not found"
        )

    return hcp


@router.put("/{hcp_id}", response_model=HCPResponse)
def edit_hcp(
    hcp_id: int,
    hcp: HCPUpdate,
    db: Session = Depends(get_db)
):
    updated = update_hcp(db, hcp_id, hcp)

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="HCP not found"
        )

    return updated


@router.delete("/{hcp_id}")
def remove_hcp(
    hcp_id: int,
    db: Session = Depends(get_db)
):
    deleted = delete_hcp(db, hcp_id)

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="HCP not found"
        )

    return {
        "message": "HCP deleted successfully"
    }