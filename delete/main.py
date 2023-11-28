from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
app = FastAPI()
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://user:password@mysql:3306/personas"
engine = create_engine(SQLALCHEMY_DATABASE_URL)

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Date

Base = declarative_base()

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class Persona(Base):
    __tablename__ = "personas"
    docType = Column(String(255))
    docNumber = Column(String(255), primary_key=True)
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



app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
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

@app.delete("/delete/{pk}")
def eliminar_persona(pk: int, db: Session = Depends(get_db)):
    persona = db.query(Persona).filter(Persona.docNumber == pk).first()

    if persona is None:
        raise HTTPException(status_code=404, detail="Persona no encontrada")

    db.delete(persona)
    db.commit()

    return {"message": "Persona eliminada exitosamente"}
