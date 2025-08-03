"""
Enhanced Gender-Aware Vedic Astrology Analysis Engine

This module provides comprehensive gender-aware analysis for Vedic astrology readings,
respecting traditional wisdom while being inclusive of all gender identities.
"""

from enum import Enum
from typing import Optional, Dict, Any, List
import logging

logger = logging.getLogger(__name__)

class Gender(Enum):
    """Gender options for astrological analysis"""
    MALE = "male"
    FEMALE = "female"
    NON_BINARY = "non_binary"
    PREFER_NOT_TO_SAY = "prefer_not_to_say"

class GenderAnalysisHelper:
    """
    Helper class for gender-aware astrological analysis.
    
    Provides context-specific enhancements to astrological interpretations
    while maintaining respect for traditional Vedic principles and modern inclusivity.
    """
    
    def __init__(self, gender: Optional[Gender] = None):
        self.gender = gender
        
    def enhance_analysis_with_gender_context(self, base_analysis: str, module_type: str) -> str:
        """
        Enhance base astrological analysis with gender-specific context.
        
        Args:
            base_analysis: The base astrological analysis text
            module_type: Type of analysis (personality, career, marriage, etc.)
            
        Returns:
            Enhanced analysis with gender-aware insights
        """
        if not self.gender or self.gender == Gender.PREFER_NOT_TO_SAY:
            return base_analysis
            
        try:
            gender_context = self._get_gender_specific_context(module_type)
            if not gender_context:
                return base_analysis
                
            enhanced_analysis = f"{base_analysis}\n\n**Gender-Specific Insights:**\n{gender_context}"
            return enhanced_analysis
            
        except Exception as e:
            logger.error(f"Error enhancing analysis with gender context: {e}")
            return base_analysis
    
    def _get_gender_specific_context(self, module_type: str) -> str:
        """Get gender-specific contextual information for different analysis modules."""
        
        context_map = {
            "personality": self._get_personality_context,
            "career": self._get_career_context,
            "marriage": self._get_marriage_context,
            "health": self._get_health_context,
            "children": self._get_children_context,
            "sexuality": self._get_sexuality_context,
            "spirituality": self._get_spirituality_context,
            "compatibility": self._get_compatibility_context
        }
        
        context_func = context_map.get(module_type.lower())
        if context_func:
            return context_func()
        return ""
    
    def _get_personality_context(self) -> str:
        """Gender-specific personality analysis context."""
        contexts = {
            Gender.MALE: """
            Traditional masculine planetary influences may manifest as leadership qualities, 
            assertiveness, and goal-oriented behavior. Mars and Sun positions are particularly 
            significant for expressing masculine energy constructively.
            """,
            Gender.FEMALE: """
            Traditional feminine planetary influences may manifest as intuitive wisdom, 
            nurturing qualities, and emotional intelligence. Moon and Venus positions are 
            particularly significant for expressing feminine energy harmoniously.
            """,
            Gender.NON_BINARY: """
            Your unique gender expression allows for a balanced integration of both 
            traditionally masculine and feminine planetary energies, potentially offering 
            a more holistic approach to personal development and self-expression.
            """
        }
        return contexts.get(self.gender, "").strip()
    
    def _get_career_context(self) -> str:
        """Gender-specific career analysis context."""
        contexts = {
            Gender.MALE: """
            Consider how traditional male professional archetypes (leader, provider, warrior) 
            might manifest in your career path. Jupiter and Mars placements can indicate 
            success in authoritative or competitive fields.
            """,
            Gender.FEMALE: """
            Your professional path may benefit from leveraging traditionally feminine 
            strengths like collaboration, communication, and intuitive decision-making. 
            Venus and Moon positions can guide you toward fulfilling career choices.
            """,
            Gender.NON_BINARY: """
            Your career potential encompasses the full spectrum of professional archetypes, 
            allowing you to pioneer new approaches that transcend traditional gender roles 
            in your chosen field.
            """
        }
        return contexts.get(self.gender, "").strip()
    
    def _get_marriage_context(self) -> str:
        """Gender-specific marriage and relationship context."""
        contexts = {
            Gender.MALE: """
            In traditional Vedic analysis, the 7th house and Venus position indicate your 
            approach to partnership as the masculine partner. Consider how you can balance 
            strength with sensitivity in relationships.
            """,
            Gender.FEMALE: """
            Traditional Vedic marriage analysis focuses on your role as the feminine partner, 
            examining Jupiter (husband significator) and 7th house for partnership dynamics. 
            Your nurturing nature is a key strength in relationships.
            """,
            Gender.NON_BINARY: """
            Your approach to partnership transcends traditional gender roles, allowing for 
            more fluid and egalitarian relationship dynamics. Focus on authentic connection 
            and mutual growth rather than conventional expectations.
            """
        }
        return contexts.get(self.gender, "").strip()
    
    def _get_health_context(self) -> str:
        """Gender-specific health analysis context."""
        contexts = {
            Gender.MALE: """
            Traditional masculine health concerns may include issues related to Mars 
            (energy, accidents, inflammation) and Sun (heart, vitality). Pay attention 
            to stress management and physical activity needs.
            """,
            Gender.FEMALE: """
            Traditional feminine health analysis considers Moon cycles, reproductive health, 
            and hormonal balance. Venus and Moon positions are crucial for understanding 
            your natural health rhythms and needs.
            """,
            Gender.NON_BINARY: """
            Your health profile may require a more individualized approach that doesn't 
            assume traditional gender-based health patterns. Focus on holistic wellness 
            that honors your unique physical and emotional needs.
            """
        }
        return contexts.get(self.gender, "").strip()
    
    def _get_children_context(self) -> str:
        """Gender-specific children and family context."""
        contexts = {
            Gender.MALE: """
            As a father figure, Jupiter's position indicates your approach to guidance, 
            wisdom-sharing, and providing structure. The 5th house shows your connection 
            with children and creative expression.
            """,
            Gender.FEMALE: """
            Traditional analysis of motherhood focuses on Moon (nurturing), 5th house 
            (children), and Jupiter (wisdom). Your maternal instincts and emotional 
            connection with children are key themes.
            """,
            Gender.NON_BINARY: """
            Your approach to children and family may be more flexible, combining various 
            parenting archetypes. You might excel at teaching children to embrace 
            diversity and authentic self-expression.
            """
        }
        return contexts.get(self.gender, "").strip()
    
    def _get_sexuality_context(self) -> str:
        """Gender-specific sexuality analysis context."""
        contexts = {
            Gender.MALE: """
            Traditional masculine sexuality in Vedic astrology relates to Mars energy, 
            passion, and the active principle. The 8th house and Mars-Venus connections 
            indicate your intimate relationship dynamics.
            """,
            Gender.FEMALE: """
            Traditional feminine sexuality connects to Venus, Moon, and the receptive 
            principle. Your sensual nature and emotional intimacy needs are reflected 
            in Venus and 8th house positions.
            """,
            Gender.NON_BINARY: """
            Your sexuality transcends traditional binary expressions, potentially 
            embracing a more fluid and inclusive approach to intimacy and sensual 
            expression that honors your authentic self.
            """
        }
        return contexts.get(self.gender, "").strip()
    
    def _get_spirituality_context(self) -> str:
        """Gender-specific spirituality context."""
        contexts = {
            Gender.MALE: """
            Traditional masculine spiritual paths may emphasize discipline, philosophical 
            study, and structured practices. Jupiter and Ketu positions guide your 
            spiritual evolution and dharmic path.
            """,
            Gender.FEMALE: """
            Traditional feminine spirituality often connects to devotional practices, 
            intuitive wisdom, and heart-centered approaches. Moon and Neptune positions 
            indicate your natural spiritual inclinations.
            """,
            Gender.NON_BINARY: """
            Your spiritual path may integrate diverse traditions and approaches, 
            transcending conventional religious or spiritual gender roles to find 
            a more universal and inclusive connection to the divine.
            """
        }
        return contexts.get(self.gender, "").strip()
    
    def _get_compatibility_context(self) -> str:
        """Gender-specific compatibility analysis context."""
        contexts = {
            Gender.MALE: """
            In compatibility analysis, your masculine energy seeks balance with 
            complementary feminine qualities in a partner. Mars-Venus connections 
            and 7th house dynamics are key factors.
            """,
            Gender.FEMALE: """
            Your feminine energy naturally seeks harmony with masculine qualities 
            in partnership. Venus-Mars interactions and Jupiter's influence on 
            your 7th house indicate ideal partner characteristics.
            """,
            Gender.NON_BINARY: """
            Your compatibility transcends traditional gender dynamics, focusing 
            instead on authentic connection, shared values, and mutual growth 
            regardless of your partner's gender expression.
            """
        }
        return contexts.get(self.gender, "").strip()

