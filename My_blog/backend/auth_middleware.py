from functools import wraps
import jwt
from flask import request, abort, current_app
import models

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers["Authorization"].split(" ")[1]
        if not token:
            return {
                "message" : "Authentication token is missing",
                "data" : None,
                "error" : "Unauthorized"   
            }, 401
        try:
            data = jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])
            current_user = models.User().get_user_by_userName(data["userName"])
            if current_user is None:
                return {
                    "message" : "Invalid Authentication token!",
                    "data" : None,
                    "error" : "Unauthorized"
                }, 401
        except Exception as e:
            return {
                "message" : "Something went wrong",
                "data" : None,
                "error" : str(e)
            }, 500
        return f(current_user, *args, **kwargs)
    return decorated