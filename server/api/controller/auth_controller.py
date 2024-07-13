from datetime import datetime, timedelta, timezone
import os
import secrets
from typing import Collection
from bson import ObjectId
from fastapi import Depends, HTTPException, Request, Response, status
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer
from fastapi_mail import ConnectionConfig, FastMail, MessageSchema, MessageType
from pydantic import BaseModel
from dependencies.dependencies import get_user_collection
from models.UserModel import User, UserLogin, ForgotPasswordRequest, ResetPasswordRequest, EmailSchema
from config import settings
from jose import jws, jwt, JWTError
from passlib.context import CryptContext

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str):
    return pwd_context.hash(password)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_user(email: str, user_collection):
    return user_collection.find_one({"email": email})


def authenticate_user(email: str, password: str, user_collection):
    user = get_user(email, user_collection)
    if not user:
        return False
    if not verify_password(password, user["password"]):
        return False
    return user


def create_access_token(response: Response, data: dict):
    to_encode = data.copy()
    days = int(settings.ACCESS_TOKEN_EXPIRES_IN)
    expire = datetime.now(timezone.utc) + timedelta(days=days)
    to_encode.update({"exp": expire, "iat": datetime.now(timezone.utc)})
    encoded_jwt = jwt.encode(
        to_encode, settings.JWT_PRIVATE_KEY, algorithm=settings.JWT_ALGORITHM
    )
    cookie_options = {
        "expires": datetime.now(timezone.utc)
        + timedelta(days=7),  # Adjust expiration as needed
        "httpOnly": True,  # Prevent client-side JavaScript access
        "path": "/",  # Accessible from all paths
        "sameSite": "none" if os.environ.get("ENVIRONMENT") == "production" else "Lax",
        "secure": False,  # Set secure only in production
        # "max-age":7 * 24 * 6i0 * 60,
    }
    response.set_cookie(
        "access_token",
        encoded_jwt,
        path=cookie_options["path"],
        expires=cookie_options["expires"],
        httponly=cookie_options["httpOnly"],
        secure=cookie_options["secure"],
        samesite=cookie_options["sameSite"],
    )
    return encoded_jwt


def verify_token(token: str, credentials_exception: Exception):
    try:
        payload = jwt.decode(
            token, settings.JWT_PRIVATE_KEY, algorithms=[settings.JWT_ALGORITHM]
        )
        return payload["id"]
    except JWTError:
        raise credentials_exception


def get_token_from_header(token: str = Depends(oauth2_scheme)):
    return token


def login_user(user: UserLogin, response: Response, user_collection: Collection):
    db_user = authenticate_user(user.email, user.password, user_collection)
    if not db_user:
        response.status_code = status.HTTP_401_UNAUTHORIZED
        raise HTTPException(
            status_code=401, detail="Incorrect email or password", headers=None
        )
    # Generate token
    token = create_access_token(response, data={"id": str(db_user["_id"])})
    return {
        "status": "success",
        "token": token,
        "user": {
            "email": db_user["email"],
            "role": db_user["role"],
            "_id": str(db_user["_id"]),
        },
    }


def create_user(user: User, response: Response, user_collection: Collection):
    # Check if user already exists
    if get_user(user.email, user_collection):
        response.status_code = status.HTTP_401_UNAUTHORIZED
        raise HTTPException(status_code=401, detail="Email already registered")

    # Hash the password
    hashed_password = hash_password(user.password)
    # Prepare user data for insertion
    user_data = user.model_dump()
    user_data["password"] = hashed_password

    # Insert into database
    result = user_collection.insert_one(user_data)

    # Retrieve the inserted user
    created_user = user_collection.find_one({"_id": result.inserted_id})

    # Generate token
    token = create_access_token(response, data={"id": str(created_user["_id"])})

    # Hash password before saving the user
    # user.password = await hash_password(user.password)
    # await user_collection.insert_one(user.model_dump())

    # You can create a token and send it in the response here (optional)

    return {
        "status": "success",
        "token": token,
        "user": {
            "email": created_user["email"],
            "role": created_user["role"],
            "_id": str(created_user["_id"]),
        },
    }


def get_current_user(request: Request, user_collection: Collection):
    cookie = request.headers.get("cookie")
    print(cookie)
    if not cookie:
        raise HTTPException(
            status_code=401, detail="Unauthorized access! Please login again"
        )
    token = cookie.split("access_token=")[1].split(";")[0]
    if not token:
        raise HTTPException(
            status_code=401, detail="Unauthorized access! Please login again"
        )

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )
    try:
        user_id = verify_token(token, credentials_exception)
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    # user_collection = get_user_collection()
    user = user_collection.find_one({"_id": ObjectId(user_id)})
    if user is None:
        raise credentials_exception
    user_data = {
        "email": user["email"],
        "role": user.get("role", "user"),
    }  # Get role with default
    return {"status": "success", "isLoggedIn": True, "user": user_data}


