from datetime import datetime, timedelta, timezone
import os
from typing import Collection
from bson import ObjectId
from fastapi import Depends, HTTPException, Request, Response,status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from dependencies.dependencies import get_bill_collection
from models.BillModel import Bill
from config import settings

def add_to_bill(bill: Bill,response:Response,bill_collection:Collection):
        bill_data = bill.model_dump()
        result = bill_collection.insert_one(bill_data)
        return {
        "status": "success",
        "message": "product added to bill successfully",
        "bill": {
            # "_id": str(bill_data["_id"]),
            "bill_num": bill_data["bill_num"],
            "cust_name": bill_data["cust_name"],
            "prod_name": bill_data["prod_name"],
            "prod_quantity": bill_data["prod_quantity"],
            "prod_discount": bill_data["prod_discount"]
        }
    }