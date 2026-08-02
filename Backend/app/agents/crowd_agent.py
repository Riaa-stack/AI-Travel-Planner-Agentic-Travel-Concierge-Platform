from app.agents.base_agent import BaseAgent


class CrowdAgent(BaseAgent):

    def __init__(self):

        super().__init__(
            prompt_file="agents/crowd.md",
            required_fields=[
                "crowd"
            ]
        )