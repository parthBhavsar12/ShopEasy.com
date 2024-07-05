from typing import Collection
# from api.controller.auth_controller import get_current_user
from database.db import db
# it was previously creating new connection everytime
# get_user_collection dependency provides the collection without creating new connections
def get_user_collection():
    return db.get_db()["users"]

def get_product_collection():
    return db.get_db()["products"]