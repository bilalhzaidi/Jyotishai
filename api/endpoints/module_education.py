"""Education analysis module for JyotishAI.

This module considers Mercury's sign to describe learning style and
educational tendencies.  Mercury symbolises intellect, analysis and
communication, which are critical in legal education and practice.
"""

from fastapi import APIRouter

from models.schemas import ChartRequest, ModuleResult, ModuleName
from services.chart_engine import VedicAstrologyEngine

router = APIRouter()

EDUCATION_DESCRIPTIONS = {
    "ARIES": "Quick to grasp concepts, prefers direct and action‑oriented learning. Competitive academic environments suit this sign.",
    "TAURUS": "Learns through steady persistence and practical application. Values tangible results and may prefer structured curricula.",
    "GEMINI": "Possesses a versatile mind and thrives on variety. Enjoys debate, research and interdisciplinary studies.",
    "CANCER": "Sensitive and intuitive, may learn best in supportive settings. Has a good memory and excels in subjects tied to history or law of the land.",
    "LEO": "Confident and expressive, enjoys being centre stage. Benefits from leadership roles in study groups and thrives on recognition.",
    "VIRGO": "Analytical and detail‑oriented. Excels in research, drafting and precise interpretation of statutes.",
    "LIBRA": "Seeks balance and fairness in knowledge. Enjoys collaborative learning and excels in subjects requiring diplomacy and negotiation.",
    "SCORPIO": "Intense and investigative. Drawn to research in hidden or complex matters such as taxation, corporate law or psychology.",
    "SAGITTARIUS": "Loves philosophy and big ideas. Prefers broad, principle‑based education and may engage in comparative law studies.",
    "CAPRICORN": "Disciplined and goal‑oriented. Approaches study methodically and values credentials and authority in educational institutions.",
    "AQUARIUS": "Innovative and independent. Drawn to unconventional subjects and may excel in technology and modern legal reforms.",
    "PISCES": "Imaginative and empathetic. Benefits from creative approaches and may gravitate toward humanitarian or artistic disciplines.",
}


def analyze_education(chart):
    mercury = chart.mercury_sign
    desc = EDUCATION_DESCRIPTIONS.get(mercury, "Mercury's placement sheds light on how one processes information and communicates.")
    analysis = (
        f"Mercury is in {mercury}.  " + desc +
        "  This influences the preferred modes of study and the capacity to interpret legal texts."
    )
    return analysis


@router.post("", response_model=ModuleResult)
def education_endpoint(request: ChartRequest) -> ModuleResult:
    chart = VedicAstrologyEngine.from_request(request)
    analysis = analyze_education(chart)
    return ModuleResult(module=ModuleName.EDUCATION, analysis=analysis)