from app.agents.base_agent import BaseAgent


class TestAgent(BaseAgent):

    def __init__(self):

        super().__init__(
            prompt_file="agents/preference.md",
            required_fields=[]
        )

    def execute(self):

        return self.run(
            {
                "destination": "Goa",
                "budget": 30000,
                "days": 5,
                "interests": [
                    "Beach",
                    "Adventure"
                ]
            }
        )
