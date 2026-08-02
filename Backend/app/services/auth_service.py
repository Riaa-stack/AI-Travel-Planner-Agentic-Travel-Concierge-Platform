from flask_jwt_extended import create_access_token

from app.extensions import db
from app.models.user import User


class AuthService:

    @staticmethod
    def register(data):
        """
        Register a new user.
        """

        existing_user = User.query.filter_by(
            email=data["email"]
        ).first()

        if existing_user:
            return {
                "success": False,
                "message": "Email already exists."
            }, 409

        user = User(
            name=data["name"],
            email=data["email"]
        )

        user.set_password(data["password"])

        db.session.add(user)
        db.session.commit()

        access_token = create_access_token(
            identity=str(user.id)
        )

        return {
            "success": True,
            "message": "User registered successfully.",
            "access_token": access_token,
            "user": user.to_dict()
        }, 201

    @staticmethod
    def login(data):
        """
        Login user.
        """

        user = User.query.filter_by(
            email=data["email"]
        ).first()

        if not user:
            return {
                "success": False,
                "message": "Invalid email or password."
            }, 401

        if not user.check_password(data["password"]):
            return {
                "success": False,
                "message": "Invalid email or password."
            }, 401

        access_token = create_access_token(
            identity=str(user.id)
        )

        return {
            "success": True,
            "message": "Login successful.",
            "access_token": access_token,
            "user": user.to_dict()
        }, 200

    @staticmethod
    def get_current_user(user_id):
        """
        Fetch current logged-in user.
        """

        user = User.query.get(user_id)

        if not user:
            return {
                "success": False,
                "message": "User not found."
            }, 404

        return {
            "success": True,
            "user": user.to_dict()
        }, 200