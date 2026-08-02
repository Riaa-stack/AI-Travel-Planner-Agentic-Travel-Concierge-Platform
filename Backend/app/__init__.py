from flask import Flask

from app.config import config
from app.extensions import cors, db, jwt, migrate
from app.routes.auth import auth_bp
from app.routes.test import test_bp
from app.routes.trips import trip_bp


def create_app():
    app = Flask(__name__)

    # Load configuration
    app.config.from_object(config["development"])

    # Initialize Extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    cors.init_app(
        app,
        resources={r"/api/*": {"origins": "*"}},
        supports_credentials=True,
    )

    # Home Route
    @app.route("/", methods=["GET"])
    def home():
        return {
            "success": True,
            "message": "AI Travel Planner Backend is Running 🚀"
        }

    # Register Blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(trip_bp)
    app.register_blueprint(test_bp)

    return app