import datetime
from pydantic import BeforeValidator, EmailStr, BaseModel, Field
from typing import Annotated, Optional
from bson import ObjectId

PyObjectId = Annotated[str, BeforeValidator(str)]


class Order(BaseModel):
    cust_id: EmailStr = Field(...)
    cust_name: str = Field(...)
    shop_name: str = Field()
    status: str = Field(...)

class OrderData(BaseModel):
    order_num: int = Field(...)
    cust_id: EmailStr = Field(...)
    prod_name: str = Field(...)
    prod_price: float = Field(...)
    prod_quantity: float = Field(...)
    cpn_code: str = Field(...)
