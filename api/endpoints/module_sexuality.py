"""Sexuality analysis module for JyotishAI.

This module interprets Mars and Venus to describe sexual energy and
approach to intimacy.  The language remains respectful and mindful of
ethical considerations.
"""

from fastapi import APIRouter

from models.schemas import ChartRequest, ModuleResult, ModuleName
from services.chart_engine import VedicAstrologyEngine

router = APIRouter()

SEXUALITY_DESCRIPTIONS = {
    "ARIES": "Direct and ardent; tends toward impulsive passion.",
    "TAURUS": "Sensual and steady; values physical comfort and loyalty.",
    "GEMINI": "Curious and versatile; enjoys mental stimulation in intimacy.",
    "CANCER": "Emotional and protective; seeks secure and nurturing encounters.",
    "LEO": "Dramatic and generous; desires admiration and expressive romance.",
    "VIRGO": "Practical and modest; attentive to details and mutual wellbeing.",
    "LIBRA": "Balanced and refined; seeks harmony and aesthetics in intimacy.",
    "SCORPIO": "Intense and transformative; craves deep connection and loyalty.",
    "SAGITTARIUS": "Adventurous and uninhibited; values freedom and exploration.",
    "CAPRICORN": "Controlled and enduring; prefers mature and goal‑oriented relationships.",
    "AQUARIUS": "Unconventional and detached; appreciates novelty and intellectual connection.",
    "PISCES": "Imaginative and compassionate; seeks spiritual or emotional union.",
}


def analyze_sexuality(chart):
    mars = chart.mars_sign
    desc = SEXUALITY_DESCRIPTIONS.get(mars, "Mars describes drive and passion.")
    analysis = (
        f"Mars is positioned in {mars}.  " + desc +
        "  Venus's influence modifies this expression, and consent along with mutual respect remain paramount."
    )
    return analysis


@router.post("", response_model=ModuleResult)
def sexuality_endpoint(request: ChartRequest) -> ModuleResult:
    chart = VedicAstrologyEngine.from_request(request)
    analysis = analyze_sexuality(chart)
    return ModuleResult(module=ModuleName.SEXUALITY, analysis=analysis)