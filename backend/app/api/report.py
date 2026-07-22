from fastapi import APIRouter

from app.schemas.report import ReportRequest, ReportResponse
from app.services.report_service import ReportService

router = APIRouter(
    prefix="/report",
    tags=["Assessment Report"]
)


@router.post(
    "/generate",
    response_model=ReportResponse
)
def generate(data: ReportRequest):

    return ReportService.generate(
        data.latitude,
        data.longitude
    )