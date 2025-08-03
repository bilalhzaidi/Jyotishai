"""Body type analysis module for JyotishAI.

This module associates the Ascendant sign with general physical
characteristics.  The descriptions are indicative and should not be
taken as medical advice.
"""

from fastapi import APIRouter

from models.schemas import ChartRequest, ModuleResult, ModuleName
from services.chart_engine import VedicAstrologyEngine

router = APIRouter()

BODY_DESCRIPTIONS = {
    "ARIES": "Typically athletic build with a prominent head or facial features.",
    "TAURUS": "Sturdy frame with a strong neck and pleasing facial features.",
    "GEMINI": "Slender and agile with expressive hands and quick movements.",
    "CANCER": "Rounder features with a tendency toward a full face and chest.",
    "LEO": "Robust physique with a regal bearing and thick hair.",
    "VIRGO": "Lean and refined with delicate facial features and clear skin.",
    "LIBRA": "Balanced proportions with an attractive appearance and graceful posture.",
    "SCORPIO": "Intense eyes with a magnetic presence; may have a well‑defined physique.",
    "SAGITTARIUS": "Tall or long‑limbed with an athletic build and open expression.",
    "CAPRICORN": "Angular features with a slender and bony frame; disciplined appearance.",
    "AQUARIUS": "Unique or striking features with a slim build and unconventional style.",
    "PISCES": "Soft features with a tendency towards fluidity in physique and expression.",
}


def analyze_body_type(chart):
    asc = chart.asc_sign
    desc = BODY_DESCRIPTIONS.get(asc, "The Ascendant influences physical appearance and constitution.")
    analysis = (
        f"The rising sign is {asc}.  " + desc +
        "  This information may be relevant when advising on occupational suitability or health matters; however, it does not constitute medical advice."
    )
    return analysis


@router.post("", response_model=ModuleResult)
def body_type_endpoint(request: ChartRequest) -> ModuleResult:
    chart = VedicAstrologyEngine.from_request(request)
    analysis = analyze_body_type(chart)
    return ModuleResult(module=ModuleName.BODY_TYPE, analysis=analysis)