from functools import wraps
from typing import Collection

from fastapi import Depends, HTTPException, Request
from starlette.middleware.base import BaseHTTPMiddleware
from api.controller.auth_controller import get_current_user, protect_user
from dependencies.dependencies import get_user_collection

def protect():
    def decorator(func):
        @wraps(func)
        def wrapper(request: Request, *args, **kwargs):
            try:
                user = protect_user(request)
                request.state.user = user
            except HTTPException:
                raise HTTPException(status_code=401, detail="Unauthorized access")
            return func(request, *args, **kwargs)
        return wrapper
    return decorator

