from datetime import datetime, timedelta, timezone
import os
from typing import Collection
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


def shopkeeper_data(user: UserShopkeeper, response: Response, shopkeeperdata_collection: Collection):
    user_data = user.model_dump()
    result = shopkeeperdata_collection.insert_one(user_data)
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
    result = customerdata_collection.insert_one(user_data)
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

def is_customer_data_available(email: UserEmail, response: Response, customerdata_collection):
    user = get_customer(email, customerdata_collection)
    if not user:
        return False
    return user
