from typing import Collection
from fastapi import APIRouter, Depends, Query, Request, Response

# from api.middleware.auth_middleware import AuthMiddleware
from api.middleware.auth_middleware import protect
from dependencies.dependencies import get_order_collection
from dependencies.dependencies import get_orderdata_collection
from models.OrderModel import Order
from models.OrderModel import OrderData

from api.controller.order_controller import make_new_order
from api.controller.order_controller import find_and_send_order
from api.controller.order_controller import add_order_entry
from api.controller.order_controller import fetch_and_return_order_data
from api.controller.order_controller import fetch_and_return_customer_order_data
from api.controller.order_controller import delete_orderdata

order_router = APIRouter()


# @order_router.post("/add-to-order")
# # @protect()
# def order(
#     order: Order,
#     response: Response,
#     order_collection: Collection = Depends(get_order_collection),
# ):
#     return add_to_order(order, response, order_collection)

@order_router.post("/new-order")
# @protect()
def order(
    order: Order,
    response: Response,
    order_collection: Collection = Depends(get_order_collection),
):
    return make_new_order(order, response, order_collection)


@order_router.get("/find-order")
# @protect()
def find_order(
    order_num: str = Query(...),
    order_collection: Collection = Depends(get_order_collection),
):
    return find_and_send_order(order_num, order_collection)

@order_router.post("/add-to-order")
# @protect()
def add_order(
    order_data: OrderData,
    order_collection: Collection = Depends(get_orderdata_collection),
):
    return add_order_entry(order_data, order_collection)

@order_router.get("/find-order-data")
# @protect()
def fetch_order_data(
    cust_id: str = Query(...),
    order_num: str = Query(...),
    order_collection: Collection = Depends(get_orderdata_collection)
):
    return fetch_and_return_order_data(cust_id, order_num, order_collection)

@order_router.get("/find-customer-order-data")
# @protect()
def fetch_orders_by_a_customer(
    cust_id: str = Query(...),
    order_collection: Collection = Depends(get_order_collection)
):
    return fetch_and_return_customer_order_data(cust_id, order_collection)


@order_router.delete("/delete-order-data/{data_id}")
# @protect()
def deleteData(data_id: str, orderdata_collection: Collection = Depends(get_orderdata_collection)):
    return delete_orderdata(data_id, orderdata_collection)

