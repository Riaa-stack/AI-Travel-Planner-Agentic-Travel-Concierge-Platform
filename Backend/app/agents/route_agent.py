from app.agents.base_agent import BaseAgent


class RouteAgent(BaseAgent):

    def __init__(self):

        super().__init__(
            prompt_file="agents/route.md",
            required_fields=[
                "days"
            ]
        )
