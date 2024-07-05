from typing import Collection
from fastapi import APIRouter, Depends, Request, Response

# from api.middleware.auth_middleware import AuthMiddleware
from api.middleware.auth_middleware import protect
from dependencies.dependencies import get_order_collection
from models.OrderModel import Order

from api.controller.order_controller import add_to_order

order_router = APIRouter()


@order_router.post("/add-to-order")
# @protect()
def order(
    order: Order,
    response: Response,
    order_collection: Collection = Depends(get_order_collection),
):
    return add_to_order(order, response, order_collection)
