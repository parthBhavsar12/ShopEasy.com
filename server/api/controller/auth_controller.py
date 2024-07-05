from datetime import datetime, timedelta, timezone
import os
from typing import Collection
from bson import ObjectId
from fastapi import Depends, HTTPException, Request, Response, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from dependencies.dependencies import get_user_collection
from models.UserModel import User, UserLogin
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
        "sameSite": "None" if os.environ.get("ENVIRONMENT") == "production" else "lax",
        "secure": (
            True if os.environ.get("ENVIRONMENT") == "production" else False
        ),  # Set secure only in production
    }
    response.set_cookie(
        "access_token",
        encoded_jwt,
        expires=cookie_options["expires"],
        httponly=cookie_options["httpOnly"],
        path=cookie_options["path"],
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
