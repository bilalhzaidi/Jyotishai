"""Health analysis module for JyotishAI.

This module evaluates general vitality and constitutional tendencies based
on the Ascendant, Sun and Moon.  The insights are rooted in Vedic
astrology and include a disclaimer that the information provided does
not constitute medical advice.
"""

from fastapi import APIRouter

from models.schemas import ChartRequest, ModuleResult, ModuleName
from services.chart_engine import VedicAstrologyEngine

router = APIRouter()

HEALTH_DESCRIPTIONS = {
    "ARIES": "Generally robust but prone to head ailments or fevers. Needs to manage stress and avoid impulsive injuries.",
    "TAURUS": "Strong constitution yet may struggle with throat and neck issues. Moderate exercise and diet are beneficial.",
    "GEMINI": "Nervous system is sensitive; respiratory concerns may arise. Regular rest and mindful breathing support health.",
    "CANCER": "Stomach and chest can be vulnerable; emotional wellbeing directly affects physical health. Balanced diet is key.",
    "LEO": "Heart and back require attention; maintaining cardiovascular health is important. Avoid overexertion.",
    "VIRGO": "Digestive system is delicate; food sensitivities are possible. Hygiene and routine aid wellbeing.",
    "LIBRA": "Kidneys and lower back may be weak points. Adequate hydration and posture awareness are recommended.",
    "SCORPIO": "Reproductive and eliminative systems need care; stress management is vital to prevent chronic issues.",
    "SAGITTARIUS": "Hips, thighs and liver can be areas of concern. Regular exercise and moderation in diet are advised.",
    "CAPRICORN": "Bones, teeth and joints are sensitive; proper nutrition and posture help maintain strength.",
    "AQUARIUS": "Circulatory system and ankles could be vulnerable. Ensuring good circulation and flexibility is beneficial.",
    "PISCES": "Feet and lymphatic system require attention; immune system can fluctuate. Gentle exercise and boundaries promote health.",
}


def analyze_health(chart):
    asc = chart.asc_sign
    desc = HEALTH_DESCRIPTIONS.get(asc, "The Ascendant influences general vitality and constitutional tendencies.")
    analysis = (
        f"Rising sign {asc} suggests: " + desc +
        "  This analysis focuses on constitutional strengths and weaknesses from a Vedic perspective."
        "\n\nThis content is for informational purposes only and does not constitute medical advice."
    )
    return analysis


@router.post("", response_model=ModuleResult)
def health_endpoint(request: ChartRequest) -> ModuleResult:
    chart = VedicAstrologyEngine.from_request(request)
    analysis = analyze_health(chart)
    return ModuleResult(module=ModuleName.HEALTH, analysis=analysis)