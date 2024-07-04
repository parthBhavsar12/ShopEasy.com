from fastapi import Depends
from util.database import get_database
db = get_database()
def get_todo_collection():   
    collection_name = db["todo_collection"]
    yield collection_name
def get_user_collection():
    user_collection = db["users"]
    return user_collection