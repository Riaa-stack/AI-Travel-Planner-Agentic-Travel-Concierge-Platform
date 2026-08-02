from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.schemas.auth_schema import RegisterSchema, LoginSchema
from app.services.auth_service import AuthService

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")

register_schema = RegisterSchema()
login_schema = LoginSchema()


@auth_bp.route("/register", methods=["POST"])
def register():

    json_data = request.get_json()

    if not json_data:
        return {
            "success": False,
            "message": "No input data provided."
        }, 400

    errors = register_schema.validate(json_data)

    if errors:
        return {
            "success": False,
            "errors": errors
        }, 400

    return AuthService.register(json_data)


@auth_bp.route("/login", methods=["POST"])
def login():

    json_data = request.get_json()

    if not json_data:
        return {
            "success": False,
            "message": "No input data provided."
        }, 400

    errors = login_schema.validate(json_data)

    if errors:
        return {
            "success": False,
            "errors": errors
        }, 400

    return AuthService.login(json_data)


@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def get_current_user():

    user_id = get_jwt_identity()

    return AuthService.get_current_user(user_id)