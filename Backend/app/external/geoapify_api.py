import requests
from flask import current_app


class GeoapifyAPI:
    """
    Geoapify API Client

    Supports:
    - Geocoding
    - Tourist Places
    - Hotels
    - Routing
    """

    GEOCODE_URL = "https://api.geoapify.com/v1/geocode/search"
    PLACES_URL = "https://api.geoapify.com/v2/places"

    def __init__(self):
        self.api_key = current_app.config["GEOAPIFY_API_KEY"]

    def geocode(self, place_name: str):

        params = {
            "text": place_name,
            "apiKey": self.api_key
        }

        response = requests.get(
            self.GEOCODE_URL,
            params=params,
            timeout=10
        )

        response.raise_for_status()

        data = response.json()

        if not data["features"]:
            return None

        coordinates = data["features"][0]["geometry"]["coordinates"]

        return {
            "latitude": coordinates[1],
            "longitude": coordinates[0]
        }

    def search_places(
        self,
        latitude: float,
        longitude: float,
        radius: int = 5000
    ):

        params = {
            "categories": "tourism.attraction",
            "filter": f"circle:{longitude},{latitude},{radius}",
            "bias": f"proximity:{longitude},{latitude}",
            "limit": 20,
            "apiKey": self.api_key
        }

        response = requests.get(
            self.PLACES_URL,
            params=params,
            timeout=10
        )

        response.raise_for_status()

        data = response.json()

        places = []

        for place in data["features"]:

            properties = place["properties"]

            places.append({
                "name": properties.get("name"),
                "latitude": place["geometry"]["coordinates"][1],
                "longitude": place["geometry"]["coordinates"][0],
                "address": properties.get("formatted")
            })

        return places

    def search_hotels(
        self,
        latitude: float,
        longitude: float,
        radius: int = 5000
    ):

        params = {
            "categories": "accommodation.hotel",
            "filter": f"circle:{longitude},{latitude},{radius}",
            "bias": f"proximity:{longitude},{latitude}",
            "limit": 20,
            "apiKey": self.api_key
        }

        response = requests.get(
            self.PLACES_URL,
            params=params,
            timeout=10
        )

        response.raise_for_status()

        data = response.json()

        hotels = []

        for hotel in data["features"]:

            properties = hotel["properties"]

            hotels.append({
                "name": properties.get("name", "Unknown Hotel"),
                "address": properties.get("formatted"),
                "latitude": hotel["geometry"]["coordinates"][1],
                "longitude": hotel["geometry"]["coordinates"][0]
            })

        return hotels

    def get_route(
        self,
        start_lat,
        start_lng,
        end_lat,
        end_lng
    ):

        url = "https://api.geoapify.com/v1/routing"

        params = {
            "waypoints": f"{start_lat},{start_lng}|{end_lat},{end_lng}",
            "mode": "drive",
            "apiKey": self.api_key
        }

        response = requests.get(
            url,
            params=params,
            timeout=10
        )

        response.raise_for_status()

        return response.json()
