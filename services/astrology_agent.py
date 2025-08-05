"""
Advanced Astrology Agent for Enhanced Analysis

This module provides an intelligent astrology analysis agent that can process
multiple chart types, provide personalized insights, and generate comprehensive
reports with gender-aware considerations.
"""

import logging
from typing import Dict, Any, List, Optional, Tuple
from datetime import datetime
import json
from dataclasses import dataclass

from .gender_analysis import GenderAnalysisHelper, Gender, create_gender_aware_analysis

logger = logging.getLogger(__name__)

@dataclass
class BirthData:
    """Birth data structure for astrological calculations."""
    name: str
    date: str  # YYYY-MM-DD format
    time: str  # HH:MM format
    location: str
    latitude: float
    longitude: float
    timezone: str
    gender: Optional[str] = None

@dataclass
class AnalysisRequest:
    """Request structure for astrological analysis."""
    birth_data: BirthData
    modules: List[str]
    report_type: str = "comprehensive"
    include_recommendations: bool = True
    include_remedies: bool = True

class AstrologyAgent:
    """
    Advanced astrology analysis agent with gender-aware capabilities.
    
    This agent orchestrates various astrological calculations and provides
    comprehensive analysis with personalized insights.
    """
    
    def __init__(self):
        self.supported_modules = [
            "personality",
            "career",
            "marriage", 
            "health",
            "children",
            "finance",
            "education",
            "spirituality",
            "compatibility",
            "timing",
            "remedies"
        ]
        
    def analyze(self, request: AnalysisRequest) -> Dict[str, Any]:
        """
        Perform comprehensive astrological analysis.
        
        Args:
            request: Analysis request with birth data and preferences
            
        Returns:
            Comprehensive analysis results
        """
        try:
            logger.info(f"Starting analysis for {request.birth_data.name}")
            
            # Initialize results structure
            results = {
                "birth_data": self._serialize_birth_data(request.birth_data),
                "analysis_timestamp": datetime.now().isoformat(),
                "modules_analyzed": request.modules,
                "gender_aware": bool(request.birth_data.gender),
                "analyses": {},
                "summary": "",
                "recommendations": [],
                "remedies": []
            }
            
            # Perform analysis for each requested module
            for module in request.modules:
                if module in self.supported_modules:
                    module_result = self._analyze_module(
                        module, 
                        request.birth_data
                    )
                    results["analyses"][module] = module_result
                else:
                    logger.warning(f"Unsupported module requested: {module}")
            
            # Generate overall summary
            results["summary"] = self._generate_summary(results["analyses"], request.birth_data)
            
            # Add recommendations if requested
            if request.include_recommendations:
                results["recommendations"] = self._generate_recommendations(
                    results["analyses"], 
                    request.birth_data
                )
            
            # Add remedies if requested
            if request.include_remedies:
                results["remedies"] = self._generate_remedies(
                    results["analyses"], 
                    request.birth_data
                )
            
            logger.info(f"Analysis completed for {request.birth_data.name}")
            return results
            
        except Exception as e:
            logger.error(f"Error in astrological analysis: {e}")
            return self._create_error_response(str(e))
    
    def _analyze_module(self, module: str, birth_data: BirthData) -> Dict[str, Any]:
        """Analyze a specific astrological module."""
        try:
            # Get base analysis (this would interface with actual calculation engine)
            base_analysis = self._get_base_analysis(module, birth_data)
            
            # Enhance with gender-aware context if applicable
            if birth_data.gender:
                enhanced_analysis = create_gender_aware_analysis(
                    base_analysis["analysis"],
                    module,
                    birth_data.gender
                )
                base_analysis["analysis"] = enhanced_analysis
                base_analysis["gender_enhanced"] = True
            
            return base_analysis
            
        except Exception as e:
            logger.error(f"Error analyzing module {module}: {e}")
            return {
                "module": module,
                "analysis": f"Error analyzing {module}: {str(e)}",
                "confidence": 0.0,
                "error": True
            }
    
    def _get_base_analysis(self, module: str, birth_data: BirthData) -> Dict[str, Any]:
        """Get base astrological analysis for a module."""
        # This is a placeholder that would interface with actual astrological calculation engines
        # In a real implementation, this would call the appropriate module analysis functions
        
        module_analyses = {
            "personality": self._analyze_personality,
            "career": self._analyze_career,
            "marriage": self._analyze_marriage,
            "health": self._analyze_health,  
            "children": self._analyze_children,
            "finance": self._analyze_finance,
            "education": self._analyze_education,
            "spirituality": self._analyze_spirituality,
            "compatibility": self._analyze_compatibility,
            "timing": self._analyze_timing,
            "remedies": self._analyze_remedies
        }
        
        analyzer = module_analyses.get(module, self._default_analysis)
        return analyzer(birth_data)
    
    def _analyze_personality(self, birth_data: BirthData) -> Dict[str, Any]:
        """Analyze personality traits and characteristics."""
        return {
            "module": "personality",
            "analysis": f"""Based on the birth chart for {birth_data.name}, the personality analysis reveals:

The Ascendant (Lagna) represents the core personality and how others perceive you. Your rising sign influences your natural approach to life, your physical appearance, and your immediate reactions to situations.

The Moon sign represents your emotional nature, instinctive responses, and subconscious patterns. This placement shows how you process emotions and what provides you with emotional security.

The Sun sign represents your soul's purpose, leadership qualities, and the path to self-realization. This placement indicates your natural authority and the areas where you can shine.

Key personality traits include natural leadership abilities, strong emotional intelligence, and a balanced approach to both material and spiritual pursuits. There's an inherent desire for harmony and justice, combined with practical wisdom in decision-making.""",
            "confidence": 0.8,
            "key_points": [
                "Natural leadership qualities",
                "Strong emotional intelligence", 
                "Balanced material-spiritual approach",
                "Desire for harmony and justice"
            ]
        }
    
    def _analyze_career(self, birth_data: BirthData) -> Dict[str, Any]:
        """Analyze career prospects and professional life."""
        return {
            "module": "career", 
            "analysis": f"""Career analysis for {birth_data.name} reveals:

The 10th house (Karma Bhava) represents career, reputation, and public life. This house shows your natural career inclinations and how you achieve success in professional endeavors.

The strength and placement of planets in career-related houses indicate the most suitable professional paths. Jupiter represents wisdom-based careers, Mars indicates action-oriented fields, Venus suggests creative or relationship-based work, and Mercury shows communication or analytical roles.

The analysis suggests strong potential in leadership roles, consulting, education, or spiritual guidance. There's natural ability to inspire and guide others, combined with practical skills for managing resources and people.

Career growth periods are indicated by favorable planetary transits, particularly those affecting the 10th house, Sun, and Mars. Professional success comes through genuine service and ethical leadership rather than aggressive competition.""",
            "confidence": 0.8,
            "key_points": [
                "Strong leadership potential",
                "Suitable for consulting/guidance roles",
                "Success through service and ethics",
                "Natural ability to inspire others"
            ]
        }
    
    def _analyze_marriage(self, birth_data: BirthData) -> Dict[str, Any]:
        """Analyze marriage and partnership prospects."""
        return {
            "module": "marriage",
            "analysis": f"""Marriage and partnership analysis for {birth_data.name}:

The 7th house represents marriage, partnerships, and how you relate to others in committed relationships. Venus is the significator for love and relationships, while Jupiter represents the wisdom aspect of partnership.

Partnership compatibility depends on emotional harmony (Moon), values alignment (Venus), and spiritual connection (Jupiter). The ideal partner would complement your natural qualities while sharing similar life goals and values.

Marriage timing is influenced by Venus and Jupiter transits, particularly when they favorably aspect the 7th house or its lord. The analysis suggests potential for a harmonious, growth-oriented partnership based on mutual respect and shared spiritual interests.

Relationship success comes through open communication, emotional support, and maintaining individual growth within the partnership. Balance between independence and togetherness is key to long-term happiness.""",
            "confidence": 0.7,
            "key_points": [
                "Potential for harmonious partnership",
                "Importance of shared values",
                "Growth-oriented relationship dynamics",
                "Balance of independence and togetherness"
            ]
        }
    
    def _analyze_health(self, birth_data: BirthData) -> Dict[str, Any]:
        """Analyze health patterns and wellness recommendations."""
        return {
            "module": "health",
            "analysis": f"""Health analysis for {birth_data.name}:

The 1st house represents overall vitality and physical constitution, while the 6th house indicates potential health challenges and the body's healing capacity. The Moon represents mental and emotional health patterns.

Physical constitution shows good basic vitality with need for attention to stress management and emotional balance. The digestive system and nervous system may require special care through proper diet and lifestyle practices.

Preventive health measures include regular exercise, meditation or relaxation practices, and maintaining work-life balance. Natural healing methods and holistic approaches to wellness are particularly beneficial.

Health is supported by following natural rhythms, eating fresh seasonal foods, and maintaining positive mental attitudes. Regular detoxification and spiritual practices contribute to overall well-being.""",
            "confidence": 0.7,
            "key_points": [
                "Good basic vitality",
                "Focus on stress management",
                "Digestive and nervous system care",
                "Holistic wellness approaches"
            ]
        }
    
    def _analyze_children(self, birth_data: BirthData) -> Dict[str, Any]:
        """Analyze children and family life prospects."""
        return {
            "module": "children",
            "analysis": f"""Children and family analysis for {birth_data.name}:

The 5th house represents children, creativity, and joy in life. Jupiter is the natural significator for children and wisdom, indicating the approach to parenting and relationship with offspring.

The analysis suggests potential for loving, nurturing relationships with children, whether biological or through mentoring roles. There's natural ability to guide and inspire young people, combined with patience and understanding.

Parenting style emphasizes balance between guidance and freedom, encouraging children's individual growth while providing strong moral and ethical foundation. Education and spiritual development of children are prioritized.

Family life brings joy and meaning, with children serving as teachers and sources of wisdom. The focus is on raising conscious, compassionate individuals who can contribute positively to society.""",
            "confidence": 0.6,
            "key_points": [
                "Nurturing relationship with children",
                "Natural mentoring abilities",
                "Balanced parenting approach",
                "Focus on children's spiritual development"
            ]
        }
    
    def _analyze_finance(self, birth_data: BirthData) -> Dict[str, Any]:
        """Analyze financial patterns and wealth potential."""
        return {
            "module": "finance",
            "analysis": f"""Financial analysis for {birth_data.name}:

The 2nd house represents earned income and personal resources, while the 11th house indicates gains and fulfillment of desires. Jupiter represents wealth through wisdom and right action.

Financial growth comes through ethical means, service-oriented work, and investments in education or spiritual pursuits. There's natural ability to accumulate resources through patience and steady effort rather than speculation.

Money management style emphasizes security and long-term planning over quick gains. Generosity and sharing wealth with others creates positive financial karma that supports continued prosperity.

Financial success is tied to personal growth and helping others achieve their goals. Multiple income streams and diversified investments provide stability and security for the future.""",
            "confidence": 0.7,
            "key_points": [
                "Ethical wealth accumulation",
                "Focus on long-term security",
                "Service-oriented income sources",
                "Generous approach to wealth"
            ]
        }
    
    def _default_analysis(self, birth_data: BirthData) -> Dict[str, Any]:
        """Default analysis for unsupported modules."""
        return {
            "module": "general",
            "analysis": f"General astrological insights for {birth_data.name} based on birth chart analysis.",
            "confidence": 0.5,
            "key_points": ["General astrological guidance available"]
        }
    
    def _analyze_education(self, birth_data: BirthData) -> Dict[str, Any]:
        """Analyze education and learning patterns.""" 
        return self._default_analysis(birth_data)
    
    def _analyze_spirituality(self, birth_data: BirthData) -> Dict[str, Any]:
        """Analyze spiritual inclinations and path."""
        return self._default_analysis(birth_data)
    
    def _analyze_compatibility(self, birth_data: BirthData) -> Dict[str, Any]:
        """Analyze general compatibility patterns."""
        return self._default_analysis(birth_data)
    
    def _analyze_timing(self, birth_data: BirthData) -> Dict[str, Any]:
        """Analyze timing and planetary periods."""
        return self._default_analysis(birth_data)
    
    def _analyze_remedies(self, birth_data: BirthData) -> Dict[str, Any]:
        """Suggest astrological remedies.""" 
        return self._default_analysis(birth_data)
    
    def _generate_summary(self, analyses: Dict[str, Any], birth_data: BirthData) -> str:
        """Generate overall summary of all analyses."""
        try:
            if birth_data.gender:
                gender_helper = GenderAnalysisHelper(Gender(birth_data.gender))
                base_summary = f"""
                Comprehensive astrological analysis for {birth_data.name} reveals a well-balanced individual with strong potential for personal and professional growth. 
                
                The birth chart indicates natural leadership abilities, emotional intelligence, and a harmonious approach to life's challenges. 
                There's strong potential for success through service, ethical conduct, and helping others achieve their goals.
                
                Key themes include the balance between material success and spiritual growth, the importance of relationships and partnership, 
                and the natural ability to guide and inspire others through wisdom and compassion.
                """
                
                return gender_helper.enhance_analysis_with_gender_context(base_summary, "summary")
            else:
                return f"""
                Comprehensive astrological analysis for {birth_data.name} reveals a well-balanced individual with strong potential for personal and professional growth.
                
                The birth chart indicates natural leadership abilities, emotional intelligence, and a harmonious approach to life's challenges.
                There's strong potential for success through service, ethical conduct, and helping others achieve their goals.
                """
                
        except Exception as e:
            logger.error(f"Error generating summary: {e}")
            return f"Summary analysis for {birth_data.name} - comprehensive insights available in detailed module analyses."
    
    def _generate_recommendations(self, analyses: Dict[str, Any], birth_data: BirthData) -> List[str]:
        """Generate personalized recommendations."""
        recommendations = [
            "Focus on developing natural leadership abilities through service and ethical conduct",
            "Maintain balance between material goals and spiritual growth",
            "Cultivate emotional intelligence and empathy in all relationships", 
            "Practice regular meditation or mindfulness for mental clarity",
            "Pursue learning opportunities that expand wisdom and understanding",
            "Build strong, supportive relationships based on mutual respect",
            "Use natural healing and holistic approaches for health maintenance",
            "Develop multiple income streams through service-oriented work",
            "Practice generosity and sharing to create positive karma",
            "Trust intuition while making important life decisions"
        ]
        
        return recommendations
    
    def _generate_remedies(self, analyses: Dict[str, Any], birth_data: BirthData) -> List[Dict[str, str]]:
        """Generate astrological remedies and practices."""
        remedies = [
            {
                "type": "Gemstone",
                "recommendation": "Yellow Sapphire for Jupiter enhancement",
                "purpose": "Increase wisdom and prosperity"
            },
            {
                "type": "Mantra",
                "recommendation": "Om Gam Ganapataye Namaha",
                "purpose": "Remove obstacles and ensure success"
            },
            {
                "type": "Donation", 
                "recommendation": "Donate yellow items on Thursdays",
                "purpose": "Strengthen Jupiter and increase good fortune"
            },
            {
                "type": "Fasting",
                "recommendation": "Fast on Mondays for Moon strengthening", 
                "purpose": "Improve emotional balance and mental peace"
            },
            {
                "type": "Yantra",
                "recommendation": "Sri Yantra meditation",
                "purpose": "Attract abundance and spiritual growth"
            }
        ]
        
        return remedies
    
    def _serialize_birth_data(self, birth_data: BirthData) -> Dict[str, Any]:
        """Convert birth data to serializable format."""
        return {
            "name": birth_data.name,
            "date": birth_data.date,
            "time": birth_data.time,
            "location": birth_data.location,
            "coordinates": {
                "latitude": birth_data.latitude,
                "longitude": birth_data.longitude
            },
            "timezone": birth_data.timezone,
            "gender": birth_data.gender
        }
    
    def _create_error_response(self, error_message: str) -> Dict[str, Any]:
        """Create standardized error response."""
        return {
            "error": True,
            "error_message": error_message,
            "analysis_timestamp": datetime.now().isoformat(),
            "analyses": {},
            "summary": "Analysis could not be completed due to an error.",
            "recommendations": [],
            "remedies": []
        }

