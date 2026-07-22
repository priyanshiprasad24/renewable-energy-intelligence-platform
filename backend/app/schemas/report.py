from pydantic import BaseModel


class ReportRequest(BaseModel):
    latitude: float
    longitude: float


class ReportResponse(BaseModel):
    location: str

    solar_score: int
    solar_suitability: str

    wind_score: int
    wind_suitability: str

    overall_recommendation: str