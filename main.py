from fastapi import FastAPI, Path 

from redis_om import get_redis_connection, HashModel
from pydantic import BaseModel
app = FastAPI()


redis = get_redis_connection(
    host="redis-12486.c322.us-east-1-2.ec2.cloud.redislabs.com",
    port=12486,
    password="CKsPgLWVdEEUUhg2DYbacqZ5pmeM0Myr",
    decode_responses=True
)
  
class Info(HashModel):
    docType: str
    docNumber: float
    firstName: str
    secondName: str
    lastName: str
    birthDate: str
    gender: str 
    email: str
    phone: float

    class Meta:
        database = redis



@app.get('/UserInfo')
def all():
    return Info.all_pks()