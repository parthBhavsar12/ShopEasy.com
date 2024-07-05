from datetime import datetime, timedelta, timezone
import os
from typing import Collection
from bson import ObjectId
from fastapi import Depends, HTTPException, Request, Response,status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from dependencies.dependencies import get_product_collection
from models.ProductModel import Product
from config import settings

def add_product(product: Product,response:Response,product_collection:Collection):
        product_data = product.model_dump()
        result = product_collection.insert_one(product_data)
        return {
        "status": "success",
        "message": "product added successfully",
        "product": {
            # "_id": str(product_data["_id"]),
            "prod_name": product_data["prod_name"],
            "prod_category": product_data["prod_category"],
            "prod_price": product_data["prod_price"],
            "prod_quantity": product_data["prod_quantity"],
            "prod_image": product_data["prod_image"]
        }
    }