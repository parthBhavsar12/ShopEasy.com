from datetime import datetime, timedelta, timezone
import os
from pymongo.cursor import Cursor
from typing import Collection, List
from bson import ObjectId
from fastapi import Depends, HTTPException, Request, Response, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from dependencies.dependencies import get_order_collection
from models.OrderModel import Order
from models.OrderModel import OrderData
from config import settings

# def add_to_order(order: Order,response:Response,order_collection:Collection):
#         order_data = order.model_dump()
#         result = order_collection.insert_one(order_data)
#         return {
#         "status": "success",
#         "message": "orderdata added to order successfully",
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
        # print("hello world")
        max_order = order_collection.find_one(sort=[("order_num", -1)])
        if max_order:
            counter = max_order["order_num"] + 1
        else:
            counter = 1

        # print(counter)

        order_data = order.model_dump()
        # print(order_data)

        result = order_collection.insert_one(
            {
                "order_num": counter,
                "cust_id": order_data["cust_id"],
                "shop_id":order_data["shop_id"],
                "cust_name": order_data["cust_name"],
                "shop_name": order_data["shop_name"],
                "status": order_data["status"],
                "datetime": get_current_datetime(),
            }
        )

        return {
            "status": "success",
            "message": "New order successfully started",
            "order": counter,
        }
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))
        # print(str(e))
        # return {
        #     "status": "error",
        #     "message": str(e)
        # }


def find_and_send_order(order_num: str, order_collection: Collection):
    try:
        print(order_num)
        data = order_collection.find_one({"order_num": int(order_num)})
        print(data)
        if data:    
            return {
                "order_num": data["order_num"],
                "cust_id": data["cust_id"],
                "cust_name": data["cust_name"],
                "shop_id":data["shop_id"],
                "shop_name": data["shop_name"],
                "status": data["status"],
                "datetime": data["datetime"],
            }
        else:
            raise HTTPException(status_code=404, detail="Order fetching failed")
    except Exception as e:
        print(f"An error occurred: {e}")
        raise HTTPException(status_code=500, detail="An internal error occurred")


def add_order_entry(order_data: OrderData, orderdata_collection: Collection, coupon_collection: Collection):
    try:
        data = order_data.model_dump()
        if data["cpn_code"] == "-":
            discount = 0
        else:
            discount_percentage = coupon_collection.find_one({"cpn_code": data["cpn_code"]})["cpn_discount"]
            discount = data["prod_price"] * discount_percentage / 100
        result = orderdata_collection.insert_one({
            "order_num": data["order_num"],
            "cust_id": data["cust_id"],
            "shop_name": data["shop_name"],
            "prod_name": data["prod_name"],
            "prod_price": data["prod_price"],
            "prod_quantity": data["prod_quantity"],
            "cpn_code": data["cpn_code"],
            "discount": discount
        })
        # print(data)
        return {
            "status": "success",
            "message": "order updated successfully."
        }
    except Exception as e:
        print(f"An error occurred: {e}")
        raise HTTPException(status_code=500, detail="An internal error occurred")

def serialize_orderdata(orderdata):
    """Serialize MongoDB ObjectId to string if necessary."""
    if isinstance(orderdata.get("_id"), ObjectId):
        orderdata["_id"] = str(orderdata["_id"])
    return orderdata

def fetch_and_return_order_data(cust_id: str, order_num: str, orderdata_collection: Collection):
    try:
        orderdatas_cursor: Cursor = orderdata_collection.find({"cust_id": cust_id, "order_num": int(order_num)})
        # orderdatas_cursor: Cursor = orderdata_collection.find()
        orderdatas: List[dict] = [
            serialize_orderdata(orderdata) for orderdata in orderdatas_cursor
        ]
        return {
            "status": "success",
            "message": "Orderdata fetched successfully.",
            "orderdatas": orderdatas,
        }
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Orderdata fetching failed: {str(e)}"
        )
    
def fetch_and_return_customer_order_data(cust_id: str, orderdata_collection: Collection):
    try:
        orderdatas_cursor: Cursor = orderdata_collection.find({"cust_id": cust_id})
        # orderdatas_cursor: Cursor = orderdata_collection.find()
        orderdatas: List[dict] = [
            serialize_orderdata(orderdata) for orderdata in orderdatas_cursor
        ]
        return {
            "status": "success",
            "message": "Orderdata fetched successfully.",
            "orderdatas": orderdatas,
        }
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Orderdata fetching failed: {str(e)}"
        )

def delete_orderdata(data_id: str, orderdata_collection: Collection):
    try:
        result = orderdata_collection.delete_one({"_id": ObjectId(data_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Data not found")
        return {"status": "success", "message": "Data deleted successfully"}
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Data deleting failed: {str(e)}"
        )

def fetch_and_return_all_customer_order_data(cust_id: str, orderdata_collection: Collection):
    try:
        orderdatas_cursor: Cursor = orderdata_collection.find({"cust_id": cust_id})
        # orderdatas_cursor: Cursor = orderdata_collection.find()
        orderdatas: List[dict] = [
            serialize_orderdata(orderdata) for orderdata in orderdatas_cursor
        ]
        return {
            "status": "success",
            "message": "Orderdata fetched successfully.",
            "orderdatas": orderdatas,
        }
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Orderdata fetching failed: {str(e)}"
        )
    
def fetch_and_return_shop_order_data(shop_id: str, orderdata_collection: Collection):
    try:
        orderdatas_cursor: Cursor = orderdata_collection.find({"shop_id": shop_id})
        # orderdatas_cursor: Cursor = orderdata_collection.find()
        orderdatas: List[dict] = [
            serialize_orderdata(orderdata) for orderdata in orderdatas_cursor
        ]
        return {
            "status": "success",
            "message": "Orderdata fetched successfully.",
            "orderdatas": orderdatas,
        }
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Orderdata fetching failed: {str(e)}"
        )
    
# def fetch_and_return_all_shop_orders(shop_id: str, orderdata_collection: Collection, shopkeeperdata_collection: Collection):
#     try:
#         shopkeeper_id = shopkeeperdata_collection.findOne({"shop_id": shop_id})

#         orderdatas_cursor: Cursor = orderdata_collection.find({"shop_name": shopkeeper_id["shop_name"]})
#         # orderdatas_cursor: Cursor = orderdata_collection.find()
#         orderdatas: List[dict] = [
#             serialize_orderdata(orderdata) for orderdata in orderdatas_cursor
#         ]
#         return {
#             "status": "success",
#             "message": "Orderdata fetched successfully.",
#             "orderdatas": orderdatas,
#         }
#     except Exception as e:
#         raise HTTPException(
#             status_code=500, detail=f"Orderdata fetching failed: {str(e)}"
#         )

def fetch_and_return_all_shop_orders(email: str, orderdata_collection: Collection, shopkeeperdata_collection: Collection):
    try:
        shopkeeper_id = shopkeeperdata_collection.find_one({"email": email})
        print(shopkeeper_id["shop_name"])

        orderdatas_cursor: Cursor = orderdata_collection.find({"shop_name": shopkeeper_id["shop_name"]})
        orderdatas: List[dict] = [
            serialize_orderdata(orderdata) for orderdata in orderdatas_cursor
        ]
        return {
            "status": "success",
            "message": "Orderdata fetched successfully.",
            "orderdatas": orderdatas,
        }
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Orderdata fetching failed: {str(e)}"
        )