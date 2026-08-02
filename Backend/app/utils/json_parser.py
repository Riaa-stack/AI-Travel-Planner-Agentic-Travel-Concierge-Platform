import json
import re


class JSONParser:
    """
    Utility class for extracting and parsing JSON
    returned by Gemini.
    """

    @staticmethod
    def parse(text: str):
        """
        Extract JSON from an LLM response.
        """

        if not text:
            raise ValueError("Empty response received.")

        text = text.strip()

        # Remove markdown code fences
        text = re.sub(r"^```json", "", text)
        text = re.sub(r"^```", "", text)
        text = re.sub(r"```$", "", text)

        text = text.strip()

        # Try parsing directly
        try:
            return json.loads(text)

        except json.JSONDecodeError:
            pass

        # Try extracting JSON object
        match = re.search(r"\{.*\}", text, re.DOTALL)

        if match:
            return json.loads(match.group())

        raise ValueError("No valid JSON found.")
    