from flask import Blueprint, request, jsonify, g
import jwt
from functools import wraps
from config import SECRET_KEY_SUPABASE

jwt_bp = Blueprint("jwt_bp", __name__)


# Middleware to verify JWT
def jwt_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = None
        if "Authorization" in request.headers:
            auth_header = request.headers["Authorization"]
            if auth_header.startswith("Bearer "):
                token = auth_header.split(" ")[1]

        if not token:
            return jsonify({"message": "Token is missing!"}), 401

        try:
            data = jwt.decode(
                token,
                SECRET_KEY_SUPABASE,
                algorithms=["HS256"],
                audience="authenticated",
                options={"verify_signature": False},
            )
            g.user_id = data["sub"]
        except Exception as e:
            return jsonify({"message": "Token has expired!"}), 401

        return f(*args, **kwargs)

    return decorated_function


# Test protected route for JWT
@jwt_bp.route("/protected", methods=["GET"])
@jwt_required
def protected():
    return (
        jsonify(
            {
                "message": f"Welcome User {g.user_id}, this is a protected endpoint.",
                "status": "success",
            }
        ),
        200,
    )
