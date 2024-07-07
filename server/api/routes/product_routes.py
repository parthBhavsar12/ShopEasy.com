from typing import Collection
from fastapi import APIRouter, Depends, Request, Response, Query

# from api.middleware.auth_middleware import AuthMiddleware
from api.middleware.auth_middleware import protect
from dependencies.dependencies import get_product_collection
from models.ProductModel import Product

from api.controller.product_controller import add_product
from api.controller.product_controller import fetch_and_list_products
from api.controller.product_controller import delete_product

product_router = APIRouter()


@product_router.post("/add-product")
# @protect()
def products(
    product: Product,
    response: Response,
    product_collection: Collection = Depends(get_product_collection),
):
    return add_product(product, response, product_collection)

@product_router.get("/fetch-products")
# @protect()
def fetchCoupon(user_id: str = Query(...), product_collection: Collection = Depends(get_product_collection)):
    return fetch_and_list_products(user_id, product_collection)

@product_router.delete("/delete-product/{product_id}")
# @protect()
def deleteCoupon(product_id: str, product_collection: Collection = Depends(get_product_collection)):
    return delete_product(product_id, product_collection)