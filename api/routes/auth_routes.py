from typing import Collection
from fastapi import APIRouter, Depends, Response

from dependencies.dependencies import get_user_collection
from models.UserModel import User, UserLogin
from api.controller.auth_controller import create_user, login_user, logout_user

auth_router = APIRouter()
@auth_router.post("/signup")
def signup(user: User, response:Response,user_collection: Collection = Depends(get_user_collection)):
    # Call the controller function with injected dependencies
    return create_user(user,response, user_collection)
@auth_router.post("/login")
def login(user:UserLogin,response:Response,user_collection:Collection = Depends(get_user_collection)):
    return login_user(user,response,user_collection)
@auth_router.post("/logout")
def logout(response:Response):
    return logout_user(response)