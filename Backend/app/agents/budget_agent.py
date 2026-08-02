from app.agents.base_agent import BaseAgent


class BudgetAgent(BaseAgent):

    def __init__(self):

        super().__init__(
            prompt_file="agents/budget.md",
            required_fields=[
                "hotel_budget",
                "food_budget",
                "transport_budget",
                "activity_budget",
                "misc_budget",
                "estimated_total",
                "budget_status",
            ]
        )