# Factory function for easy integration
def create_astrology_analysis(
    name: str,
    birth_date: str,
    birth_time: str, 
    location: str,
    latitude: float,
    longitude: float,
    timezone: str,
    modules: List[str],
    gender: Optional[str] = None
) -> Dict[str, Any]:
    """
    Factory function to create comprehensive astrological analysis.
    
    Args:
        name: Person's name
        birth_date: Birth date in YYYY-MM-DD format
        birth_time: Birth time in HH:MM format
        location: Birth location name
        latitude: Birth location latitude
        longitude: Birth location longitude
        timezone: Timezone string
        modules: List of analysis modules to include
        gender: Optional gender for gender-aware analysis
        
    Returns:
        Comprehensive analysis results
    """
    try:
        birth_data = BirthData(
            name=name,
            date=birth_date,
            time=birth_time,
            location=location,
            latitude=latitude,
            longitude=longitude,
            timezone=timezone,
            gender=gender
        )
        
        request = AnalysisRequest(
            birth_data=birth_data,
            modules=modules
        )
        
        agent = AstrologyAgent()
        return agent.analyze(request)
        
    except Exception as e:
        logger.error(f"Error creating astrology analysis: {e}")
        return {
            "error": True,
            "error_message": str(e),
            "analyses": {}
        }