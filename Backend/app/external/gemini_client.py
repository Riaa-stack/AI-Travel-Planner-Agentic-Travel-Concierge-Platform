from google import genai
from google.genai import types
from flask import current_app
import time


class GeminiClient:
    """
    Production-ready Gemini Client
    """

    def __init__(self):

        self.client = genai.Client(
            api_key=current_app.config["GEMINI_API_KEY"]
        )

        self.model = current_app.config["GEMINI_MODEL"]

    def generate(
        self,
        system_prompt: str,
        user_prompt: str,
        temperature=None,
        max_output_tokens=None,
        retries=3,
    ):

        if temperature is None:
            temperature = current_app.config["GEMINI_TEMPERATURE"]

        if max_output_tokens is None:
            max_output_tokens = current_app.config[
                "GEMINI_MAX_OUTPUT_TOKENS"
            ]

        for attempt in range(retries):

            try:

                response = self.client.models.generate_content(
                    model=self.model,
                    contents=user_prompt,
                    config=types.GenerateContentConfig(
                        system_instruction=system_prompt,
                        temperature=temperature,
                        max_output_tokens=max_output_tokens,
                        response_mime_type="application/json",
                    ),
                )

                return response.text

            except Exception as e:

                if attempt == retries - 1:
                    raise Exception(
                        f"Gemini Error: {str(e)}"
                    )

                time.sleep(2)
        