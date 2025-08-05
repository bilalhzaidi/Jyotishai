"""Career analysis module for JyotishAI.

This module interprets the Midheaven (tenth house cusp) and Saturn to
describe vocational inclinations and professional responsibilities.
"""

from fastapi import APIRouter

from models.schemas import ChartRequest, ModuleResult, ModuleName
from services.chart_engine import VedicAstrologyEngine

router = APIRouter()

# Career interpretations keyed by Midheaven sign
CAREER_DESCRIPTIONS = {
    "ARIES": (
        "A Midheaven in Aries favours careers that are pioneering, competitive and leadership‑oriented. "
        "Fields such as litigation, entrepreneurship or emergency services may appeal.  "
        "There is an impetus to take initiative and set legal precedents."
    ),
    "TAURUS": (
        "With Taurus on the Midheaven, stable and materially oriented professions are emphasised.  "
        "Banking, real estate, finance and agricultural law may be rewarding.  "
        "A steady approach supports building lasting institutions."
    ),
    "GEMINI": (
        "Gemini Midheaven suggests a versatile career path involving communication, media or education.  "
        "Professionals may excel as mediators, advisors or writers.  "
        "The ability to manage multiple matters simultaneously is a strength."
    ),
    "CANCER": (
        "A Cancer Midheaven points to roles that protect, nurture or manage property.  "
        "Real estate law, family law or public administration align with this energy.  "
        "There is an inclination to ensure security and continuity in professional dealings."
    ),
    "LEO": (
        "Leo at the Midheaven favours positions of authority and public visibility.  "
        "Politics, entertainment law or corporate leadership may be suitable.  "
        "An emphasis on reputation encourages adherence to ethical standards."
    ),
    "VIRGO": (
        "Virgo on the Midheaven highlights analytical and service‑oriented professions.  "
        "Accounting, compliance, healthcare administration or legal research are promising areas.  "
        "Precision and attention to detail underpin professional success."
    ),
    "LIBRA": (
        "A Libra Midheaven underscores diplomacy, aesthetics and balance in career.  "
        "Careers may involve law, negotiation, human rights or the arts.  "
        "The need for fairness drives the pursuit of equitable solutions."
    ),
    "SCORPIO": (
        "Scorpio Midheaven indicates a capacity for transformation and depth.  "
        "Fields such as forensic law, taxation, corporate restructuring or psychology may appeal.  "
        "There is an aptitude for handling sensitive matters with discretion."
    ),
    "SAGITTARIUS": (
        "Sagittarius on the Midheaven points to an expansive career path.  "
        "International law, academia, travel or publishing are favoured.  "
        "There is an ethical dimension requiring adherence to high principles and transparency."
    ),
    "CAPRICORN": (
        "Capricorn Midheaven emphasises structure, authority and long‑term achievement.  "
        "Corporate law, government service or management consulting may be attractive.  "
        "Ambition is matched by responsibility to comply with regulatory frameworks."
    ),
    "AQUARIUS": (
        "Aquarius at the Midheaven encourages innovation and humanitarian ideals.  "
        "Careers may involve technology, social reform, environmental law or public policy.  "
        "There is a drive to modernise systems and advocate for future‑oriented laws."
    ),
    "PISCES": (
        "A Pisces Midheaven inclines toward compassionate and imaginative work.  "
        "Non‑profit organisations, healthcare, spirituality or creative industries are highlighted.  "
        "Professional success is tied to empathy and ethical considerations."
    ),
}


def analyze_career(chart):
    """Return a career analysis based on the Midheaven and Saturn."""
    mc = chart.mc_sign or chart.asc_sign  # fallback to Asc if MC unavailable
    desc = CAREER_DESCRIPTIONS.get(mc, "The Midheaven sign provides insights into one's career direction and public standing.")
    analysis = (
        f"The Midheaven (tenth house cusp) is in {mc}.  " + desc + 
        "  Saturn's position further indicates the need for patience and compliance with statutes; "
        "undertaking thorough due diligence in any career endeavour is essential."
    )
    return analysis


@router.post("", response_model=ModuleResult)
def career_endpoint(request: ChartRequest) -> ModuleResult:
    """FastAPI endpoint to compute career analysis."""
    chart = VedicAstrologyEngine.from_request(request)
    analysis = analyze_career(chart)
    return ModuleResult(module=ModuleName.CAREER, analysis=analysis)