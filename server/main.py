from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware import Middleware

from config import settings
import os
import signal

from api.routes.auth_routes import auth_router
from api.routes.product_routes import product_router
from api.routes.bill_routes import bill_router
from api.routes.coupon_routes import coupon_router
from api.routes.order_routes import order_router
from api.routes.user_routes import user_router
from fastapi.middleware.cors import CORSMiddleware
from database.db import db


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        # startup
        db.get_client()
        yield
    finally:
        # shutdown
        db.close_connection()


# async def lifespan(app:FastAPI):
#    try:
#        db = get_database()
#        yield
#    except ConnectionError as e:
#         print(f"Failed to connect to MongoDB: {e}")
#    finally:
#         db.client.close()
# app = FastAPI(lifespan=lifespan)
# origins = [
#     "http://localhost:5173",
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

origins = ['http://localhost:5173', 'http://127.0.0.1:5173']
middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=['*'],
        allow_headers=['*']
    )
]
app = FastAPI(lifespan=lifespan,middleware=middleware);


@app.get("/")
async def root():
    return {"message": "Hello World"}


app.include_router(router=auth_router, prefix="/api/v1/auth")
app.include_router(router=product_router, prefix="/api/v1/product")
app.include_router(router=bill_router, prefix="/api/v1/bill")
app.include_router(router=coupon_router, prefix="/api/v1/coupon")
app.include_router(router=order_router, prefix="/api/v1/order")
app.include_router(router=user_router, prefix="/api/v1/user")
