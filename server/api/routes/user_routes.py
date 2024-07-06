from typing import Collection
from fastapi import APIRouter, Depends, Request, Response

# from api.middleware.auth_middleware import AuthMiddleware
from api.middleware.auth_middleware import protect
from dependencies.dependencies import get_shopkeeperdata_collection
from dependencies.dependencies import get_customerdata_collection
from models.UserModel import UserShopkeeper
from models.UserModel import UserCustomer
from models.UserModel import UserEmail

from api.controller.user_controller import shopkeeper_data
from api.controller.user_controller import customer_data
from api.controller.user_controller import is_customer_data_available

user_router = APIRouter()


@user_router.post("/shopkeeper-data")
# @protect()
def user(
    user: UserShopkeeper,
    response: Response,
    user_collection: Collection = Depends(get_shopkeeperdata_collection),
):
    return shopkeeper_data(user, response, user_collection)

@user_router.post("/customer-data")
# @protect()
def user(
    user: UserCustomer,
    response: Response,
    user_collection: Collection = Depends(get_customerdata_collection),
):
    return customer_data(user, response, user_collection)

@user_router.post("/is-customer-data-available")
# @protect()
def user_data_available(
    email: UserEmail,
    response: Response,
    user_collection: Collection = Depends(get_customerdata_collection),
):
    return is_customer_data_available(email, response, user_collection)
