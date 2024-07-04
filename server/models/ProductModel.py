import datetime
from pydantic import BeforeValidator, EmailStr, BaseModel, Field
from typing import Annotated, Optional
from bson import ObjectId

PyObjectId = Annotated[str, BeforeValidator(str)]


# prod - product


class Product(BaseModel):
    email: EmailStr = Field(...)
    prod_name: str = Field(...)
    prod_category: str = Field(...)
    prod_price: float = Field(...)
    prod_quantity: int = Field(...)
    prod_image: str = Field(...)