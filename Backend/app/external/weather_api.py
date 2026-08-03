import requests
from flask import current_app


class WeatherAPI:
    """
    OpenWeather API Client
    """

    BASE_URL = "https://api.openweathermap.org/data/2.5/forecast"

    def get_forecast(self, city: str):

        api_key = current_app.config["OPENWEATHER_API_KEY"]

        params = {
            "q": city,
            "appid": api_key,
            "units": "metric"
        }

        response = requests.get(
            self.BASE_URL,
            params=params,
            timeout=10
        )

        response.raise_for_status()

        return response.json()
