import datetime
from pydantic import BeforeValidator, EmailStr, BaseModel, Field
from typing import Annotated, Optional
from bson import ObjectId

PyObjectId = Annotated[str, BeforeValidator(str)]


# prod - product
# cpn - coupon


class Order(BaseModel):
    # email: EmailStr = Field(...)
    shop_name: str = Field(...)
    prod_cat: str = Field(...)
    prod: object = Field()
    # prod_name: str = Field(...)
    # prod_quantity: float = Field(...)
    # prod_price: float = Field(...)
    # cpn_code: str = Field(...)