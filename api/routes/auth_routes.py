from typing import Collection
from fastapi import APIRouter, Depends

from dependencies.dependencies import get_user_collection
from models.UserModel import User, UserLogin
from api.controller.auth_controller import create_user, login_user

auth_router = APIRouter()
@auth_router.post("/signup")
def signup(user: User, user_collection: Collection = Depends(get_user_collection)):
    # Call the controller function with injected dependencies
    return create_user(user, user_collection)
@auth_router.post("/login")
def login(user:UserLogin,user_collection:Collection = Depends(get_user_collection)):
    return login_user(user,user_collection)