from typing import Collection
from fastapi import APIRouter, Depends, Query, Request, Response

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
from api.controller.user_controller import is_shopkeeper_data_available
from api.controller.user_controller import find_shops_by_area
from api.controller.user_controller import find_shops_by_district

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


@user_router.get("/is-customer-data-available")
# @protect()
def customer_data_available(
    email: str = Query(...),
    user_collection: Collection = Depends(get_customerdata_collection),
):
    return is_customer_data_available(email, user_collection)


@user_router.get("/is-shopkeeper-data-available")
# @protect()
def shopkeeper_data_available(
    email: str = Query(...),
    user_collection: Collection = Depends(get_shopkeeperdata_collection),
):
    return is_shopkeeper_data_available(email, user_collection)


@user_router.get("/get-shopdata-by-area")
# @protect()
def shopkeeper_data_available(
    local_area: str = Query(...),
    user_collection: Collection = Depends(get_shopkeeperdata_collection),
):
    return find_shops_by_area(local_area, user_collection)


@user_router.get("/get-shopdata-by-district")
# @protect()
def shopkeeper_data_available(
    district: str = Query(...),
    user_collection: Collection = Depends(get_shopkeeperdata_collection),
):
    return find_shops_by_district(district, user_collection)
