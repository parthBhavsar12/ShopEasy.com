from typing import Collection
from fastapi import APIRouter, Depends, Query, Request, Response

# from api.middleware.auth_middleware import AuthMiddleware
from api.middleware.auth_middleware import protect
from dependencies.dependencies import get_order_collection
from dependencies.dependencies import get_orderdata_collection
from dependencies.dependencies import get_shopkeeperdata_collection
from models.OrderModel import Order
from models.OrderModel import OrderData

from api.controller.order_controller import make_new_order
from api.controller.order_controller import find_and_send_order
from api.controller.order_controller import add_order_entry
from api.controller.order_controller import fetch_and_return_order_data
from api.controller.order_controller import fetch_and_return_customer_order_data
from api.controller.order_controller import delete_orderdata
from api.controller.order_controller import fetch_and_return_all_customer_order_data
from api.controller.order_controller import fetch_and_return_shop_order_data
from api.controller.order_controller import fetch_and_return_all_shop_orders

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

@order_router.get("/find-all-customer-order-data")
# @protect()
def fetch_order_data(
    cust_id: str = Query(...),
    order_collection: Collection = Depends(get_orderdata_collection)
):
    return fetch_and_return_all_customer_order_data(cust_id, order_collection)

@order_router.get("/find-shop-order")
# @protect()
def fetch_orders_by_a_shop(
    shop_id: str = Query(...),
    order_collection: Collection = Depends(get_order_collection)
):
    return fetch_and_return_shop_order_data(shop_id, order_collection)

# @order_router.get("/find-shop-order-with-order-number")
# # @protect()
# def fetch_orders_by_a_shop_with_order_number(
#     order_num: int = Query(...),
#     orderdata_collection: Collection = Depends(get_orderdata_collection)
# ):
#     return fetch_and_return_shop_order_data_with_order_number(order_num, orderdata_collection)

# # @protect()
# def fetch_all_orders_by_a_shopname(
#     shop_id: str = Query(...),
#     orderdata_collection: Collection = Depends(get_orderdata_collection),
#     shopkeeperdata_collection: Collection = Depends(get_shopkeeperdata_collection)
# ):
#     return fetch_and_return_all_shop_orders(shop_id, orderdata_collection,shopkeeperdata_collection)

@order_router.get("/find-all-shop-orders")
def fetch_all_orders_by_a_shopname(
    email: str = Query(...),
    orderdata_collection: Collection = Depends(get_orderdata_collection),
    shopkeeperdata_collection: Collection = Depends(get_shopkeeperdata_collection)
):
    return fetch_and_return_all_shop_orders(email, orderdata_collection, shopkeeperdata_collection)

# @order_router.get("/find-shop-order-data")
# # @protect()
# def fetch_orders_by_a_shop(
#     order_num: str = Query(...),
#     orderdata_collection: Collection = Depends(get_orderdata_collection)
# ):
#     return fetch_and_return_shop_order_data(order_num, orderdata_collection)