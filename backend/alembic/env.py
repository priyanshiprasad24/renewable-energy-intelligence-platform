import os
from logging.config import fileConfig

from sqlalchemy import engine_from_config, text
from sqlalchemy import pool

from alembic import context

# Alembic Config object
config = context.config

# Interpret the config file for Python logging
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Import models for Alembic autogenerate support
from app.database.database import Base
from app.models.user import User
from app.models.project import Project

target_metadata = Base.metadata


def run_migrations_offline() -> None:
    """Run migrations in offline mode."""

    database_url = os.getenv("DATABASE_URL")

    if database_url:
        url = database_url
    else:
        url = config.get_main_option("sqlalchemy.url")

    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online() -> None:
    """Run migrations in online mode."""

    # Use Render's DATABASE_URL when deployed.
    # Fall back to alembic.ini for local development.
    database_url = os.getenv("DATABASE_URL")

    if database_url:
        config.set_main_option("sqlalchemy.url", database_url)

    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:

        # Enable PostGIS before creating tables that use geometry.
        connection.execute(
            text("CREATE EXTENSION IF NOT EXISTS postgis")
        )
        connection.commit()

        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            include_object=lambda obj, name, type_, reflected, compare_to:
                name != "spatial_ref_sys",
        )

        with context.begin_transaction():
            context.run_migrations()
