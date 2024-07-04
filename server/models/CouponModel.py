import datetime
from pydantic import BeforeValidator, EmailStr, BaseModel, Field
from typing import Annotated, Optional
from bson import ObjectId

PyObjectId = Annotated[str, BeforeValidator(str)]


# cpn - coupon


class Coupon(BaseModel):
    email: EmailStr = Field(...)
    cpn_code: str = Field(...)
    cpn_quantity: float = Field(...)
    start_datetime: datetime = Field(...)
    end_datetime: datetime = Field(...)