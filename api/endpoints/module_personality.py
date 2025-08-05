"""Personality analysis module for JyotishAI.

This module evaluates the Ascendant (rising sign) to outline core
personality traits.  The analysis is framed in a legal–astrological tone
to reflect traits that may influence professional conduct and
decision‑making.
"""

from fastapi import APIRouter

from models.schemas import ChartRequest, ModuleResult, ModuleName
from services.chart_engine import VedicAstrologyEngine

router = APIRouter()

# Descriptions keyed by zodiac sign for rising sign personality
PERSONALITY_DESCRIPTIONS = {
    "ARIES": (
        "With Aries rising, the individual exhibits dynamism and assertiveness. "
        "There is a pioneering impulse and a readiness to act decisively.  "
        "Such qualities foster leadership and confidence, which can be advantageous "
        "in negotiating, advocating and confronting challenges." 
    ),
    "TAURUS": (
        "A Taurus Ascendant indicates patience, stability and a grounded nature.  "
        "The person values security and material well‑being, often adopting a methodical "
        "approach in professional dealings.  This steadfastness is conducive to building "
        "long‑term, legally sound strategies." 
    ),
    "GEMINI": (
        "Gemini rising suggests adaptability and an intellectual orientation.  "
        "Communication skills are heightened, allowing one to articulate complex issues "
        "and navigate negotiations effectively.  Such agility in thought is beneficial "
        "for interpreting nuanced regulations and advising clients." 
    ),
    "CANCER": (
        "A Cancer Ascendant endows the native with sensitivity and intuition.  "
        "There is a nurturing disposition and a focus on protecting interests.  "
        "This protective instinct translates into diligent oversight of obligations "
        "and a cautious approach to legal matters." 
    ),
    "LEO": (
        "Leo rising confers charisma, generosity and a natural inclination to lead.  "
        "Such individuals seek recognition and may take an authoritative stance in "
        "matters of law and governance.  Their confidence inspires trust, but prudence "
        "is advised to temper pride with due diligence." 
    ),
    "VIRGO": (
        "With Virgo ascending, the personality is analytical, meticulous and service‑oriented.  "
        "Attention to detail is paramount, making for thorough preparation and careful "
        "documentation.  This diligence ensures compliance with regulations and supports "
        "the creation of robust legal frameworks." 
    ),
    "LIBRA": (
        "Libra rising emphasises balance, diplomacy and a desire for fairness.  "
        "Individuals are adept at mediating disputes and crafting equitable agreements.  "
        "This inclination toward harmony fosters cooperative relationships and principled "
        "decision‑making." 
    ),
    "SCORPIO": (
        "A Scorpio Ascendant signals intensity, determination and depth.  "
        "Such people possess keen insight and are unafraid of confronting complex issues.  "
        "They are skilled at uncovering hidden details, which is invaluable when conducting "
        "due diligence and navigating intricate legal frameworks." 
    ),
    "SAGITTARIUS": (
        "Sagittarius rising denotes optimism, a love of learning and an expansive outlook.  "
        "There is a philosophical bent and an interest in broad principles.  These traits "
        "encourage exploration of comparative legal systems and promote a holistic "
        "understanding of jurisprudence." 
    ),
    "CAPRICORN": (
        "With Capricorn on the Ascendant, discipline, ambition and pragmatism are foremost.  "
        "There is a respect for structure and hierarchy, and a determination to achieve "
        "professional recognition.  Such individuals excel at crafting long‑term strategies "
        "and ensuring that agreements are enforceable and compliant." 
    ),
    "AQUARIUS": (
        "Aquarius rising brings originality, humanitarian ideals and a forward‑thinking approach.  "
        "There is an inclination toward innovation and reform.  In a legal context, this may lead "
        "to advocating for progressive policies and leveraging technology to enhance compliance." 
    ),
    "PISCES": (
        "A Pisces Ascendant endows compassion, imagination and adaptability.  "
        "These individuals often rely on intuition and empathy, qualities that enhance their ability "
        "to understand clients' needs.  Care must be taken to ground decisions in established legal "
        "principles to avoid ambiguity." 
    ),
}


def analyze_personality(chart):
    """Return a personality analysis based on the rising sign."""
    asc = chart.asc_sign
    desc = PERSONALITY_DESCRIPTIONS.get(asc, "The Ascendant describes one's outward personality and approach to life.")
    # Frame in a legal tone
    analysis = (
        f"The Ascendant (rising sign) is {asc}.  " + desc + 
        "  These inherent traits influence how the individual interacts with clients, colleagues and the wider community, "
        "which is relevant when advising on legal or commercial matters."
    )
    return analysis


@router.post("", response_model=ModuleResult)
def personality_endpoint(request: ChartRequest) -> ModuleResult:
    """FastAPI endpoint to compute personality analysis."""
    chart = VedicAstrologyEngine.from_request(request)
    analysis = analyze_personality(chart)
    return ModuleResult(module=ModuleName.PERSONALITY, analysis=analysis)