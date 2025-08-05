"""Ashtakavarga analysis module for JyotishAI.

Ashtakavarga is an advanced Vedic system that assigns strength points to
planets across the houses.  This simplified module explains the
concept and provides a general interpretation without calculating
individual points.
"""

from fastapi import APIRouter

from models.schemas import ChartRequest, ModuleResult, ModuleName
from services.chart_engine import VedicAstrologyEngine

router = APIRouter()


def analyze_ashtakavarga(chart):
    analysis = (
        "Ashtakavarga divides the zodiac into eightfold point systems for each planet, "
        "evaluating the strength of houses and predicting periods of fortune or challenge.  "
        "In this module, a detailed point calculation is beyond scope; however, the concept emphasises "
        "that planetary strength varies depending on house placement and benefic or malefic influences.  "
        "Practitioners should consult a specialised Ashtakavarga table for precise values and ensure that "
        "remedial measures comply with ethical and legal considerations."
    )
    return analysis


@router.post("", response_model=ModuleResult)
def ashtakavarga_endpoint(request: ChartRequest) -> ModuleResult:
    _chart = VedicAstrologyEngine.from_request(request)
    analysis = analyze_ashtakavarga(_chart)
    return ModuleResult(module=ModuleName.ASHTAKAVARGA, analysis=analysis)