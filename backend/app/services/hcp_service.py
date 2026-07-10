from sqlalchemy.orm import Session

from app.models.hcp import HCP
from app.schemas.hcp import HCPCreate


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