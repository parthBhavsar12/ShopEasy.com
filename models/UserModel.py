import datetime
from pydantic import BeforeValidator, EmailStr,BaseModel, Field
from typing import Annotated, Optional
from bson import ObjectId

# Represents an ObjectId field in the database.
# It will be represented as a `str` on the model so that it can be serialized to JSON.
PyObjectId = Annotated[str, BeforeValidator(str)]


#this model will useful for 
# Validate incoming data
# Generate OpenAPI (Swagger) documentation
# Serialize/deserialize data

class User(BaseModel):
     email:EmailStr = Field(...)
     password: str = Field(...,min_length=8,max_length=16)
     role: str = Field("user", enum=["user", "shopkeeper","admin"])
     # is_shopkeeper:bool = Field(...,min_length=8,max_length=16)
     # created: datetime = Field(default_factory=datetime_now_sec)

class UserLogin(BaseModel):
    email:EmailStr = Field(...)
    password:str = Field(...,min_length=8,max_length=16)



