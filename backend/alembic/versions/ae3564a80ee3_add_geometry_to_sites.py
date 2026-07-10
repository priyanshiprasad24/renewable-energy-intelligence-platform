"""Add geometry to sites

Revision ID: ae3564a80ee3
Revises: 4e14ff6efb98
Create Date: 2026-07-09 17:14:36.136738

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import geoalchemy2

# revision identifiers, used by Alembic.
revision: str = "ae3564a80ee3"
down_revision: Union[str, Sequence[str], None] = "4e14ff6efb98"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""

    op.add_column(
        "sites",
        sa.Column(
            "geometry",
            geoalchemy2.types.Geometry(
                geometry_type="POINT",
                srid=4326,
                dimension=2,
                from_text="ST_GeomFromEWKT",
                name="geometry",
            ),
            nullable=True,
        ),
    )


def downgrade() -> None:
    """Downgrade schema."""

    op.drop_column("sites", "geometry")