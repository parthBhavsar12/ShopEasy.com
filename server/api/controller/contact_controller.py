from datetime import datetime, timedelta, timezone
import os
from typing import Collection
from bson import ObjectId
from fastapi import Depends, HTTPException, Request, Response, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from models.ContactModel import Contact
from config import settings

def contact_us(contact: Contact):
    data = contact.model_dump()

    return {
        "name": data["name"],
        "email": data["email"],
        "message": data["message"],
    }