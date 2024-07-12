from typing import Collection
from fastapi import APIRouter, Depends, Query, Request, Response, BackgroundTasks

from api.middleware.auth_middleware import protect
from api.controller.contact_controller import contact_us
from pydantic import BaseModel
from models.ContactModel import Contact
from config import settings

contact_router = APIRouter()

@contact_router.post("/contact-us")
# @protect()
async def contact(contact: Contact, background_tasks: BackgroundTasks):
    return await contact_us(contact, background_tasks)