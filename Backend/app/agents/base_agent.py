from abc import ABC
import json
import time
import traceback

from app.external.gemini_client import GeminiClient
from app.utils.prompt_loader import load_prompt
from app.utils.json_parser import JSONParser
from app.utils.output_validator import OutputValidator


class BaseAgent(ABC):
    """
    Base class for all AI Agents.

    Responsibilities:
    - Load Prompt
    - Call Gemini
    - Parse JSON
    - Validate Output
    - Measure Execution Time
    - Return Standard Response
    """

    def __init__(
        self,
        prompt_file: str,
        required_fields: list | None = None
    ):
        self.client = GeminiClient()
        self.prompt = load_prompt(prompt_file)
        self.required_fields = required_fields or []

    def execute(
        self,
        input_data: dict,
        temperature: float = 0.3
    ):

        start_time = time.perf_counter()

        user_prompt = json.dumps(
            input_data,
            indent=4,
            ensure_ascii=False
        )

        for attempt in range(3):

            response = self.client.generate(
                system_prompt=self.prompt,
                user_prompt=user_prompt,
                temperature=temperature
            )

            print(f"\n========== {self.__class__.__name__} ==========")
            print(response)
            print("=============================================\n")

            try:

                parsed = JSONParser.parse(response)

                OutputValidator.validate(
                    parsed,
                    self.required_fields
                )

                break

            except Exception:

                print(
                    f"⚠ Invalid JSON from {self.__class__.__name__}. Retrying ({attempt+1}/3)..."
                )

                if attempt == 2:
                    raise

        execution_time = round(
            time.perf_counter() - start_time,
            3
        )

        return {
            "success": True,
            "agent": self.__class__.__name__,
            "execution_time": execution_time,
            "data": parsed
        }