from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:@localhost:3306/personas"
engine = create_engine(SQLALCHEMY_DATABASE_URL)

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Date

Base = declarative_base()

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class Persona(Base):
    __tablename__ = "personas"
    docType = Column(Integer, primary_key=True)
    docNumber = Column(String(255))
    firstName = Column(String(255))
    secondName = Column(String(255))
    lastName = Column(String(255))
    birthDate = Column(Date)
    gender = Column(String(10))
    email = Column(String(255))
    phone = Column(String(20))

Base.metadata.create_all(bind=engine)

class PersonaCreate(BaseModel):
    docType: str
    docNumber: str
    firstName: str
    secondName: str
    lastName: str
    birthDate: str
    gender: str
    email: str
    phone: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_methods=['*'],
    allow_headers=['*']
)

# Obtener instancia de la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/crear")
def crear_persona(persona: PersonaCreate, db: Session = Depends(get_db)):
    # Crea una instancia del modelo SQLAlchemy
    db_persona = Persona(**persona.dict())

    # Agrega la instancia a la sesión y la persiste en la base de datos
    db.add(db_persona)
    db.commit()
    db.refresh(db_persona)

    return {"message": "Persona creada exitosamente", "data": db_persona}
