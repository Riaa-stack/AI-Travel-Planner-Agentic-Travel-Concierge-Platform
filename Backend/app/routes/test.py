from flask import Blueprint
from sqlalchemy import text

from app.agents.budget_agent import BudgetAgent
from app.agents.crowd_agent import CrowdAgent
from app.agents.preference_agent import PreferenceAgent
from app.agents.replanning_agent import ReplanningAgent
from app.agents.route_agent import RouteAgent
from app.agents.test_agent import TestAgent
from app.agents.travel_companion_agent import TravelCompanionAgent
from app.agents.weather_agent import WeatherAgent
from app.extensions import db
from app.external.gemini_client import GeminiClient
from app.external.geoapify_api import GeoapifyAPI
from app.external.weather_api import WeatherAPI
from app.orchestrators.travel_orchestrator import TravelOrchestrator
from app.utils.json_parser import JSONParser
from app.utils.output_validator import OutputValidator
from app.utils.prompt_loader import load_prompt

test_bp = Blueprint(
    "test",
    __name__,
    url_prefix="/test"
)


@test_bp.route("/health", methods=["GET"])
def health():
    return {
        "success": True,
        "message": "Backend is running 🚀"
    }, 200


@test_bp.route("/database", methods=["GET"])
def database():

    try:
        db.session.execute(text("SELECT 1"))

        return {
            "success": True,
            "message": "Database connected successfully ✅"
        }, 200

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }, 500


@test_bp.route("/prompt", methods=["GET"])
def prompt_test():

    try:

        prompt = load_prompt("agents/preference.md")

        return {
            "success": True,
            "prompt": prompt
        }, 200

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }, 500


@test_bp.route("/json", methods=["GET"])
def json_test():

    sample = """
    ```json
    {
        "destination":"Goa",
        "days":5
    }
    ```
    """

    try:

        parsed = JSONParser.parse(sample)

        return {
            "success": True,
            "data": parsed
        }

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }, 500


@test_bp.route("/validator", methods=["GET"])
def validator_test():

    sample = {
        "travel_style": "Luxury",
        "budget_type": "High",
        "recommended_pace": "Relaxed",
        "summary": "Luxury beach vacation."
    }

    try:

        OutputValidator.validate(
            sample,
            [
                "travel_style",
                "budget_type",
                "recommended_pace",
                "summary"
            ]
        )

        return {
            "success": True,
            "message": "Validation Successful"
        }

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }, 500


@test_bp.route("/base-agent")
def base_agent():

    try:

        agent = TestAgent()

        result = agent.execute()

        return result

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }, 500


@test_bp.route("/preference-agent", methods=["GET"])
def preference_agent_test():

    try:

        agent = PreferenceAgent()

        result = agent.execute(
            {
                "destination": "Goa",
                "budget": 30000,
                "days": 5,
                "interests": [
                    "Beach",
                    "Adventure",
                    "Nightlife"
                ],
                "group_type": "Friends",
                "season": "Winter"
            }
        )

        return result

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }, 500


@test_bp.route("/budget-agent", methods=["GET"])
def budget_agent_test():

    try:

        agent = BudgetAgent()

        result = agent.execute(
            {
                "destination": "Goa",
                "budget": 30000,
                "days": 5,
                "travel_style": "Party & Adventure"
            }
        )

        return result

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }, 500


@test_bp.route("/route-agent", methods=["GET"])
def route_agent_test():

    try:

        agent = RouteAgent()

        result = agent.execute(
            {
                "destination": "Goa",
                "day": 1,
                "total_days": 5,
                "travel_style": "Party & Adventure",
                "budget_type": "Mid-range",
                "interests": [
                    "Beach",
                    "Adventure",
                    "Nightlife"
                ],
                "season": "Winter"
            }
        )

        return result

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }, 500


@test_bp.route("/weather-agent", methods=["GET"])
def weather_agent_test():

    try:

        agent = WeatherAgent()

        result = agent.execute(
            {
                "destination": "Goa",
                "season": "Winter",
                "days": [
                    {
                        "day": 1,
                        "theme": "North Goa Adventure",
                        "activities": [
                            "Calangute Beach",
                            "Baga Beach"
                        ]
                    },
                    {
                        "day": 2,
                        "theme": "South Goa",
                        "activities": [
                            "Palolem Beach",
                            "Butterfly Beach"
                        ]
                    }
                ]
            }
        )

        return result

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }, 500


