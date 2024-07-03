from datetime import datetime, timedelta, timezone
from typing import Collection
from fastapi import Depends, HTTPException,status
from pydantic import BaseModel
from dependencies.dependencies import get_user_collection
from models.UserModel import User, UserLogin
from config import settings
from jose import jws,jwt,JWTError
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"],deprecated="auto")
def hash_password(password:str):
    return pwd_context.hash(password)
def verify_password(plain_password,hashed_password):
    return pwd_context.verify(plain_password,hashed_password)
def get_user(email: str, user_collection):
    return user_collection.find_one({"email": email})
def authenticate_user(email: str, password: str, user_collection):
    user = get_user(email, user_collection)
    if not user:
        return False
    if not verify_password(password, user['password']):
        return False
    return user
def create_access_token(data:dict):
    to_encode = data.copy()
    days = int(settings.ACCESS_TOKEN_EXPIRES_IN)
    expire = datetime.now(timezone.utc) + timedelta(days=days)
    to_encode.update({"exp": expire,"iat": datetime.now(timezone.utc)})
    encoded_jwt = jwt.encode(to_encode,settings.JWT_PRIVATE_KEY,algorithm=settings.JWT_ALGORITHM)
    return encoded_jwt

def verify_token(token:str, credentials_exception: Exception):
    try:
        payload = jwt.decode(token,settings.JWT_PRIVATE_KEY,algorithms=[settings.JWT_ALGORITHM])
        return payload["user"]
    except JWTError:
        raise credentials_exception

def login_user(user:UserLogin,user_collection:Collection):
    db_user = authenticate_user(user.email,user.password,user_collection)
    if not db_user:
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    # Generate token
    token = create_access_token(data={"id": str(db_user["_id"])})
    return {
        "status": "success",
        "token": token,
        "user": {
            "email": db_user["email"],
            "role": db_user["role"],
            "_id": str(db_user["_id"]),
        }
    }

def create_user(user:User,user_collection:Collection):
   try:
        # Check if user already exists
        if get_user(user.email, user_collection):
            raise HTTPException(status_code=400, detail="Email already registered")
    
        # Hash the password
        hashed_password = hash_password(user.password)
         # Prepare user data for insertion
        user_data = user.model_dump()
        user_data['password'] = hashed_password
        
        # Insert into database
        result = user_collection.insert_one(user_data)
        
        # Retrieve the inserted user
        created_user = user_collection.find_one({"_id": result.inserted_id})
        
        # Generate token
        token = create_access_token(data={"id": str(created_user["_id"])})

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
        }
    }
   except Exception as e:
        print(e)  # Log the error for debugging
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error",)


