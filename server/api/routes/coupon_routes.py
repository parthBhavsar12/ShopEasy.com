from typing import Collection, Optional
from fastapi import APIRouter, Depends, Query, Request, Response

# from api.middleware.auth_middleware import AuthMiddleware
from api.middleware.auth_middleware import protect
from dependencies.dependencies import get_coupon_collection
from models.CouponModel import Coupon

from api.controller.coupon_controller import add_coupon
from api.controller.coupon_controller import fetch_and_list_coupons
from api.controller.coupon_controller import delete_coupon

coupon_router = APIRouter()


@coupon_router.post("/add-coupon")
# @protect()
def coupon(
    coupon: Coupon,
    response: Response,
    coupon_collection: Collection = Depends(get_coupon_collection),
):
    return add_coupon(coupon, response, coupon_collection)

@coupon_router.get("/fetch-coupons")
# @protect()
def fetchCoupon(shop_id: str = Query(...), coupon_collection: Collection = Depends(get_coupon_collection),prod_name:Optional[str] = None,):
# def fetchCoupon(coupon_collection: Collection = Depends(get_coupon_collection)):
    # return fetch_and_list_coupons(coupon_collection)
    return fetch_and_list_coupons(shop_id, coupon_collection,prod_name)

@coupon_router.delete("/delete-coupon/{coupon_id}")
# @protect()
def deleteCoupon(coupon_id: str, coupon_collection: Collection = Depends(get_coupon_collection)):
    return delete_coupon(coupon_id, coupon_collection)
