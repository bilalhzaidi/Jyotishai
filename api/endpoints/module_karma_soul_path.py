"""Karma and Soul Path analysis for JyotishAI.

This module interprets the North Node (Rahu) to illuminate karmic lessons
and spiritual direction.  The language emphasises growth and ethical
development.
"""

from fastapi import APIRouter

from models.schemas import ChartRequest, ModuleResult, ModuleName
from services.chart_engine import VedicAstrologyEngine

router = APIRouter()

KARMA_DESCRIPTIONS = {
    "ARIES": "Learning to assert oneself and embrace independence without selfishness.",
    "TAURUS": "Developing stability, patience and an appreciation for the material world.",
    "GEMINI": "Cultivating communication, curiosity and adaptability.",
    "CANCER": "Fostering emotional intelligence, nurturing and secure attachments.",
    "LEO": "Expressing creativity, leadership and self‑confidence without arrogance.",
    "VIRGO": "Perfecting skills, service and attention to detail while avoiding perfectionism.",
    "LIBRA": "Balancing self with others, promoting fairness and harmonious partnerships.",
    "SCORPIO": "Embracing transformation, depth and shared resources responsibly.",
    "SAGITTARIUS": "Seeking truth, wisdom and expansion while honouring ethical principles.",
    "CAPRICORN": "Assuming responsibility, discipline and building enduring structures.",
    "AQUARIUS": "Championing innovation, humanitarianism and collective ideals.",
    "PISCES": "Surrendering to compassion, spirituality and universal understanding.",
}


def analyze_karma(chart):
    rahu = chart.rahu_sign
    desc = KARMA_DESCRIPTIONS.get(rahu, "The North Node signifies the direction of growth and karmic lessons.")
    analysis = (
        f"Rahu (North Node) is placed in {rahu}.  " + desc +
        "  Pursuing this path conscientiously supports ethical evolution and informs decisions that align with higher principles."
    )
    return analysis


@router.post("", response_model=ModuleResult)
def karma_endpoint(request: ChartRequest) -> ModuleResult:
    chart = VedicAstrologyEngine.from_request(request)
    analysis = analyze_karma(chart)
    return ModuleResult(module=ModuleName.KARMA_SOUL_PATH, analysis=analysis)