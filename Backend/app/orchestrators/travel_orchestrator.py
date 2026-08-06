from app.agents.preference_agent import PreferenceAgent
from app.agents.budget_agent import BudgetAgent
from app.agents.route_agent import RouteAgent
from app.agents.weather_agent import WeatherAgent
from app.agents.crowd_agent import CrowdAgent
from app.agents.travel_companion_agent import TravelCompanionAgent
from app.agents.replanning_agent import ReplanningAgent
from app.external.geoapify_api import GeoapifyAPI
from app.external.weather_api import WeatherAPI

class TravelOrchestrator:

    def __init__(self):

        self.preference_agent = PreferenceAgent()
        self.budget_agent = BudgetAgent()
        self.route_agent = RouteAgent()
        self.weather_agent = WeatherAgent()
        self.weather_api = WeatherAPI()
        self.crowd_agent = CrowdAgent()
        self.travel_companion_agent = TravelCompanionAgent()
        self.replanning_agent = ReplanningAgent()

    def generate_trip(self, user_input: dict):

        print("\n==============================")
        print("🚀 Starting PreferenceAgent")
        print("==============================")
        preference = self.preference_agent.execute(user_input)["data"]
        print("✅ PreferenceAgent Finished")

        print("\n==============================")
        print("🚀 Starting BudgetAgent")
        print("==============================")
        budget = self.budget_agent.execute(
            {
                **user_input,
                **preference
            }
        )["data"]
        
        print("\n==============================")
        print("🚀 Starting RouteAgent")
        print("==============================")

        print("➡️ Generating itinerary in chunks...")

        route_days = []
        total_days = user_input["days"]

        for start_day in range(1, total_days + 1, 2):
            end_day = min(start_day + 1, total_days)

            result = self.route_agent.execute(
                {
                    "destination": user_input["destination"],
                    "total_days": total_days,
                    "start_day": start_day,
                    "end_day": end_day,
                    "travel_style": preference["travel_style"],
                    "budget_type": preference["budget_type"],
                    "interests": user_input["interests"],
                    "season": user_input["season"]
                }
            )

            route_days.extend(result["data"]["days"])

        route = {
            "days": route_days
        }

        print("✅ Route completed")

        geoapify = GeoapifyAPI()

        for day in route_days:
            for activity in day["activities"]:
                location = f"{activity['location']}, {user_input['destination']}"
                try:
                    print("=" * 60)
                    print("Searching Geoapify:", location)

                    coordinates = geoapify.geocode(location)

                    print("Coordinates Returned:", coordinates)

                    activity["coordinates"] = coordinates
                    print("=" * 60)

                    if coordinates:
                        activity["nearby_hotels"] = geoapify.search_hotels(
                            coordinates["latitude"],
                            coordinates["longitude"]
                        )

                        activity["nearby_places"] = geoapify.search_places(
                            coordinates["latitude"],
                            coordinates["longitude"]
                        )
                    else:
                        activity["nearby_hotels"] = []
                        activity["nearby_places"] = []

                except Exception as e:
                    print(f"Geoapify Error for {location}: {e}")

                    activity["coordinates"] = None
                    activity["nearby_hotels"] = []
                    activity["nearby_places"] = []

        print("✅ RouteAgent Finished")

        print("\n==============================")
        print("🚀 Starting OpenWeather API")
        print("==============================")

        forecast = self.weather_api.get_forecast(
            user_input["destination"]
        )

        weather = {
            "weather": []
        }

        forecast_list = forecast["list"]

        for day in range(user_input["days"]):

            index = min(day * 8, len(forecast_list) - 1)

            item = forecast_list[index]

            weather["weather"].append({
                "day": day + 1,
                "condition": item["weather"][0]["main"],
                "temperature": f'{round(item["main"]["temp"])}°C',
                "activity_suitable": item["weather"][0]["main"] not in ["Rain", "Thunderstorm"],
                "warning": "Carry an umbrella." if item["weather"][0]["main"] == "Rain" else ""
            })

        print("✅ OpenWeather API Finished")

        print("\n==============================")
        print("🚀 Starting CrowdAgent")
        print("==============================")

        crowd = self.crowd_agent.execute(
            {
                "destination": user_input["destination"],
                "season": user_input["season"],
                "days": route["days"]
            }
        )["data"]

        print("✅ CrowdAgent Finished")

        print("\n==============================")
        print("🚀 Starting TravelCompanionAgent")
        print("==============================")

        companion = self.travel_companion_agent.execute(
            {
                "destination": user_input["destination"],
                "season": user_input["season"],
                "travel_style": preference["travel_style"],
                "days": user_input["days"]
            }
        )["data"]

        print("✅ TravelCompanionAgent Finished")

        # Final Combined Response
        return {
            "preference": preference,
            "budget": budget,
            "route": route,
            "weather": weather,
            "crowd": crowd,
            "travel_companion": companion
        }