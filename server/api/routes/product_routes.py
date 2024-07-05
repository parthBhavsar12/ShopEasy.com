from typing import Collection
from fastapi import APIRouter, Depends, Request, Response

# from api.middleware.auth_middleware import AuthMiddleware
from api.middleware.auth_middleware import protect
from dependencies.dependencies import get_product_collection
from models.ProductModel import Product

from api.controller.product_controller import add_product

product_router = APIRouter()


@product_router.post("/add-product")
# @protect()
def products(
    product: Product,
    response: Response,
    product_collection: Collection = Depends(get_product_collection),
):
    return add_product(product, response, product_collection)
