from typing import Collection
from fastapi import APIRouter, Depends, Request, Response

# from api.middleware.auth_middleware import AuthMiddleware
from api.middleware.auth_middleware import protect
from dependencies.dependencies import get_user_collection
from models.UserModel import UserShopkeeper
from models.UserModel import UserCustomer

from api.controller.user_controller import shopkeeper_data

user_router = APIRouter()


@user_router.post("/user-data")
# @protect()
def user(
    user: UserShopkeeper,
    response: Response,
    user_collection: Collection = Depends(get_user_collection),
):
    return shopkeeper_data(user, response, user_collection)
