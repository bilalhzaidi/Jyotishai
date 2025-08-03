"""Spirituality analysis module for JyotishAI.

This module interprets the South Node (Ketu) to describe spiritual
inclinations, detachment and areas of innate mastery.  It also
addresses ethical and legal implications of spiritual beliefs.
"""

from fastapi import APIRouter

from models.schemas import ChartRequest, ModuleResult, ModuleName
from services.chart_engine import VedicAstrologyEngine

router = APIRouter()

SPIRIT_DESCRIPTIONS = {
    "ARIES": "Innate courage and self‑reliance in spiritual pursuits; may benefit from cultivating cooperation.",
    "TAURUS": "Natural sense of stability and appreciation for the material; needs to detach from excessive attachment.",
    "GEMINI": "Keen intellect and curiosity; may need to quiet the mind for deeper insight.",
    "CANCER": "Strong emotional and intuitive connection; releasing past attachments enhances growth.",
    "LEO": "Confident in creative expression; learning humility deepens spiritual understanding.",
    "VIRGO": "Mastery of service and detail; must avoid over‑analysis and accept imperfection.",
    "LIBRA": "Innate sense of fairness; personal growth comes from developing self‑reliance.",
    "SCORPIO": "Strong intuitive power; spiritual evolution involves letting go of control.",
    "SAGITTARIUS": "Natural wisdom and optimism; grounding expectations cultivates inner peace.",
    "CAPRICORN": "Innate discipline and practicality; embracing vulnerability enriches spirituality.",
    "AQUARIUS": "Humanitarian ideals; must balance detachment with personal connection.",
    "PISCES": "Deep compassion and imagination; discernment and boundaries support spiritual wellbeing.",
}


def analyze_spirituality(chart):
    ketu = chart.ketu_sign
    desc = SPIRIT_DESCRIPTIONS.get(ketu, "Ketu signifies spiritual detachment and past life mastery.")
    analysis = (
        f"Ketu (South Node) occupies {ketu}.  " + desc +
        "  Acknowledging these tendencies aids in ethical decision‑making and fosters spiritual balance without neglecting worldly responsibilities."
    )
    return analysis


@router.post("", response_model=ModuleResult)
def spirituality_endpoint(request: ChartRequest) -> ModuleResult:
    chart = VedicAstrologyEngine.from_request(request)
    analysis = analyze_spirituality(chart)
    return ModuleResult(module=ModuleName.SPIRITUALITY, analysis=analysis)