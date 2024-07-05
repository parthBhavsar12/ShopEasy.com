from contextlib import asynccontextmanager
from fastapi import FastAPI

from config import settings;
import os
import signal

from api.routes.auth_routes import auth_router
from api.routes.product_routes import product_router
from fastapi.middleware.cors import CORSMiddleware
from database.db import db
@asynccontextmanager
async def lifespan(app:FastAPI):
    try:
        #startup
        db.get_client()
        yield
    finally:
        #shutdown
        db.close_connection() 
# async def lifespan(app:FastAPI):
#    try:
#        db = get_database()
#        yield
#    except ConnectionError as e:
#         print(f"Failed to connect to MongoDB: {e}")
#    finally:
#         db.client.close()
app = FastAPI(lifespan=lifespan)
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
async def root():
    return {"message":"Hello World"}
app.include_router(router=auth_router,prefix="/api/v1/auth")
app.include_router(router=product_router,prefix="/api/v1/product")
# app.include_router(router=protected_router, prefix="/api/v1/auth")
# @app.get("/items/{item_id}")
# async def read_item(item_id: int):
#     return {"item_id": item_id}
# app.include_router(router=router,prefix="/todos")

