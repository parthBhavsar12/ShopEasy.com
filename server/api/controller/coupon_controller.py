from datetime import datetime, timedelta, timezone
import os
from typing import Collection
from bson import ObjectId
from fastapi import Depends, HTTPException, Request, Response,status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from dependencies.dependencies import get_coupon_collection
from models.CouponModel import Coupon
from config import settings

def add_coupon(coupon: Coupon,response:Response,coupon_collection:Collection):
        coupon_data = coupon.model_dump()
        result = coupon_collection.insert_one(coupon_data)
        return {
        "status": "success",
        "message": "product added to coupon successfully",
        "coupon": {
            # "_id": str(coupon_data["_id"]),
            "cpn_code": coupon_data["cpn_code"],
            "cpn_quantity": coupon_data["cpn_quantity"],
            "cpn_discount": coupon_data["cpn_discount"],
            "start_datetime": coupon_data["start_datetime"],
            "end_datetime": coupon_data["end_datetime"]
        }
    }