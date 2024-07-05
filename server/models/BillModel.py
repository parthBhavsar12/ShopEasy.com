import datetime
from pydantic import BeforeValidator, EmailStr, BaseModel, Field
from typing import Annotated, Optional
from bson import ObjectId

PyObjectId = Annotated[str, BeforeValidator(str)]


# prod - product


class Bill(BaseModel):
    # email: EmailStr = Field(...)
    bill_num: int = Field(...)
    cust_name: str = Field(...)
    prod_name: str = Field(...)
    prod_quantity: float = Field(...)
    prod_discount: float = Field(...)