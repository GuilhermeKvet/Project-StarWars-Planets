from fastapi import FastAPI
from swapi.db import create_db_and_tables, engine
from sqlmodel import Session, select
from swapi.db_population import populate_table_empty
from swapi.model import Planet
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()


origins = [
    'http://localhost:3000'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_session():
    return Session(engine)


def create_response(result):
    return {
        "count": len(result),
        "next": None,
        "previous": None,
        "results": result
    }


@app.on_event("startup")
def on_startup():
    create_db_and_tables()
    with get_session() as session:
        populate_table_empty(session)


@app.get('/')
async def home():
    return {'details': 'Go to /docs for documentation'}


@app.get("/api/planets/", tags=["Planets"])
async def list_planets():
    with get_session() as session:
        planets = session.exec(select(Planet)).all()

        return create_response(planets)
