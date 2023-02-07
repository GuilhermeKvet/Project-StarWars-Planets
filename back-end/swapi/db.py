from sqlmodel import create_engine, SQLModel

db_name = "database.sqlite"
db_url = f"sqlite:///{db_name}"

connect_args = {"check_same_thread": False}

engine = create_engine(db_url, echo=True, connect_args=connect_args)


def create_db_and_tables():
    from . import model  # noqa: F401

    SQLModel.metadata.create_all(engine)
