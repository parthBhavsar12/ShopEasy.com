from typing import Collection
from fastapi import APIRouter, Depends, Request, Response

# from api.middleware.auth_middleware import AuthMiddleware
from api.middleware.auth_middleware import protect
from dependencies.dependencies import get_user_collection, get_reset_password_collection
from models.UserModel import User, UserLogin, ForgotPasswordRequest, ResetPasswordRequest
from api.controller.auth_controller import (
    create_user,
    get_current_user,
    login_user,
    logout_user,
    protect_user,
    reset_password,
    forgot_password
)

auth_router = APIRouter()


@auth_router.post("/signup")
def signup(
    user: User,
    response: Response,
    user_collection: Collection = Depends(get_user_collection),
):
    # Call the controller function with injected dependencies
    return create_user(user, response, user_collection)


@auth_router.post("/login")
def login(
    user: UserLogin,
    response: Response,
    user_collection: Collection = Depends(get_user_collection),
):
    return login_user(user, response, user_collection)


@auth_router.post("/logout")
def logout(response: Response):
    return logout_user(response)


# @auth_router.post("/profile")
# def protected_route(current_user: dict = Depends(get_current_user_dependency)):
#     return {"message": f"Hello, {current_user['email']}!"}
@auth_router.get("/me")
def get_authenticated_user(
    request: Request, user_collection: Collection = Depends(get_user_collection)
):
    return get_current_user(request, user_collection)


# protected_router = APIRouter(dependencies=[Depends(protect_user)])


# Apply the middleware only to the protected router
# protected_router.middleware("http")(AuthMiddleware())
@auth_router.get("/profile")
@protect()
def profile(request: Request):
    user = request.state.user
    return {"message": f"Welcome to your profile, {user}!"}

@auth_router.post("/forgot-password")
async def forget_password(user_email:ForgotPasswordRequest,user_collection:Collection = Depends(get_user_collection),resetpasswordCollection:Collection = Depends(get_reset_password_collection)):
    return await forgot_password(user_email,user_collection,resetpasswordCollection)

@auth_router.post("/reset-password")
def reset_user_password(reset_user:ResetPasswordRequest ,user_collection:Collection = Depends(get_user_collection),resetpasswordCollection:Collection = Depends(get_reset_password_collection)):
    return reset_password(reset_user,user_collection,resetpasswordCollection)