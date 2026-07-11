from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.oauth2 import get_current_user
from app.database.database import get_db
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserResponse

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.get(
    "/me",
    response_model=UserResponse
)
def get_me(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    user = UserRepository.get_by_email(
        db,
        current_user["sub"]
    )

    return user