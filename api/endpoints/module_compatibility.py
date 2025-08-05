"""Compatibility analysis module for JyotishAI.

This module compares two natal charts to evaluate relationship dynamics.
It assesses elemental harmony, Moon and Venus compatibility, and karmic
connections (Rahu–Ketu axis).  Actionable guidance is provided for
navigating strengths and challenges.  A disclaimer reminds users that
astrological compatibility is a guide and not a determinant of
relationship outcomes.
"""

from fastapi import APIRouter, HTTPException

from models.schemas import ChartRequest, ModuleResult, ModuleName
from services.chart_engine import VedicAstrologyEngine

router = APIRouter()

ELEMENTS = {
    "ARIES": "Fire",
    "LEO": "Fire",
    "SAGITTARIUS": "Fire",
    "TAURUS": "Earth",
    "VIRGO": "Earth",
    "CAPRICORN": "Earth",
    "GEMINI": "Air",
    "LIBRA": "Air",
    "AQUARIUS": "Air",
    "CANCER": "Water",
    "SCORPIO": "Water",
    "PISCES": "Water",
}


def element_compat(e1: str, e2: str) -> str:
    if e1 == e2:
        return "high"
    # Complementary pairs: Fire-Air, Earth-Water
    if (e1 == "Fire" and e2 == "Air") or (e1 == "Air" and e2 == "Fire"):
        return "medium-high"
    if (e1 == "Earth" and e2 == "Water") or (e1 == "Water" and e2 == "Earth"):
        return "medium-high"
    return "low"


def analyze_compatibility(chart1, chart2):
    # Basic elemental compatibility
    elem1 = ELEMENTS.get(chart1.asc_sign, "")
    elem2 = ELEMENTS.get(chart2.asc_sign, "")
    compat_level = element_compat(elem1, elem2)
    elem_text = {
        "high": "strong elemental harmony", 
        "medium-high": "complementary elements that foster growth", 
        "low": "contrasting elements that require conscious adjustment"
    }.get(compat_level, "variable elemental dynamics")
    # Moon and Venus interplay
    moon_match = element_compat(ELEMENTS.get(chart1.moon_sign, ""), ELEMENTS.get(chart2.moon_sign, ""))
    venus_match = element_compat(ELEMENTS.get(chart1.venus_sign, ""), ELEMENTS.get(chart2.venus_sign, ""))
    # Rahu-Ketu karmic axis interplay: if chart1's Rahu sign equals chart2's Ketu sign etc.
    karmic_tie = False
    if chart1.rahu_sign == chart2.ketu_sign or chart2.rahu_sign == chart1.ketu_sign:
        karmic_tie = True
    # Compose analysis
    analysis_parts = []
    analysis_parts.append(
        f"Elemental compatibility between Ascendants: {elem_text}."
    )
    analysis_parts.append(
        f"Moon sign interplay suggests emotional compatibility is {moon_match.replace('-', ' ')}."
    )
    analysis_parts.append(
        f"Venus sign interaction indicates romantic attraction is {venus_match.replace('-', ' ')}."
    )
    if karmic_tie:
        analysis_parts.append(
            "A significant Rahu–Ketu alignment points to karmic lessons and past‑life connections that demand conscious resolution."
        )
    else:
        analysis_parts.append(
            "Rahu–Ketu axis does not show a direct overlap, suggesting fewer karmic entanglements."
        )
    analysis_parts.append(
        "Effective relationship management involves honouring each other's strengths, communicating openly and addressing areas of tension proactively."
    )
    analysis_parts.append(
        "\n\nThis content is for informational purposes only and does not constitute medical or psychological advice."
    )
    return " ".join(analysis_parts)


@router.post("", response_model=ModuleResult)
def compatibility_endpoint(request: ChartRequest) -> ModuleResult:
    # Validate that second person fields are provided
    if not all([
        request.second_name,
        request.second_birth_date,
        request.second_birth_time,
        request.second_location,
        request.second_utc_offset is not None,
    ]):
        raise HTTPException(status_code=400, detail="Second person details are required for compatibility analysis.")
    chart1 = VedicAstrologyEngine.from_request(request)
    # Build ChartRequest for second person using same modules (not used)
    second_req = ChartRequest(
        name=request.second_name,
        birth_date=request.second_birth_date,
        birth_time=request.second_birth_time,
        location=request.second_location,
        utc_offset=request.second_utc_offset,
        modules=[]
    )
    chart2 = VedicAstrologyEngine.from_request(second_req)
    analysis = analyze_compatibility(chart1, chart2)
    return ModuleResult(module=ModuleName.COMPATIBILITY, analysis=analysis)