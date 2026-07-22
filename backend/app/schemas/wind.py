from pydantic import BaseModel


class WindRequest(BaseModel):
    wind_speed: float
    elevation: float


class WindResponse(BaseModel):
    wind_score: int
    suitability: str
    recommendation: str