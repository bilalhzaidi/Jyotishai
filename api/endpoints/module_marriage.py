"""Marriage analysis module for JyotishAI.

This module evaluates Venus and Dara Karaka (DK) to provide insight into
relationships and marital tendencies.  It employs a dignified tone
reflecting the importance of commitments in both personal and legal
contexts.
"""

from fastapi import APIRouter

from models.schemas import ChartRequest, ModuleResult, ModuleName
from services.chart_engine import VedicAstrologyEngine
from jyotish_utils.vedic_math import compute_dk, compute_ul

router = APIRouter()

MARRIAGE_DESCRIPTIONS = {
    "ARIES": "Energetic and assertive in relationships. Partners must respect independence and directness.",
    "TAURUS": "Steady and loyal, values stability and comfort in partnerships. Prefers predictable routines and material security.",
    "GEMINI": "Playful and communicative; values mental stimulation. Needs variety and may avoid rigidity in commitments.",
    "CANCER": "Nurturing and protective; seeks emotional security. Family and domestic harmony are central.",
    "LEO": "Warm‑hearted and generous; desires admiration and loyalty. May seek a partner who complements their public image.",
    "VIRGO": "Practical and discerning; tends to be selective. Values service and mutual improvement in relationships.",
    "LIBRA": "Diplomatic and partnership‑oriented; strives for balance and fairness. Relationships are integral to identity.",
    "SCORPIO": "Intense and passionate; seeks deep emotional connection. Trust and transparency are paramount.",
    "SAGITTARIUS": "Freedom‑loving and optimistic; prefers partners who support exploration. Committed to growth and shared ideals.",
    "CAPRICORN": "Serious and responsible; approaches marriage as a long‑term contract. Values structure and mutual ambition.",
    "AQUARIUS": "Independent and unconventional; seeks a partner who respects autonomy. Values friendship and shared ideals.",
    "PISCES": "Romantic and compassionate; needs empathy and understanding. May idealise partners and should maintain realistic expectations.",
}


def analyze_marriage(chart):
    venus = chart.venus_sign
    desc = MARRIAGE_DESCRIPTIONS.get(venus, "Venus indicates approach to love and partnership.")
    dk = compute_dk(chart)
    ul = compute_ul(chart)
    analysis = (
        f"Venus resides in {venus}.  " + desc +
        "  " + dk + "  " + ul +
        "  When entering into marital contracts, careful drafting and clear articulation of expectations are essential "
        "to uphold the rights and responsibilities of both parties."
    )
    return analysis


@router.post("", response_model=ModuleResult)
def marriage_endpoint(request: ChartRequest) -> ModuleResult:
    chart = VedicAstrologyEngine.from_request(request)
    analysis = analyze_marriage(chart)
    return ModuleResult(module=ModuleName.MARRIAGE, analysis=analysis)