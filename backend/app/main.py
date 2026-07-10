from fastapi import FastAPI
from sqlalchemy import text
from app.api.projects import router as project_router
from app.api.auth import router as auth_router
from app.core.settings import settings
from app.database.database import engine
from app.api.users import router as users_router
from app.api.admin import router as admin_router
from app.api.sites import router as site_router

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION
)

# Register API Routers
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(admin_router)
app.include_router(project_router)
app.include_router(site_router)

@app.get("/")
def root():
    return {
        "message": f"{settings.APP_NAME} API is running 🚀"
    }


@app.get("/db-test")
def db_test():
    try:
        with engine.connect() as connection:
            result = connection.execute(text("SELECT version();"))
            return {
                "status": "Connected Successfully",
                "database": result.scalar()
            }
    except Exception as e:
        return {
            "status": "Connection Failed",
            "error": str(e)
        }