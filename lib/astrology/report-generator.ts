import { Gender, ReportType } from '@prisma/client'
import { GenderAwareAstrologyEngine, BirthData, PlanetPosition, GenderSpecificAnalysis } from './gender-analysis'

export interface AstrologyReport {
  id: string
  type: ReportType
  birthData: BirthData
  analysis: GenderSpecificAnalysis
  summary: string
  recommendations: string[]
  generatedAt: Date
}

export class AstrologyReportGenerator {
  private genderEngine: GenderAwareAstrologyEngine

  constructor() {
    this.genderEngine = new GenderAwareAstrologyEngine()
  }

  async generateReport(
    type: ReportType,
    birthData: BirthData
  ): Promise<AstrologyReport> {
    // Simulate planetary position calculation
    const planetPositions = this.calculatePlanetaryPositions(birthData)
    
    // Generate gender-specific analysis
    const analysis = this.genderEngine.generateGenderSpecificAnalysis(
      birthData,
      planetPositions
    )

    // Generate report based on type
    const report: AstrologyReport = {
      id: this.generateReportId(),
      type,
      birthData,
      analysis,
      summary: this.generateSummary(type, analysis, birthData.gender),
      recommendations: this.generateRecommendations(type, analysis, birthData.gender),
      generatedAt: new Date()
    }

    return report
  }

  private calculatePlanetaryPositions(birthData: BirthData): PlanetPosition[] {
    // This is a simplified simulation - in a real application,
    // you would use actual astronomical calculations
    const planets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu']
    const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
                   'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']
    
