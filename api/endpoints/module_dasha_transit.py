"""Dasha and Transit analysis module for JyotishAI.

This module discusses planetary periods (dashas) and current transits.  It
does not compute exact timelines but provides a general framework for
understanding how these cycles affect legal and professional matters.
"""

from fastapi import APIRouter

from models.schemas import ChartRequest, ModuleResult, ModuleName
from services.chart_engine import VedicAstrologyEngine

router = APIRouter()


def analyze_dasha_transit(chart):
    analysis = (
        "Vimshottari Dasha sequences allocate planetary rulers to periods in one's life, "
        "each bringing unique opportunities and challenges.  Major periods (mahādashas) span several years "
        "and should be evaluated alongside current planetary transits.  Although this module does not compute "
        "specific dates, it reminds practitioners that timing matters when drafting contracts, initiating litigation "
        "or planning strategic moves.  Consultation with an experienced astrologer is recommended for precise cycles, "
        "and any actions must adhere to legal statutes and professional ethics."
    )
    return analysis


@router.post("", response_model=ModuleResult)
def dasha_transit_endpoint(request: ChartRequest) -> ModuleResult:
    _chart = VedicAstrologyEngine.from_request(request)
    analysis = analyze_dasha_transit(_chart)
    return ModuleResult(module=ModuleName.DASHA_TRANSIT, analysis=analysis)