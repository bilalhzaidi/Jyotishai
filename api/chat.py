# api/chat.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import requests

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str

OLLAMA_URL = "http://localhost:11434/api/generate"

@router.post("/chat", response_model=ChatResponse)
async def chat_handler(request: ChatRequest):
    try:
        payload = {
            "model": "phi3",
            "prompt": request.message,
            "stream": False
        }
        response = requests.post(OLLAMA_URL, json=payload)
        response.raise_for_status()
        return ChatResponse(reply=response.json()["response"].strip())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating response: {str(e)}")