    return planets.map((planet, index) => ({
      planet,
      sign: signs[index % 12],
      degree: Math.random() * 30,
      house: (index % 12) + 1,
      retrograde: Math.random() > 0.8
    }))
  }

  private generateSummary(type: ReportType, analysis: GenderSpecificAnalysis, gender: Gender): string {
    const genderRef = this.getGenderReference(gender)
    
    switch (type) {
      case ReportType.PERSONALITY:
        return `This comprehensive personality analysis reveals ${genderRef.subject} as someone with ${analysis.personality.core_traits.slice(0, 3).join(', ')}. ${genderRef.possessive} natural strengths include ${analysis.personality.strengths.slice(0, 2).join(' and ')}, while ${genderRef.subject} may need to work on ${analysis.personality.challenges[0]}. ${genderRef.possessive} communication style is ${analysis.personality.communication_style.toLowerCase()}.`

      case ReportType.COMPATIBILITY:
        return `In relationships, ${genderRef.subject} seeks ${analysis.relationships.compatibility_factors.slice(0, 2).join(' and ')}. ${genderRef.possessive} relationship patterns show ${analysis.relationships.relationship_patterns[0]}. The ideal partner would be ${analysis.relationships.ideal_partner_traits.slice(0, 2).join(' and ')}.`

      case ReportType.CAREER:
        return `Career-wise, ${genderRef.subject} shows strong potential in ${analysis.career.suitable_fields.slice(0, 3).join(', ')}. ${genderRef.possessive} professional strengths include ${analysis.career.professional_strengths.slice(0, 2).join(' and ')}. ${analysis.career.leadership_potential}`

      case ReportType.HEALTH:
        return `Health considerations include attention to ${analysis.health.vulnerable_areas.slice(0, 2).join(' and ')}. Key preventive measures involve ${analysis.health.preventive_measures.slice(0, 2).join(' and ')}. Mental health focus should be on ${analysis.health.mental_health_focus[0]}.`

      case ReportType.SPIRITUALITY:
        return `Spiritually, ${genderRef.subject} is drawn to ${analysis.spiritual.spiritual_inclinations.slice(0, 2).join(' and ')}. Recommended practices include ${analysis.spiritual.meditation_practices.slice(0, 2).join(' and ')}. Key growth areas are ${analysis.spiritual.growth_areas.slice(0, 2).join(' and ')}.`

      case ReportType.MARRIAGE:
        return `Marriage prospects show ${analysis.relationships.marriage_timing}. ${genderRef.subject} seeks ${analysis.relationships.compatibility_factors.slice(0, 2).join(' and ')} in a life partner. The ideal relationship would feature ${analysis.relationships.ideal_partner_traits.slice(0, 2).join(' and ')}.`

      case ReportType.FULL_READING:
        return `This complete astrological profile reveals a multi-faceted individual with ${analysis.personality.core_traits.slice(0, 2).join(' and ')}. In career, ${genderRef.subject} excels in ${analysis.career.suitable_fields[0]}, while relationships are marked by ${analysis.relationships.relationship_patterns[0]}. Health focus should be on ${analysis.health.vulnerable_areas[0]}, and spiritual growth through ${analysis.spiritual.spiritual_inclinations[0]}.`

      default:
        return `This astrological analysis provides insights into ${genderRef.possessive} unique personality and life path.`
    }
  }

  private generateRecommendations(type: ReportType, analysis: GenderSpecificAnalysis, gender: Gender): string[] {
    const genderRef = this.getGenderReference(gender)
    const baseRecommendations = []

    switch (type) {
      case ReportType.PERSONALITY:
        baseRecommendations.push(
          `Focus on developing ${genderRef.possessive} natural strengths: ${analysis.personality.strengths.slice(0, 2).join(' and ')}`,
          `Work on overcoming challenges with ${analysis.personality.challenges[0]}`,
          `Embrace ${genderRef.possessive} ${analysis.personality.communication_style.toLowerCase()} communication style`,
          `Consider leadership roles that utilize ${genderRef.possessive} ${analysis.personality.leadership_style?.toLowerCase()}`
        )
        break

      case ReportType.CAREER:
        baseRecommendations.push(
          `Explore opportunities in ${analysis.career.suitable_fields.slice(0, 3).join(', ')}`,
          `Leverage professional strengths: ${analysis.career.professional_strengths.slice(0, 2).join(' and ')}`,
          `Seek work environments that offer ${analysis.career.work_environment_preferences.slice(0, 2).join(' and ')}`,
          `Develop leadership skills aligned with ${genderRef.possessive} natural style`
        )
        break

      case ReportType.HEALTH:
        baseRecommendations.push(
          ...analysis.health.preventive_measures.slice(0, 3),
          `Pay special attention to ${analysis.health.vulnerable_areas.slice(0, 2).join(' and ')}`,
          `Focus on mental health through ${analysis.health.mental_health_focus.slice(0, 2).join(' and ')}`
        )
        if (analysis.health.reproductive_health) {
          baseRecommendations.push(...analysis.health.reproductive_health.slice(0, 2))
        }
        break

      case ReportType.COMPATIBILITY:
      case ReportType.MARRIAGE:
        baseRecommendations.push(
          `Look for partners who offer ${analysis.relationships.compatibility_factors.slice(0, 2).join(' and ')}`,
          `Seek someone with these traits: ${analysis.relationships.ideal_partner_traits.slice(0, 3).join(', ')}`,
          `Be aware of ${genderRef.possessive} relationship patterns: ${analysis.relationships.relationship_patterns[0]}`,
          `Consider timing: ${analysis.relationships.marriage_timing}`
        )
        break

      case ReportType.SPIRITUALITY:
        baseRecommendations.push(
          ...analysis.spiritual.meditation_practices.slice(0, 3),
          `Focus on spiritual growth in ${analysis.spiritual.growth_areas.slice(0, 2).join(' and ')}`,
          `Explore ${genderRef.possessive} natural inclination toward ${analysis.spiritual.spiritual_inclinations[0]}`
        )
        break

      case ReportType.FULL_READING:
        baseRecommendations.push(
          `Career: Focus on ${analysis.career.suitable_fields.slice(0, 2).join(' or ')}`,
          `Relationships: Seek ${analysis.relationships.compatibility_factors[0]}`,
          `Health: Prioritize ${analysis.health.preventive_measures[0]}`,
          `Spirituality: Practice ${analysis.spiritual.meditation_practices[0]}`,
          `Personal Growth: Work on ${analysis.personality.challenges[0]}`
        )
        break
    }

    return baseRecommendations
  }

  private getGenderReference(gender: Gender): { subject: string; possessive: string; object: string } {
    switch (gender) {
      case Gender.MALE:
        return { subject: 'he', possessive: 'his', object: 'him' }
      case Gender.FEMALE:
        return { subject: 'she', possessive: 'her', object: 'her' }
      default:
        return { subject: 'they', possessive: 'their', object: 'them' }
    }
  }

  private generateReportId(): string {
    return `report_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
  }
}