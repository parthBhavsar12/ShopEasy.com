from datetime import datetime, timedelta, timezone
import os
from typing import Collection
from bson import ObjectId
from fastapi import Depends, HTTPException, Request, Response,status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from dependencies.dependencies import get_order_collection
from models.OrderModel import Order
from config import settings

def add_to_order(order: Order,response:Response,order_collection:Collection):
        order_data = order.model_dump()
        result = order_collection.insert_one(order_data)
        return {
        "status": "success",
        "message": "product added to order successfully",
        "order": {
            # "_id": str(order_data["_id"]),
            # "order_num": order_data["order_num"],
            # "cust_name": order_data["cust_name"],
            # "prod_name": order_data["prod_name"],
            # "prod_quantity": order_data["prod_quantity"],
            # "prod_discount": order_data["prod_discount"]
        }
    }