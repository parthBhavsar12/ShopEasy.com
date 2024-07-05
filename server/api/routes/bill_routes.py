from typing import Collection
from fastapi import APIRouter, Depends, Request, Response

# from api.middleware.auth_middleware import AuthMiddleware
from api.middleware.auth_middleware import protect
from dependencies.dependencies import get_bill_collection
from models.BillModel import Bill

from api.controller.bill_controller import add_to_bill

bill_router = APIRouter()


@bill_router.post("/add-to-bill")
# @protect()
def bill(
    bill: Bill,
    response: Response,
    bill_collection: Collection = Depends(get_bill_collection),
):
    return add_to_bill(bill, response, bill_collection)
