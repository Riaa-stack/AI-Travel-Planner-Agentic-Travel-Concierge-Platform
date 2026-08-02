from app.agents.base_agent import BaseAgent


class PreferenceAgent(BaseAgent):

    def __init__(self):

        super().__init__(
            prompt_file="agents/preference.md",
            required_fields=[
                "travel_style",
                "budget_type",
                "recommended_pace",
                "traveler_category",
                "summary",
            ]
        )
