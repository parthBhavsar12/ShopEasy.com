from typing import Collection
# from api.controller.auth_controller import get_current_user
from database.db import db
# it was previously creating new connection everytime
# get_user_collection dependency provides the collection without creating new connections
def get_user_collection():
    return db.get_db()["users"]

def get_product_collection():
    return db.get_db()["products"]

def get_bill_collection():
    return db.get_db()["bills"]

def get_coupon_collection():
    return db.get_db()["coupons"]

def get_order_collection():
    return db.get_db()["orders"]

def get_shopkeeperdata_collection():
    return db.get_db()["shopkeeperdata"]

def get_customerdata_collection():
    return db.get_db()["customerdata"]

def get_reset_password_collection():
    return db.get_db()["reset_passwords"]

def get_orderdata_collection():
    return db.get_db()["orderdata"]