def create_gender_aware_analysis(
    base_analysis: str, 
    module_type: str, 
    gender: Optional[str] = None
) -> str:
    """
    Factory function to create gender-aware analysis.
    
    Args:
        base_analysis: Base astrological analysis
        module_type: Type of analysis module
        gender: Gender string (converted to enum)
        
    Returns:
        Enhanced analysis with gender context
    """
    try:
        # Convert string to Gender enum
        gender_enum = None
        if gender:
            gender_map = {
                "male": Gender.MALE,
                "female": Gender.FEMALE,
                "non_binary": Gender.NON_BINARY,
                "prefer_not_to_say": Gender.PREFER_NOT_TO_SAY
            }
            gender_enum = gender_map.get(gender.lower())
        
        analyzer = GenderAnalysisHelper(gender_enum)
        return analyzer.enhance_analysis_with_gender_context(base_analysis, module_type)
        
    except Exception as e:
        logger.error(f"Error in gender-aware analysis creation: {e}")
        return base_analysis

# Compatibility with existing module structure
def enhance_with_gender_context(analysis_dict: Dict[str, Any], gender: Optional[str] = None) -> Dict[str, Any]:
    """
    Enhance existing analysis dictionary with gender-aware context.
    
    Args:
        analysis_dict: Dictionary containing analysis results
        gender: Optional gender string
        
    Returns:
        Enhanced analysis dictionary
    """
    if not gender or gender == "prefer_not_to_say":
        return analysis_dict
    
    enhanced_dict = analysis_dict.copy()
    
    # Enhance the summary if present
    if "analysis" in enhanced_dict:
        module_type = enhanced_dict.get("module", "general")
        enhanced_dict["analysis"] = create_gender_aware_analysis(
            enhanced_dict["analysis"], 
            module_type, 
            gender
        )
    
    # Add gender metadata
    enhanced_dict["gender_context"] = {
        "gender": gender,
        "enhanced": True,
        "respects_preference": True
    }
    
    return enhanced_dict