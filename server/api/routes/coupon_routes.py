from typing import Collection
from fastapi import APIRouter, Depends, Request, Response

# from api.middleware.auth_middleware import AuthMiddleware
from api.middleware.auth_middleware import protect
from dependencies.dependencies import get_coupon_collection
from models.CouponModel import Coupon

from api.controller.coupon_controller import add_coupon

coupon_router = APIRouter()


@coupon_router.post("/add-coupon")
# @protect()
def coupon(
    coupon: Coupon,
    response: Response,
    coupon_collection: Collection = Depends(get_coupon_collection),
):
    return add_coupon(coupon, response, coupon_collection)
