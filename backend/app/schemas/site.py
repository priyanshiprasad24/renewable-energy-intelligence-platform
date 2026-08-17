from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class SiteCreate(BaseModel):
    name: str
    location: str = Field(..., min_length=3)
    project_id: int


class SiteUpdate(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = Field(None, min_length=3)
    latitude: Optional[float] = Field(None, ge=-90, le=90)
    longitude: Optional[float] = Field(None, ge=-180, le=180)


class SiteResponse(BaseModel):
    id: int
    name: str
    latitude: float
    longitude: float
    project_id: int
    created_at: datetime

    model_config = {
        "from_attributes": True
    }