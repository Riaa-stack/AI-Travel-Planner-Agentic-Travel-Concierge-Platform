from pathlib import Path


PROMPTS_DIR = Path(__file__).resolve().parent.parent / "prompts"


def load_prompt(relative_path: str) -> str:
    """
    Load a prompt file from the prompts directory.

    Example:
        load_prompt("agents/preference.md")
        load_prompt("system/system_prompt.md")
    """

    prompt_path = PROMPTS_DIR / relative_path

    if not prompt_path.exists():
        raise FileNotFoundError(
            f"Prompt not found: {prompt_path}"
        )

    with open(prompt_path, "r", encoding="utf-8") as file:
        return file.read()