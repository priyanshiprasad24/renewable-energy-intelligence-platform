from sqlalchemy.orm import Session

from app.models.site import Site
from app.repositories.site_repository import SiteRepository
from app.repositories.project_repository import ProjectRepository
from app.schemas.site import SiteCreate, SiteUpdate
from app.utils.geocoder import get_coordinates


class SiteService:

    @staticmethod
    def create_site(
        db: Session,
        site_data: SiteCreate
    ):
        # Check whether the project exists
        project = ProjectRepository.get_by_id(
            db,
            site_data.project_id
        )

        if not project:
            raise ValueError("Project not found.")

        # Convert the specific location/address
        # into latitude and longitude
        try:
            latitude, longitude = get_coordinates(
                site_data.location
            )
        except ValueError as e:
            raise ValueError(str(e))

        # Create the exact PostGIS geographic point
        # IMPORTANT: PostGIS uses longitude first, latitude second
        site = Site(
            name=site_data.name,
            latitude=latitude,
            longitude=longitude,
            geometry=(
                f"SRID=4326;"
                f"POINT({longitude} {latitude})"
            ),
            project_id=site_data.project_id
        )

        return SiteRepository.create(
            db,
            site
        )

    @staticmethod
    def get_all_sites(
        db: Session
    ):
        return SiteRepository.get_all(db)

    @staticmethod
    def get_sites_by_project(
        db: Session,
        project_id: int
    ):
        return SiteRepository.get_by_project(
            db,
            project_id
        )

    @staticmethod
    def get_site_by_id(
        db: Session,
        site_id: int
    ):
        site = SiteRepository.get_by_id(
            db,
            site_id
        )

        if not site:
            raise ValueError("Site not found.")

        return site

    @staticmethod
    def update_site(
        db: Session,
        site_id: int,
        site_data: SiteUpdate
    ):
        site = SiteRepository.get_by_id(
            db,
            site_id
        )

        if not site:
            raise ValueError("Site not found.")

        update_data = site_data.model_dump(
            exclude_unset=True
        )

        # If the user changes the location,
        # convert the new location into exact coordinates.
        if "location" in update_data:
            try:
                latitude, longitude = get_coordinates(
                    update_data["location"]
                )
            except ValueError as e:
                raise ValueError(str(e))

            site.latitude = latitude
            site.longitude = longitude

            site.geometry = (
                f"SRID=4326;"
                f"POINT({longitude} {latitude})"
            )

            # Remove location because it is not
            # currently a database column
            update_data.pop("location")

        # Allow coordinate updates if they are provided
        if "latitude" in update_data:
            site.latitude = update_data["latitude"]

        if "longitude" in update_data:
            site.longitude = update_data["longitude"]

        # Update other fields such as name
        for key, value in update_data.items():
            if key not in ["latitude", "longitude"]:
                setattr(site, key, value)

        # Keep PostGIS geometry synchronized
        # with the final latitude/longitude
        if (
            "latitude" in update_data
            or "longitude" in update_data
            or "location" in site_data.model_dump(
                exclude_unset=True
            )
        ):
            site.geometry = (
                f"SRID=4326;"
                f"POINT({site.longitude} {site.latitude})"
            )

        return SiteRepository.update(
            db,
            site
        )

    @staticmethod
    def delete_site(
        db: Session,
        site_id: int
    ):
        site = SiteRepository.get_by_id(
            db,
            site_id
        )

        if not site:
            raise ValueError("Site not found.")

        SiteRepository.delete(
            db,
            site
        )

        return {
            "message": "Site deleted successfully."
        }