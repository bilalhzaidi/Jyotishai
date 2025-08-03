"""Chronic disease indicators module for JyotishAI.

This module offers an astrological perspective on potential long‑term
health challenges, considering Saturn, the 6th house and karmic
implications.  It provides diagnostic‑style insights and underscores
that professional medical consultation is necessary.
"""

from fastapi import APIRouter

from models.schemas import ChartRequest, ModuleResult, ModuleName
from services.chart_engine import VedicAstrologyEngine

router = APIRouter()

CHRONIC_DESCRIPTIONS = {
    "ARIES": "Possible vulnerability to migraines and inflammatory conditions. Long‑term management of stress and blood pressure is advisable.",
    "TAURUS": "Throat and thyroid conditions could become chronic; monitoring metabolic health is important.",
    "GEMINI": "Respiratory and nervous disorders may persist if neglected. Sustained mental balance aids recovery.",
    "CANCER": "Digestive and reproductive issues can become prolonged; emotional processing prevents somatisation.",
    "LEO": "Heart and spinal ailments require long‑term care. Maintaining cardiovascular health mitigates risk.",
    "VIRGO": "Chronic digestive disturbances or intestinal disorders are possible; consistent diet and hygiene help.",
    "LIBRA": "Renal and lower back problems may recur; balance fluids and practice ergonomic care.",
    "SCORPIO": "Endocrine and reproductive systems can present persistent challenges; regular screenings are recommended.",
    "SAGITTARIUS": "Hepatic and sciatic issues may persist; moderation in alcohol and exercise protects health.",
    "CAPRICORN": "Arthritis, dental or skeletal degenerative conditions are possible; calcium and vitamin D support bones.",
    "AQUARIUS": "Circulatory and neurological disorders may become chronic; promote circulation and nerve health.",
    "PISCES": "Immunity and lymphatic issues could linger; maintaining boundaries and holistic practices aid resilience.",
}


def analyze_chronic_disease(chart):
    saturn = chart.saturn_sign
    desc = CHRONIC_DESCRIPTIONS.get(saturn, "Saturn's placement offers clues about long‑term health karma.")
    analysis = (
        f"Saturn in {saturn} indicates: " + desc +
        "  When Saturn aspects the 6th house or its lord, there may be a predisposition towards chronic conditions requiring prolonged management."
        "\n\nThis content is for informational purposes only and does not constitute medical advice."
    )
    return analysis


@router.post("", response_model=ModuleResult)
def chronic_disease_endpoint(request: ChartRequest) -> ModuleResult:
    chart = VedicAstrologyEngine.from_request(request)
    analysis = analyze_chronic_disease(chart)
    return ModuleResult(module=ModuleName.CHRONIC, analysis=analysis)