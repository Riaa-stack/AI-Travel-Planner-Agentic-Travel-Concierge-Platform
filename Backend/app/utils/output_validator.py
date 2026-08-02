class OutputValidator:
    """
    Validates AI responses against the expected schema.
    """

    @staticmethod
    def validate(data: dict, required_fields: list):
        """
        Check whether all required fields are present.
        """

        if not isinstance(data, dict):
            raise ValueError("Response must be a dictionary.")

        missing = []

        for field in required_fields:
            if field not in data:
                missing.append(field)

        if missing:
            raise ValueError(
                f"Missing required fields: {', '.join(missing)}"
            )

        return True