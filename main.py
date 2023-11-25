from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import create_engine, Column, String, Float
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from typing import List
from pydantic import BaseModel
from sqlalchemy.exc import OperationalError

# Configuración de la aplicación FastAPI
app = FastAPI()

# Configuración de la cadena de conexión pyodbc
SERVER = "LAPTOP"
DATABASE = "basededatos1"
USERNAME = "sa"
PASSWORD = "12345"

# Construye la cadena de conexión
connectionString = f'mssql+pyodbc://{USERNAME}:{PASSWORD}@{SERVER}/{DATABASE}?driver=ODBC+Driver+17+for+SQL+Server'
print(f"Connection String: {connectionString}")

# Configuración de SQLAlchemy con la cadena de conexión directa
engine = create_engine(connectionString)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Definición de la clase de modelo SQLAlchemy
Base = declarative_base()

class UserInfo(Base):
    __tablename__ = "user_info"

    id = Column(String, primary_key=True, index=True)
    docType = Column(String)
    docNumber = Column(Float)
    firstName = Column(String)
    secondName = Column(String)
    lastName = Column(String)
    birthDate = Column(String)
    gender = Column(String)
    email = Column(String)
    phone = Column(Float)

# Crea las tablas de la base de datos
Base.metadata.create_all(bind=engine)

# Definición de la clase de modelo Pydantic
class UserInfoSchema(BaseModel):
    id: str
    docType: str
    docNumber: float
    firstName: str
    secondName: str
    lastName: str
    birthDate: str
    gender: str
    email: str
    phone: float

# Definición de la función para obtener la sesión de la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Rutas de la API FastAPI
@app.get('/UserInfo', response_model=List[UserInfoSchema])
def get_all_user_info(db: Session = Depends(get_db)):
    return db.query(UserInfo).all()

@app.get('/UserInfo/{user_info_id}', response_model=UserInfoSchema)
def get_user_info(user_info_id: str, db: Session = Depends(get_db)):
    return db.query(UserInfo).filter(UserInfo.id == user_info_id).first()

@app.post('/UserInfo', response_model=UserInfoSchema)
def create_user_info(user_info: UserInfoSchema, db: Session = Depends(get_db)):
    db_obj = UserInfo(**user_info.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.delete('/UserInfo/{user_info_id}', response_model=UserInfoSchema)
def delete_user_info(user_info_id: str, db: Session = Depends(get_db)):
    user_info = db.query(UserInfo).filter(UserInfo.id == user_info_id).first()
    if user_info:
        db.delete(user_info)
        db.commit()
        return user_info
    raise HTTPException(status_code=404, detail="Información de usuario no encontrada")

# Ruta de verificación de conexión
@app.get("/check_connection")
def check_connection():
    try:
        with engine.connect() as connection:
            result = connection.execute("SELECT 1").scalar()
            return {"message": "La conexión a la base de datos está funcionando correctamente."}
    except Exception as e:
        print(f"Error de conexión a la base de datos: {e}")
        raise HTTPException(status_code=500, detail="Error interno del servidor")