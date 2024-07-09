from datetime import datetime, timedelta, timezone
import os
from typing import Collection, List
from bson import ObjectId
from fastapi import Depends, HTTPException, Request, Response, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from dependencies.dependencies import get_shopkeeperdata_collection
from dependencies.dependencies import get_customerdata_collection
from models.UserModel import UserShopkeeper
from models.UserModel import UserCustomer
from models.UserModel import UserEmail
from config import settings
from pymongo.cursor import Cursor


def shopkeeper_data(user: UserShopkeeper, response: Response, shopkeeperdata_collection: Collection):
    user_data = user.model_dump()
    data = shopkeeperdata_collection.find_one({"email": user_data["email"]})

    if not data:
        result = shopkeeperdata_collection.insert_one(user_data)
    else:
        result = shopkeeperdata_collection.update_one(
            {"email": user_data["email"]},
            {"$set": user_data}
        )

    return {
        "status": "success",
        "message": "user data updated/added successfully",
        "user": {
            "email": user_data["email"],
            "shop_name": user_data["shop_name"],
            "contact": user_data["contact"],
            "address": user_data["address"],
            "local_area": user_data["local_area"],
            "district": user_data["district"],
            "pin": user_data["pin"],
            "state": user_data["state"],
            "country": user_data["country"],
        },
    }


def customer_data(user: UserCustomer, response: Response, customerdata_collection: Collection):
    user_data = user.model_dump()
    data = customerdata_collection.find_one({"email": user_data["email"]})

    if not data:
        result = customerdata_collection.insert_one(user_data)
    else:
        result = customerdata_collection.update_one(
            {"email": user_data["email"]},
            {"$set": user_data}
        )
            
    return {
        "status": "success",
        "message": "user data updated/added successfully",
        "user": {
            "email": user_data["email"],
            "customer_name": user_data["customer_name"],
            "contact": user_data["contact"],
            "address": user_data["address"],
            "local_area": user_data["local_area"],
            "district": user_data["district"],
            "pin": user_data["pin"],
            "state": user_data["state"],
            "country": user_data["country"],
        },
    }


def get_shopkeeper(email: str, shopkeeperdata_collection):
    return shopkeeperdata_collection.find_one({"email": email})


def get_customer(email: str, customerdata_collection):
    return customerdata_collection.find_one({"email": email})


def is_customer_data_available(email: str, customerdata_collection):
    try:
        user = get_customer(email, customerdata_collection)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return {
            "status": "success",
            "message": "userdata fetched succefully.",
            "user": UserCustomer(**user),
        }
        return
    except Exception as e:
        raise HTTPException(status_code=404, detail="Userdata not found")
        # return {"status": "failed", "message": "Failed to fetch userdata", "detail": str(e)}
    
def is_shopkeeper_data_available(email: str, shopkeeperdata_collection):
    try:
        user = get_shopkeeper(email, shopkeeperdata_collection)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return {
            "status": "success",
            "message": "userdata fetched succefully.",
            "user": UserShopkeeper(**user),
        }
        return
    except Exception as e:
        raise HTTPException(status_code=404, detail="Userdata not found")
        # return {"status": "failed", "message": "Failed to fetch userdata", "detail": str(e)}


def serialize_shop(shop):
    """Serialize MongoDB ObjectId to string if necessary."""
    if isinstance(shop.get("_id"), ObjectId):
        shop["_id"] = str(shop["_id"])
    return shop

def find_shops_by_area(local_area: str, shopkeeperdata_collection) -> dict:
    try:
        shops_cursor: Cursor = shopkeeperdata_collection.find({"local_area": local_area})
        shops: List[dict] = [
            serialize_shop(shop) for shop in shops_cursor
        ]
        return {
            "status": "success",
            "message": "Shops fetched successfully.",
            "shops": shops,
        }
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Shops fetching failed: {str(e)}"
        )

def find_shops_by_district(district: str, shopkeeperdata_collection) -> dict:
    try:
        shops_cursor: Cursor = shopkeeperdata_collection.find({"district": district})
        shops: List[dict] = [
            serialize_shop(shop) for shop in shops_cursor
        ]
        return {
            "status": "success",
            "message": "Shops fetched successfully.",
            "shops": shops,
        }
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Shops fetching failed: {str(e)}"
        )
