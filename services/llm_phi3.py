# services/llm_phi3.py

import requests

def get_phi3_response(prompt: str) -> str:
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={"model": "phi3", "prompt": prompt, "stream": False}
    )
    response.raise_for_status()
    return response.json()["response"].strip()