def protect_user(request: Request):
    cookie = request.headers.get("cookie")
    print(cookie)
    if cookie is None:
        raise HTTPException(
            status_code=401, detail="Unauthorized access! Please login again"
        )
    token = cookie.split("access_token=")[1].split(";")[0]
    if not token:
        raise HTTPException(
            status_code=401, detail="Unauthorized access! Please login again"
        )

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )
    try:
        user_id = verify_token(token, credentials_exception)
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user_collection = get_user_collection()
    user = user_collection.find_one({"_id": ObjectId(user_id)})
    if user is None:
        raise credentials_exception
    request.state.user = user
    return user


def logout_user(response: Response):
    try:
        # Set cookie expiration to past date for invalidation
        cookie_options = {
            "expires": datetime.now(timezone.utc) + timedelta(days=-1),  # Expired date
            "httpOnly": True,
            "path": "/",
        }
        if (
            os.environ.get("ENVIRONMENT") == "production"
        ):  # Assuming env variable for production
            # Set secure flag in production
            cookie_options.update({"secure": True})
        response.set_cookie(
            "access_token",
            "none",
            expires=cookie_options["expires"],
            httponly=cookie_options["httpOnly"],
            path=cookie_options["path"],
            secure=cookie_options.get("secure", False),
        )
        return {"success": True}
    except Exception as e:
        return {"status": "failed", "message": "Failed to logout user"}


# async def get_current_user(request: Request, token: str = Depends(get_token_from_header)):
#     try:
#         # First, try to get token from Authorization header
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         user_id: str = payload.get("sub")
#         if user_id is None:
#             raise HTTPException(status_code=401, detail="Invalid authentication credentials")
#     except JWTError:
#         # If that fails, try to get token from cookie
#         try:
#             cookie_token = get_token_from_cookie(request)
#             payload = jwt.decode(cookie_token, SECRET_KEY, algorithms=[ALGORITHM])
#             user_id: str = payload.get("sub")
#             if user_id is None:
#                 raise HTTPException(status_code=401, detail="Invalid authentication credentials")
#         except JWTError:
#             raise HTTPException(status_code=401, detail="Invalid authentication credentials")

#     # Here you would typically fetch the user from your database
#     user = {"id": user_id, "username": "example_user"}
#     return user

async def forgot_password(user_email:ForgotPasswordRequest,user_collection:Collection,resetpasswordCollection:Collection):
    user = user_collection.find_one({"email":user_email.email})
    if not user:
        # Don't reveal if the email exists or not for security reasons
        return {"message": "If an account with that email exists, a password reset link has been sent."}
    if user:
        token = secrets.token_urlsafe(32)
        expiration = datetime.now(timezone.utc) + timedelta(hours=1)
        resetpasswordCollection.insert_one({
            "user_id":user["_id"],
            "token":token,
            "expiration":expiration
        })
        try:
         await send_reset_email(user_email.email, token)
        except Exception as e:
        # Log the error
         print(f"Failed to send email: {str(e)}")
         raise HTTPException(status_code=500, detail="Failed to send reset email")
        return {"message": "If an account with that email exists, a password reset link has been sent."}
def reset_password(reset_user:ResetPasswordRequest,user_collection:Collection,resetPasswordCollection:Collection):
    now = datetime.now(timezone.utc)
    reset_request = resetPasswordCollection.find_one({"token":reset_user.token,"expiration":{"$gte":now}})
    if not reset_request :
        raise HTTPException(status_code=400, detail="Invalid or expired token")
    hashed_password = hash_password(reset_user.new_password)
    user_collection.update_one({"_id":ObjectId( reset_request["user_id"])},
        {"$set": {"password": hashed_password}})
    resetPasswordCollection.delete_one({"_id":reset_request["_id"]})
    return {"message": "Password has been reset successfully"}


async def send_reset_email(email:ForgotPasswordRequest,token:str) -> JSONResponse:
   
    conf = ConnectionConfig(
        MAIL_USERNAME = settings.MAIL_USERNAME,
        MAIL_PASSWORD = settings.MAIL_PASSWORD,
        MAIL_FROM = settings.MAIL_FROM,
        MAIL_PORT = settings.MAIL_PORT,
        MAIL_SERVER = settings.MAIL_SERVER,
        MAIL_FROM_NAME=settings.MAIL_FROM_NAME,
        MAIL_STARTTLS = True,
        MAIL_SSL_TLS = False,
        USE_CREDENTIALS = True,
        VALIDATE_CERTS = True
)
    # html = f"<h1>Reset password using following link<h1> <p>http://localhost:8000/reset-password/${token}</p>";
    html = f"""
    <h1>Reset Your Password</h1>
    <p>Click the following link to reset your password:</p>
    <a href="http://localhost:5173/reset-password?token={token}">Reset Password</a>
    <p>If you didn't request this, please ignore this email.</p>
    """
    message = MessageSchema(
        subject="Password reset request",
        recipients=[email],
        body=html,
        subtype=MessageType.html)
    fm = FastMail(conf)
    # background_tasks.add_task(fm.send_message,message)
    await fm.send_message(message)
    return JSONResponse(status_code=200, content={"message": "email has been sent"})