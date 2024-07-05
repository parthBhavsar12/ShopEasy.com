from datetime import datetime, timedelta, timezone
import os
from typing import Collection
from bson import ObjectId
from fastapi import Depends, HTTPException, Request, Response, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from dependencies.dependencies import get_user_collection
from models.UserModel import UserShopkeeper
from models.UserModel import UserCustomer
from config import settings


def shopkeeper_data(
    user: UserShopkeeper, response: Response, user_collection: Collection
):
    current_user_data = user_collection.find_one({"email": "parth@gmail.com"})

    user_data = user.model_dump()
    filter = {"email": "parth@gmail.com"}
    update = {
        "$set": {
            "email": current_user_data["email"],
            "password": current_user_data["password"],
            "role": current_user_data["role"],
            "shop_name": user_data["shop_name"],
            "prod_categories": user_data["prod_categories"],
            "contact": user_data["contact"],
            "address": user_data["address"],
            "local_area": user_data["local_area"],
            "district": user_data["district"],
            "pin": user_data["pin"],
            "state": user_data["state"],
            "country": user_data["country"],
        }
    }
    result = user_collection.update_one(filter, update)
    return {
        "status": "success",
        "message": "user data updated/added successfully",
        "user": { update
            # "_id": str(user_data["_id"]),
            # "user_num": user_data["user_num"],
            # "cust_name": user_data["cust_name"],
            # "prod_name": user_data["prod_name"],
            # "prod_quantity": user_data["prod_quantity"],
            # "prod_discount": user_data["prod_discount"]
        },
    }
