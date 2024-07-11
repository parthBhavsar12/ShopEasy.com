import datetime
from pydantic import BeforeValidator, EmailStr, BaseModel, Field
from typing import Annotated, Optional
from bson import ObjectId

PyObjectId = Annotated[str, BeforeValidator(str)]



class Contact(BaseModel):
    name: str = Field(...)
    email: EmailStr = Field(...)
    message: str = Field(...)