import datetime
from pydantic import BeforeValidator, EmailStr, BaseModel, Field
from typing import Annotated, Optional
from bson import ObjectId

PyObjectId = Annotated[str, BeforeValidator(str)]


# cpn - coupon


class Coupon(BaseModel):
    shop_id: EmailStr = Field(...)
    cpn_code: str = Field(...)
    prod_name: str = Field(...)
    cpn_quantity: float = Field(...)
    cpn_discount: float = Field(...)
    start_datetime: str = Field(...)
    end_datetime: str = Field(...)