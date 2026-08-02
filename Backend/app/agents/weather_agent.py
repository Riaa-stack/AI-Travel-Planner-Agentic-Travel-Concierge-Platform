from app.agents.base_agent import BaseAgent


class WeatherAgent(BaseAgent):

    def __init__(self):

        super().__init__(
            prompt_file="agents/weather.md",
            required_fields=[
                "weather"
            ]
        )