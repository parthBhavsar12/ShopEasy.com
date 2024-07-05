from typing import Collection
# from api.controller.auth_controller import get_current_user
from database.db import db
# it was previously creating new connection everytime
# get_user_collection dependency provides the collection without creating new connections
def get_user_collection():
    return db.get_db()["users"]

# def get_current_user_dependency(request: Request = Depends(),user_collection:Collection = Depends(get_user_collection)):
#     return get_current_user(request,user_collection)


# db = get_database()
# def get_todo_collection(connection = Depends(get_database)):   
#     collection_name = connection["todo_collection"]
#     yield collection_name
# def get_user_collection(connection = Depends(get_database)):
#     user_collection = connection["users"]
#     return user_collection