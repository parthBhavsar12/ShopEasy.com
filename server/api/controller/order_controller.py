from datetime import datetime, timedelta, timezone
import os
from typing import Collection
from bson import ObjectId
from fastapi import Depends, HTTPException, Request, Response, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from dependencies.dependencies import get_order_collection
from models.OrderModel import Order
from config import settings

# def add_to_order(order: Order,response:Response,order_collection:Collection):
#         order_data = order.model_dump()
#         result = order_collection.insert_one(order_data)
#         return {
#         "status": "success",
#         "message": "product added to order successfully",
#         "order": {
#             # "_id": str(order_data["_id"]),
#             # "order_num": order_data["order_num"],
#             # "cust_name": order_data["cust_name"],
#             # "prod_name": order_data["prod_name"],
#             # "prod_quantity": order_data["prod_quantity"],
#             # "prod_discount": order_data["prod_discount"]
#         }
#     }

def get_current_datetime():
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

def make_new_order(order: Order, response: Response, order_collection: Collection):
    try:
        print("hello world")
        max_order = order_collection.find_one(sort=[("order_num", -1)])
        if max_order:
            counter = max_order["order_num"] + 1
        else:
            counter = 1
        
        print(counter)
        
        order_data = order.model_dump()
        print(order_data)
        
        result = order_collection.insert_one({
            "order_num": counter,
            "cust_id": order_data["cust_id"],
            "cust_name": order_data["cust_name"],
            "shop_name": order_data["shop_name"],
            "status": order_data["status"],
            "datetime": get_current_datetime()
        })
        
        return {
            "status": "success",
            "message": "New order successfully started",
            "order": counter
        }
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))
        # print(str(e))
        # return {
        #     "status": "error",
        #     "message": str(e)
        # }