@test_bp.route("/crowd-agent", methods=["GET"])
def crowd_agent_test():

    try:

        agent = CrowdAgent()

        result = agent.execute(
            {
                "destination": "Goa",
                "season": "Winter",
                "days": [
                    {
                        "day": 1,
                        "theme": "North Goa",
                        "activities": [
                            "Calangute Beach",
                            "Baga Beach"
                        ]
                    },
                    {
                        "day": 2,
                        "theme": "South Goa",
                        "activities": [
                            "Palolem Beach",
                            "Butterfly Beach"
                        ]
                    }
                ]
            }
        )

        return result

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }, 500


@test_bp.route("/travel-companion-agent", methods=["GET"])
def travel_companion_agent_test():

    try:

        agent = TravelCompanionAgent()

        result = agent.execute(
            {
                "destination": "Goa",
                "season": "Winter",
                "travel_style": "Party & Adventure",
                "days": 5
            }
        )

        return result

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }, 500


@test_bp.route("/replanning-agent", methods=["GET"])
def replanning_agent_test():

    try:

        agent = ReplanningAgent()

        result = agent.execute(
            {
                "destination": "Goa",
                "reason": "Heavy rain expected on Day 2",
                "current_plan": {
                    "days": [
                        {
                            "day": 2,
                            "theme": "South Goa",
                            "activities": [
                                "Palolem Beach",
                                "Butterfly Beach"
                            ]
                        }
                    ]
                }
            }
        )

        return result

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }, 500


@test_bp.route("/orchestrator", methods=["GET"])
def orchestrator_test():

    try:

        orchestrator = TravelOrchestrator()

        result = orchestrator.generate_trip(
            {
                "destination": "Goa",
                "budget": 30000,
                "days": 2,
                "interests": [
                    "Beach",
                    "Adventure",
                    "Nightlife"
                ],
                "group_type": "Friends",
                "season": "Winter"
            }
        )

        return {
            "success": True,
            "data": result
        }, 200

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }, 500


@test_bp.route("/gemini", methods=["GET"])
def gemini_test():

    try:

        client = GeminiClient()

        response = client.generate(
            system_prompt="You are a helpful assistant.",
            user_prompt="Reply only with 'Gemini Working Successfully.'"
        )

        return {
            "success": True,
            "response": response
        }, 200

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }, 500


@test_bp.route("/weather-api", methods=["GET"])
def weather_api_test():

    try:

        api = WeatherAPI()

        data = api.get_forecast("Goa")

        return {
            "success": True,
            "city": data["city"]["name"],
            "country": data["city"]["country"],
            "forecast_count": len(data["list"])
        }

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }, 500


@test_bp.route("/geoapify", methods=["GET"])
def geoapify_test():

    try:

        api = GeoapifyAPI()

        result = api.geocode("Goa")

        return {
            "success": True,
            "data": result
        }

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }, 500


@test_bp.route("/places", methods=["GET"])
def places_test():

    try:

        api = GeoapifyAPI()

        location = api.geocode("Panaji")

        places = api.search_places(
            location["latitude"],
            location["longitude"]
        )

        return {
            "success": True,
            "total_places": len(places),
            "places": places
        }

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }, 500


@test_bp.route("/hotels", methods=["GET"])
def hotels_test():

    try:

        api = GeoapifyAPI()

        location = api.geocode("Panaji")

        hotels = api.search_hotels(
            location["latitude"],
            location["longitude"]
        )

        return {
            "success": True,
            "total_hotels": len(hotels),
            "hotels": hotels
        }

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }, 500


@test_bp.route("/route-api", methods=["GET"])
def route_api_test():

    try:

        api = GeoapifyAPI()

        start = api.geocode("Fort Aguada")
        end = api.geocode("Baga Beach")

        route = api.get_route(
            start["latitude"],
            start["longitude"],
            end["latitude"],
            end["longitude"]
        )

        return {
            "success": True,
            "route": route
        }

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }, 500