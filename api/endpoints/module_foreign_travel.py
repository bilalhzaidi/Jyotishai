"""Foreign travel analysis module for JyotishAI.

This module uses Jupiter's sign to infer tendencies toward long‑distance
journeys, overseas opportunities and the legal implications of travel.
"""

from fastapi import APIRouter

from models.schemas import ChartRequest, ModuleResult, ModuleName
from services.chart_engine import VedicAstrologyEngine

router = APIRouter()

TRAVEL_DESCRIPTIONS = {
    "ARIES": "Prone to spontaneous journeys and pioneering exploration.",
    "TAURUS": "Prefers comfortable travel and may seek financial justification for trips.",
    "GEMINI": "Enjoys frequent short trips and gains knowledge through diverse experiences.",
    "CANCER": "Travel may be motivated by family or emotional ties; seeks safety and familiarity.",
    "LEO": "Travels with flair and seeks recognition; may journey for performance or leadership roles.",
    "VIRGO": "Plans meticulously; combines travel with study or work; attentive to legal documentation.",
    "LIBRA": "Seeks cultural refinement and balance; enjoys travel with partners or groups.",
    "SCORPIO": "Pursues transformative journeys; drawn to mysterious or hidden places.",
    "SAGITTARIUS": "Innately inclined to travel; seeks adventure, philosophy and cross‑cultural exchange.",
    "CAPRICORN": "Travels for career advancement or long‑term goals; mindful of legal obligations abroad.",
    "AQUARIUS": "Interested in progressive causes; travels to innovative or humanitarian destinations.",
    "PISCES": "Attracted to spiritual retreats or artistic destinations; travels may be inspired by compassion.",
}


def analyze_foreign_travel(chart):
    jupiter = chart.jupiter_sign
    desc = TRAVEL_DESCRIPTIONS.get(jupiter, "Jupiter represents expansion and long‑distance travel.")
    analysis = (
        f"Jupiter is in {jupiter}.  " + desc +
        "  When travelling internationally, compliance with immigration laws and awareness of jurisdictional differences are crucial."
    )
    return analysis


@router.post("", response_model=ModuleResult)
def foreign_travel_endpoint(request: ChartRequest) -> ModuleResult:
    chart = VedicAstrologyEngine.from_request(request)
    analysis = analyze_foreign_travel(chart)
    return ModuleResult(module=ModuleName.FOREIGN_TRAVEL, analysis=analysis)