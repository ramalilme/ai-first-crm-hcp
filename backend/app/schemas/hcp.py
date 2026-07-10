from pydantic import BaseModel, EmailStr
from typing import Optional


class HCPBase(BaseModel):
    name: str
    specialization: Optional[str] = None
    hospital: Optional[str] = None
    city: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None


class HCPCreate(HCPBase):
    pass


class HCPUpdate(HCPBase):
    pass


class HCPResponse(HCPBase):
    id: int

    class Config:
        from_attributes = True