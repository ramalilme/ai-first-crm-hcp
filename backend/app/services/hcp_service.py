from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.hcp import HCP
from app.schemas.hcp import HCPCreate, HCPUpdate


def create_hcp(db: Session, hcp: HCPCreate):
    new_hcp = HCP(
        name=hcp.name,
        specialization=hcp.specialization,
        hospital=hcp.hospital,
        city=hcp.city,
        email=hcp.email,
        phone=hcp.phone,
    )

    db.add(new_hcp)
    db.commit()
    db.refresh(new_hcp)

    return new_hcp

def get_all_hcps(db: Session):
    return db.query(HCP).all()

def get_hcp_by_id(db: Session, hcp_id: int):
    return db.query(HCP).filter(HCP.id == hcp_id).first()

def update_hcp(db: Session, hcp_id: int, hcp_data: HCPUpdate):
    hcp = db.query(HCP).filter(HCP.id == hcp_id).first()

    if not hcp:
        return None

    hcp.name = hcp_data.name
    hcp.specialization = hcp_data.specialization
    hcp.hospital = hcp_data.hospital
    hcp.city = hcp_data.city
    hcp.email = hcp_data.email
    hcp.phone = hcp_data.phone

    db.commit()
    db.refresh(hcp)

    return hcp


def delete_hcp(db: Session, hcp_id: int):
    hcp = db.query(HCP).filter(HCP.id == hcp_id).first()

    if not hcp:
        return None

    db.delete(hcp)
    db.commit()

    return hcp

def get_hcp_by_name(db: Session, name: str):
    return (
        db.query(HCP)
        .filter(func.lower(HCP.name) == func.lower(name))
        .first()
    )