from datetime import datetime, timedelta, timezone
import os
from typing import Collection
from bson import ObjectId
from fastapi import Depends, HTTPException, Request, Response, status, BackgroundTasks
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer
from fastapi_mail import ConnectionConfig, FastMail, MessageSchema, MessageType
from pydantic import BaseModel
from models.ContactModel import Contact
from config import settings

async def contact_us(contact: Contact, background_tasks: BackgroundTasks):
    data = contact.model_dump()

    conf = ConnectionConfig(
        MAIL_USERNAME=settings.MAIL_USERNAME,
        MAIL_PASSWORD=settings.MAIL_PASSWORD,
        MAIL_FROM=settings.MAIL_FROM,
        MAIL_PORT=settings.MAIL_PORT,
        MAIL_SERVER=settings.MAIL_SERVER,
        MAIL_FROM_NAME="Contact Us Message",
        MAIL_STARTTLS=True,
        MAIL_SSL_TLS=False,
        USE_CREDENTIALS=True,
        VALIDATE_CERTS=True
    )

    html = f"""
    <h1>Contact Us Message</h1>
    <p><strong>Name:</strong> {data["name"]}</p>
    <p><strong>Email:</strong> {data["email"]}</p>
    <p><strong>Message:</strong> {data["message"]}</p>
    """

    message = MessageSchema(
        subject="Contact Us Message",
        recipients=["shopeasy296@gmail.com"],
        body=html,
        subtype=MessageType.html
    )

    fm = FastMail(conf)

    try:
        background_tasks.add_task(fm.send_message, message)
        return JSONResponse(status_code=200, content={"message": "Email has been sent"})
    except Exception as e:
        print(e)
        return JSONResponse(status_code=500, content={"message": "Failed to send email"})
