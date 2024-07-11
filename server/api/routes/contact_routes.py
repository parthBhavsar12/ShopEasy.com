from typing import Collection
from fastapi import APIRouter, Depends, Query, Request, Response

from api.middleware.auth_middleware import protect

from api.controller.contact_controller import contact_us
from pydantic import BaseModel
from models.ContactModel import Contact
from config import settings

contact_router = APIRouter()


@contact_router.post("/contact-us")
# @protect()
def contact(contact: Contact):
    return contact_us(contact)
