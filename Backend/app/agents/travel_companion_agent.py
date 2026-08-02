from app.agents.base_agent import BaseAgent


class TravelCompanionAgent(BaseAgent):

    def __init__(self):

        super().__init__(
            prompt_file="agents/travel_companion.md",
            required_fields=[
                "packing",
                "safety",
                "food",
                "etiquette",
                "emergency",
                "tips",
            ],
        )