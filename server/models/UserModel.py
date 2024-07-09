import datetime
from pydantic import BeforeValidator, EmailStr, BaseModel, Field
from typing import Annotated, List, Optional
from bson import ObjectId

# Represents an ObjectId field in the database.
# It will be represented as a `str` on the model so that it can be serialized to JSON.
PyObjectId = Annotated[str, BeforeValidator(str)]


# this model will useful for
# Validate incoming data
# Generate OpenAPI (Swagger) documentation
# Serialize/deserialize data


class User(BaseModel):
    email: EmailStr = Field(...)
    password: str = Field(..., min_length=8, max_length=16)
    role: str = Field("user", enum=["user", "shopkeeper", "admin"])

# class UserShop(BaseModel):
#     email: EmailStr = Field(...)
#     role: str = Field("user", enum=["user", "shopkeeper", "admin"])
#     local_area: str = Field(...)
#     district: str = Field(...)

class UserLogin(BaseModel):
    email: EmailStr = Field(...)
    password: str = Field(..., min_length=8, max_length=16)


class UserShopkeeper(BaseModel):
    email: EmailStr = Field(...)
    shop_name: str = Field(...)
    contact: str = Field(...)
    address: str = Field(...)
    local_area: str = Field(...)
    district: str = Field(...)
    pin: str = Field(...)
    state: str = Field(...)
    country: str = Field(...)


class UserCustomer(BaseModel):
    email: EmailStr = Field(...)
    customer_name: str = Field(...)
    contact: str = Field(...)
    address: str = Field(...)
    local_area: str = Field(...)
    district: str = Field(...)
    pin: str = Field(...)
    state: str = Field(...)
    country: str = Field(...)

class UserEmail(BaseModel):
    email: EmailStr = Field(...)

class ForgotPasswordRequest(BaseModel):
    email: EmailStr = Field(...)

class ResetPasswordRequest(BaseModel):
    token:str = Field(...)
    new_password:str =  Field(...,min_length=8,max_length=16)
    
class EmailSchema(BaseModel):
    email: List[EmailStr]