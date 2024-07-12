from datetime import datetime, timedelta, timezone
import os
from typing import Collection, List, Optional
from bson import ObjectId
from fastapi import Depends, HTTPException, Request, Response, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from dependencies.dependencies import get_coupon_collection
from models.CouponModel import Coupon
from config import settings
from pymongo.collection import Collection
from pymongo.cursor import Cursor


def add_coupon(coupon: Coupon, response: Response, coupon_collection: Collection):
    coupon_data = coupon.model_dump()
    result = coupon_collection.insert_one(coupon_data)
    return {
        "status": "success",
        "message": "product added to coupon successfully",
        "coupon": {
            "shop_id": coupon_data["shop_id"],
            "cpn_code": coupon_data["cpn_code"],
            "cpn_quantity": coupon_data["cpn_quantity"],
            "cpn_discount": coupon_data["cpn_discount"],
            "start_datetime": coupon_data["start_datetime"],
            "end_datetime": coupon_data["end_datetime"],
        },
    }


# def fetch_and_list_coupons(coupon_collection: Collection):
#     try:
#         result = coupon_collection.find()
#         return {
#             "status": "success",
#             "message": "coupons fetched successfully.",
#             "coupons": {result},
#         }
#     except Exception as e:
#         return {
#             "status": "failed",
#             "message": "Coupons fetching failed.",
#             "error": str(e)
#         }


def serialize_coupon(coupon):
    """Serialize MongoDB ObjectId to string if necessary."""
    if isinstance(coupon.get("_id"), ObjectId):
        coupon["_id"] = str(coupon["_id"])
    return coupon


# def fetch_and_list_coupons(user_id: str, coupon_collection: Collection) -> dict:
#     try:
#         coupons_cursor: Cursor = coupon_collection.find({ "user_id": user_id })
#         coupons: List[dict] = [serialize_coupon(coupon) for coupon in coupons_cursor]
#         return {
#             "status": "success",
#             "message": "Coupons fetched successfully.",
#             "coupons": coupons,
#         }
#     except Exception as e:
#         return {
#             "status": "failed",
#             "message": f"Coupons fetching failed: {str(e)}",
#         }


def fetch_and_list_coupons(shop_id: str, coupon_collection: Collection,prod_name:Optional[str] = None) -> dict:
# def fetch_and_list_coupons(coupon_collection: Collection) -> dict:
    try:
        # coupons_cursor: Cursor = coupon_collection.find({"shop_id": shop_id,"prod_name":prod_name})
        # coupons_cursor: Cursor = coupon_collection.find()
        # Start with a base query
        query = {"shop_id": shop_id}

        # If prod_name is provided, add it to the query
        if prod_name:
            query["prod_name"] = prod_name

        coupons_cursor: Cursor = coupon_collection.find(query)
        coupons: List[dict] = [serialize_coupon(coupon) for coupon in coupons_cursor]
        return {
            "status": "success",
            "message": "Coupons fetched successfully.",
            "coupons": coupons,
        }
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Coupons fetching failed: {str(e)}"
        )


def delete_coupon(coupon_id: str, coupon_collection: Collection):
    try:
        result = coupon_collection.delete_one({"_id": ObjectId(coupon_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Coupon not found")
        return {
            "status": "success",
            "message": "Coupon deleted successfully"
        }
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Coupons fetching failed: {str(e)}"
        )
