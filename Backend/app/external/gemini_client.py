from google import genai
from google.genai import types
from flask import current_app
import time


class GeminiClient:
    """
    Production-ready Gemini Client
    """

    def __init__(self):

        print("\n==============================")
        print("API KEY:", current_app.config["GEMINI_API_KEY"][:15] + "...")
        print("MODEL:", current_app.config["GEMINI_MODEL"])
        print("==============================\n")

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

                print("\n========== RESPONSE OBJECT ==========")
                print(response)
                print("====================================")

                try:
                    print("Finish Reason:", response.candidates[0].finish_reason)
                except Exception as e:
                    print("Couldn't read finish reason:", e)

                return response.text

            except Exception as e:
                import traceback

                print("\n================ GEMINI ERROR ================")
                traceback.print_exc()
                print("==============================================\n")

                if attempt == retries - 1:
                    raise

                time.sleep(2)
        