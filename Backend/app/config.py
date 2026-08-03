import os
from dotenv import load_dotenv

load_dotenv()

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
GEOAPIFY_API_KEY = os.getenv("GEOAPIFY_API_KEY")


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    GEOAPIFY_API_KEY = GEOAPIFY_API_KEY

    GEMINI_MODEL = os.getenv(
        "GEMINI_MODEL",
        "gemini-2.5-flash"
    )

    GEMINI_TEMPERATURE = float(
        os.getenv(
            "GEMINI_TEMPERATURE",
            0.3
        )
    )

    GEMINI_MAX_OUTPUT_TOKENS = int(
        os.getenv(
            "GEMINI_MAX_OUTPUT_TOKENS",
            8192
        )
    )

    OPENWEATHER_API_KEY = OPENWEATHER_API_KEY
    HOTEL_API_KEY = os.getenv("HOTEL_API_KEY")


class DevelopmentConfig(Config):
    DEBUG = True


class ProductionConfig(Config):
    DEBUG = False


config = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
}