from app.agents.base_agent import BaseAgent


class ReplanningAgent(BaseAgent):

    def __init__(self):

        super().__init__(
            prompt_file="agents/replanning.md",
            required_fields=[
                "changes"
            ]
        )