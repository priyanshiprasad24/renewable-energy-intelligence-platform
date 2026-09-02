from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert "message" in response.json()


def test_cors():
    response = client.get("/test")
    assert response.status_code == 200
    assert response.json()["message"] == "CORS working"


def test_projects_requires_authentication():
    response = client.get("/projects")
    assert response.status_code == 401


def test_sites_requires_authentication():
    response = client.get("/sites")
    assert response.status_code == 401