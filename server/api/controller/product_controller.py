from datetime import datetime, timedelta, timezone
import os
from typing import Collection, List
from bson import ObjectId
from fastapi import Depends, HTTPException, Request, Response, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from dependencies.dependencies import get_product_collection
from models.ProductModel import Product
from config import settings
from pymongo.cursor import Cursor


def add_product(product: Product, response: Response, product_collection: Collection):
    try:
        product_data = product.model_dump()
        data = product_collection.find_one({"prod_name": product_data["prod_name"]})

        if not data:
            result = product_collection.insert_one(product_data)
            action = "insert"
        else:
            if product_data["prod_rename"] == "None":
                result = product_collection.update_one(
                    {"prod_name": product_data["prod_name"]}, {"$set": product_data}
                )
                action = "update"
            else:
                result = product_collection.update_one(
                    {"prod_name": product_data["prod_name"]},
                    {
                        "$set": {
                            "user_id": product_data["user_id"],
                            "prod_name": product_data["prod_rename"],
                            "prod_rename": product_data["prod_rename"],
                            "prod_category": product_data["prod_category"],
                            "prod_price": product_data["prod_price"],
                            "prod_quantity": product_data["prod_quantity"]
                        }
                    },
                )

        return {
            "status": "success",
            "action": action,
            "message": "product added/updated successfully",
            "product": {
                "user_id": product_data["user_id"],
                "prod_name": product_data["prod_name"],
                "prod_category": product_data["prod_category"],
                "prod_price": product_data["prod_price"],
                "prod_quantity": product_data["prod_quantity"],
                "prod_image": product_data["prod_image"],
            },
        }
    except Exception as e:
        return {
            "status": "failed",
            "message": "Failed to fetch userdata",
            "detail": str(e),
        }


def serialize_product(product):
    """Serialize MongoDB ObjectId to string if necessary."""
    if isinstance(product.get("_id"), ObjectId):
        product["_id"] = str(product["_id"])
    return product


def fetch_and_list_products(user_id: str, product_collection: Collection) -> dict:
    # def fetch_and_list_products(product_collection: Collection) -> dict:
    try:
        products_cursor: Cursor = product_collection.find({"user_id": user_id})
        # products_cursor: Cursor = product_collection.find()
        products: List[dict] = [
            serialize_product(product) for product in products_cursor
        ]
        return {
            "status": "success",
            "message": "Products fetched successfully.",
            "products": products,
        }
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Products fetching failed: {str(e)}"
        )


def delete_product(product_id: str, product_collection: Collection):
    try:
        result = product_collection.delete_one({"_id": ObjectId(product_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Product not found")
        return {"status": "success", "message": "Product deleted successfully"}
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Products fetching failed: {str(e)}"
        )

def fetch_and_list_products_by_shopname(shop_name: str, product_collection: Collection, shopkeeper_collection: Collection) -> dict:
    try:
        data = shopkeeper_collection.find_one({"shop_name": shop_name})
        email = data.get('email')
        products_cursor: Cursor = product_collection.find({"user_id": email})
        # products_cursor: Cursor = product_collection.find()
        products: List[dict] = [
            serialize_product(product) for product in products_cursor
        ]
        return {
            "status": "success",
            "message": "Products fetched successfully.",
            "products": products,
        }
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Products fetching failed: {str(e)}"
        )