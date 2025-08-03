# 📁 File: api/seduction.py

from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from models.schemas import ChartRequest
from services.chart_engine import VedicAstrologyEngine


router = APIRouter()

class SeductionProfileRequest(BaseModel):
    name: str
    birth_date: str  # YYYY-MM-DD
    birth_time: str  # HH:MM (24h)
    location: str     # e.g., "Karachi, Pakistan"
    utc_offset: str   # e.g., "+05:00"

class SeductionProfileResponse(BaseModel):
    name: str
    message: str

@router.post("/seduction_profile", response_model=SeductionProfileResponse)
def get_seduction_profile(request: SeductionProfileRequest):
    # Prepare input
    chart_req = ChartRequest(
        name=request.name,
        birth_date=request.birth_date,
        birth_time=request.birth_time,
        location=request.location,
        utc_offset=request.utc_offset,
    )

    # Run astrology engine
    engine = VedicAstrologyEngine(
        birth_date=chart_req.birth_date,
        birth_time=chart_req.birth_time,
        location=chart_req.location,
        utc_offset=chart_req.utc_offset,
    )

    chart = engine.compute_full_chart()
    venus = chart.get("Venus")
    mars = chart.get("Mars")
    moon = chart.get("Moon")
    lagna = chart.get("Asc")

    # Interpret style based on Venus and Mars
    sensual_style = "adventurous and assertive" if venus.sign == "Aries" else (
        "charming and diplomatic" if venus.sign == "Libra" else (
        "deeply emotional and magnetic" if venus.sign == "Scorpio" else "subtle and sensual"))

    drive_style = "bold and dominant" if mars.sign in ["Leo", "Aries"] else (
        "patient and grounded" if mars.sign in ["Taurus", "Capricorn"] else (
        "clever and flirtatious" if mars.sign == "Gemini" else "fluid and intuitive"))

    emotional_hook = "needs to feel mentally understood before physical closeness" if moon.sign == "Gemini" else (
        "needs emotional safety first" if moon.sign in ["Cancer", "Pisces"] else "values loyalty and sensual comfort")

    # Compose reply
    message = (
        f"Dear {request.name}, based on your Venus in {venus.sign}, you seduce with a {sensual_style} charm. "
        f"Your Mars in {mars.sign} gives you a {drive_style} approach to intimacy. "
        f"Your Moon in {moon.sign} suggests you {emotional_hook}. "
        f"Together, this makes you uniquely attractive when you combine mental connection with your natural charisma."
    )

    return SeductionProfileResponse(name=request.name, message=message)
