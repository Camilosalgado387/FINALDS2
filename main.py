from fastapi import FastAPI, Path, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from redis_om import get_redis_connection, HashModel
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_methods=['*'],
    allow_headers=['*']
)

redis = get_redis_connection(
    host="redis-12486.c322.us-east-1-2.ec2.cloud.redislabs.com",
    port=12486,
    password="CKsPgLWVdEEUUhg2DYbacqZ5pmeM0Myr",
    decode_responses=True
)
  
class Info(HashModel):
    docType: str
    docNumber: int
    firstName: str
    secondName: str
    lastName: str
    birthDate: str
    gender: str 
    email: str
    phone: int

    class Meta:
        database = redis

@app.get('/')
def all():
    return [format(pk) for pk in Info.all_pks()]

def format(pk: str):
    info = Info.get(pk)

    return{
        'id': info.pk,
        'docType': info.docType,
        'docNumber': info.docNumber,
        'firstName': info.firstName,
        'secondName': info.secondName,
        'lastName': info.lastName,
        'birthDate': info.birthDate,
        'gender': info.gender, 
        'email': info.email,
        'phone': info.phone
    }

@app.post('/UserInfo')
def create(info: Info):
    return info.save()

@app.get('/UserInfo/{pk}')
def get(pk : str):
     return [format(pk) for pk in Info.all_pks()]