from app.agents.preference_agent import PreferenceAgent
from app.agents.budget_agent import BudgetAgent
from app.agents.route_agent import RouteAgent
from app.agents.weather_agent import WeatherAgent
from app.agents.crowd_agent import CrowdAgent
from app.agents.travel_companion_agent import TravelCompanionAgent
from app.agents.replanning_agent import ReplanningAgent


class TravelOrchestrator:

    def __init__(self):

        self.preference_agent = PreferenceAgent()
        self.budget_agent = BudgetAgent()
        self.route_agent = RouteAgent()
        self.weather_agent = WeatherAgent()
        self.crowd_agent = CrowdAgent()
        self.travel_companion_agent = TravelCompanionAgent()
        self.replanning_agent = ReplanningAgent()

    def generate_trip(self, user_input: dict):

        # Step 1: Analyze user preferences
        preference = self.preference_agent.execute(
            user_input
        )["data"]

        # Step 2: Generate budget breakdown
        budget = self.budget_agent.execute(
            {
                **user_input,
                **preference
            }
        )["data"]

        # Step 3: Generate itinerary
        route = self.route_agent.execute(
            {
                **user_input,
                **preference
            }
        )["data"]

        # Step 4: Analyze weather
        weather = self.weather_agent.execute(
            {
                "destination": user_input["destination"],
                "season": user_input["season"],
                "days": route["days"]
            }
        )["data"]

        # Step 5: Analyze crowd
        crowd = self.crowd_agent.execute(
            {
                "destination": user_input["destination"],
                "season": user_input["season"],
                "days": route["days"]
            }
        )["data"]

        # Step 6: Generate travel guidance
        companion = self.travel_companion_agent.execute(
            {
                "destination": user_input["destination"],
                "season": user_input["season"],
                "travel_style": preference["travel_style"],
                "days": user_input["days"]
            }
        )["data"]

        # Final Combined Response
        return {
            "preference": preference,
            "budget": budget,
            "route": route,
            "weather": weather,
            "crowd": crowd,
            "travel_companion": companion
        }