import { Gender } from '@prisma/client'

export interface BirthData {
  date: Date
  time: string
  place: string
  gender: Gender
}

export interface PlanetPosition {
  planet: string
  sign: string
  degree: number
  house: number
  retrograde?: boolean
}

export interface GenderSpecificAnalysis {
  personality: {
    core_traits: string[]
    strengths: string[]
    challenges: string[]
    leadership_style?: string
    communication_style: string
  }
  relationships: {
    compatibility_factors: string[]
    relationship_patterns: string[]
    marriage_timing?: string
    ideal_partner_traits: string[]
  }
  career: {
    suitable_fields: string[]
    professional_strengths: string[]
    leadership_potential: string
    work_environment_preferences: string[]
  }
  health: {
    vulnerable_areas: string[]
    preventive_measures: string[]
    mental_health_focus: string[]
    reproductive_health?: string[]
  }
  spiritual: {
    spiritual_inclinations: string[]
    meditation_practices: string[]
    growth_areas: string[]
  }
}

export class GenderAwareAstrologyEngine {
  private planetaryInfluences: Record<string, any> = {
    Sun: { masculine: 0.8, feminine: 0.6 },
    Moon: { masculine: 0.4, feminine: 0.9 },
    Mars: { masculine: 0.9, feminine: 0.7 },
    Mercury: { masculine: 0.6, feminine: 0.6 },
    Jupiter: { masculine: 0.8, feminine: 0.7 },
    Venus: { masculine: 0.5, feminine: 0.9 },
    Saturn: { masculine: 0.7, feminine: 0.6 },
    Rahu: { masculine: 0.6, feminine: 0.5 },
    Ketu: { masculine: 0.5, feminine: 0.6 }
  }

  generateGenderSpecificAnalysis(
    birthData: BirthData,
    planetPositions: PlanetPosition[]
  ): GenderSpecificAnalysis {
    const isFemale = birthData.gender === Gender.FEMALE
    const isMale = birthData.gender === Gender.MALE
    
    return {
      personality: this.analyzePersonality(planetPositions, birthData.gender),
      relationships: this.analyzeRelationships(planetPositions, birthData.gender),
      career: this.analyzeCareer(planetPositions, birthData.gender),
      health: this.analyzeHealth(planetPositions, birthData.gender),
      spiritual: this.analyzeSpiritual(planetPositions, birthData.gender)
    }
  }

  private analyzePersonality(positions: PlanetPosition[], gender: Gender): GenderSpecificAnalysis['personality'] {
    const sun = positions.find(p => p.planet === 'Sun')
    const moon = positions.find(p => p.planet === 'Moon')
    const ascendant = positions.find(p => p.planet === 'Ascendant')
    
    const baseTraits = this.getBasePersonalityTraits(sun, moon, ascendant)
    
    if (gender === Gender.FEMALE) {
      return {
        core_traits: [
          ...baseTraits,
          'Intuitive decision-making',
          'Emotional intelligence',
          'Nurturing leadership style',
          'Collaborative approach to challenges'
        ],
        strengths: [
          'Strong emotional resilience',
          'Excellent interpersonal skills',
          'Natural counseling abilities',
          'Intuitive problem-solving',
          'Multitasking capabilities'
        ],
        challenges: [
          'Tendency to over-analyze emotions',
          'Difficulty setting boundaries',
          'Self-doubt in leadership roles',
          'Perfectionist tendencies'
        ],
        leadership_style: 'Collaborative and empathetic leadership with focus on team harmony',
        communication_style: 'Diplomatic, emotionally aware, and relationship-focused'
      }
    } else if (gender === Gender.MALE) {
      return {
        core_traits: [
          ...baseTraits,
          'Goal-oriented mindset',
          'Logical problem-solving',
          'Independent decision-making',
          'Competitive spirit'
        ],
        strengths: [
          'Strong analytical abilities',
          'Natural leadership qualities',
          'Decisive action-taking',
          'Strategic thinking',
          'Risk-taking capability'
        ],
        challenges: [
          'Difficulty expressing emotions',
          'Tendency toward impatience',
          'Over-reliance on logic',
          'Potential for work-life imbalance'
        ],
        leadership_style: 'Direct and results-oriented leadership with clear hierarchies',
        communication_style: 'Direct, factual, and achievement-focused'
      }
    } else {
      return {
        core_traits: [
          ...baseTraits,
          'Balanced perspective',
          'Fluid thinking patterns',
          'Adaptable approach',
          'Inclusive mindset'
        ],
        strengths: [
          'Balanced emotional and logical processing',
          'Adaptable leadership style',
          'Creative problem-solving',
          'Bridge-building abilities',
          'Inclusive communication'
        ],
        challenges: [
          'Identity-related internal conflicts',
          'Societal acceptance challenges',
          'Decision-making complexity',
          'Boundary definition difficulties'
        ],
        leadership_style: 'Inclusive and adaptive leadership balancing multiple perspectives',
        communication_style: 'Flexible, empathetic, and inclusive communication'
      }
    }
  }

  private analyzeRelationships(positions: PlanetPosition[], gender: Gender): GenderSpecificAnalysis['relationships'] {
    const venus = positions.find(p => p.planet === 'Venus')
    const mars = positions.find(p => p.planet === 'Mars')
    const moon = positions.find(p => p.planet === 'Moon')
    const jupiter = positions.find(p => p.planet === 'Jupiter')

    if (gender === Gender.FEMALE) {
      return {
        compatibility_factors: [
          'Emotional security and stability',
          'Intellectual compatibility',
          'Shared values and life goals',
          'Mutual respect and understanding',
          'Communication styles alignment'
        ],
        relationship_patterns: [
          'Seeks deep emotional connections',
          'Values long-term commitment',
          'Nurturing and supportive partner',
          'May sacrifice personal needs for relationship harmony'
        ],
        marriage_timing: this.calculateMarriageTiming(venus, jupiter, gender),
        ideal_partner_traits: [
          'Emotionally mature and stable',
          'Good communicator',
          'Respectful and supportive',
          'Shares similar life values',
          'Financially responsible'
        ]
      }
    } else if (gender === Gender.MALE) {
      return {
        compatibility_factors: [
          'Shared ambitions and goals',
          'Mutual respect for independence',
          'Physical and emotional attraction',
          'Complementary skills and interests',
          'Family values alignment'
        ],
        relationship_patterns: [
          'May prioritize career over relationships initially',
          'Values loyalty and commitment',
          'Provider and protector role',
          'Needs personal space and independence'
        ],
        marriage_timing: this.calculateMarriageTiming(venus, jupiter, gender),
        ideal_partner_traits: [
          'Independent yet supportive',
          'Understanding of career priorities',
          'Emotionally intelligent',
          'Shares life vision',
          'Good family values'
        ]
      }
    } else {
      return {
        compatibility_factors: [
          'Acceptance and understanding',
          'Open communication',
          'Shared values about identity',
          'Mutual growth and support',
          'Flexible relationship dynamics'
        ],
        relationship_patterns: [
          'Values authentic self-expression',
          'Seeks understanding and acceptance',
          'Flexible in relationship roles',
          'May face unique societal challenges'
        ],
        ideal_partner_traits: [
          'Open-minded and accepting',
          'Excellent communicator',
          'Supportive of identity journey',
          'Emotionally mature',
          'Values authenticity'
        ]
      }
    }
  }

  private analyzeCareer(positions: PlanetPosition[], gender: Gender): GenderSpecificAnalysis['career'] {
    const sun = positions.find(p => p.planet === 'Sun')
    const mars = positions.find(p => p.planet === 'Mars')
    const mercury = positions.find(p => p.planet === 'Mercury')
    const saturn = positions.find(p => p.planet === 'Saturn')

    const baseCareerFields = this.getBaseCareerFields(sun, mercury, saturn)

    if (gender === Gender.FEMALE) {
      return {
        suitable_fields: [
          ...baseCareerFields,
          'Healthcare and wellness',
          'Education and training',
          'Psychology and counseling',
          'Human resources',
          'Social work and NGOs',
          'Creative arts and design',
          'Public relations and communications'
        ],
        professional_strengths: [
          'Excellent team collaboration',
          'Strong communication skills',
          'Emotional intelligence in workplace',
          'Detail-oriented approach',
          'Relationship building abilities'
        ],
        leadership_potential: 'High potential for transformational leadership with focus on team development and inclusive decision-making',
        work_environment_preferences: [
          'Collaborative team settings',
          'Flexible work arrangements',
          'Purpose-driven organizations',
          'Supportive and inclusive culture'
        ]
      }
    } else if (gender === Gender.MALE) {
      return {
        suitable_fields: [
          ...baseCareerFields,
          'Engineering and technology',
          'Business and entrepreneurship',
          'Finance and investments',
          'Sales and marketing',
          'Construction and manufacturing',
          'Sports and fitness',
          'Military and security services'
        ],
        professional_strengths: [
          'Strategic planning abilities',
          'Competitive advantage seeking',
          'Risk-taking in business decisions',
          'Technical problem-solving',
          'Results-oriented approach'
        ],
        leadership_potential: 'Strong potential for executive leadership with focus on results and organizational growth',
        work_environment_preferences: [
          'Competitive and challenging environments',
          'Clear hierarchies and structures',
          'Performance-based recognition',
          'Growth and advancement opportunities'
        ]
      }
    } else {
      return {
        suitable_fields: [
          ...baseCareerFields,
          'Diversity and inclusion consulting',
          'Creative industries',
          'Mental health and counseling',
          'Research and academia',
          'Social advocacy and activism',
          'Art therapy and healing arts'
        ],
        professional_strengths: [
          'Unique perspective and creativity',
          'Bridge-building between different groups',
          'Adaptable problem-solving approach',
          'Inclusive leadership style',
          'Innovation and out-of-box thinking'
        ],
        leadership_potential: 'Potential for innovative leadership that brings fresh perspectives and inclusive approaches',
        work_environment_preferences: [
          'Inclusive and diverse workplaces',
          'Creative and flexible environments',
          'Organizations with social mission',
          'Supportive and understanding culture'
        ]
      }
    }
  }

  private analyzeHealth(positions: PlanetPosition[], gender: Gender): GenderSpecificAnalysis['health'] {
    const moon = positions.find(p => p.planet === 'Moon')
    const mars = positions.find(p => p.planet === 'Mars')
    const saturn = positions.find(p => p.planet === 'Saturn')

    if (gender === Gender.FEMALE) {
      return {
        vulnerable_areas: [
          'Reproductive health issues',
          'Hormonal imbalances',
          'Emotional stress-related conditions',
          'Digestive sensitivities',
          'Joint and bone health'
        ],
        preventive_measures: [
          'Regular gynecological check-ups',
          'Stress management through meditation',
          'Balanced nutrition with iron and calcium',
          'Regular exercise including yoga',
          'Hormonal health monitoring'
        ],
        mental_health_focus: [
          'Emotional balance and mood regulation',
          'Stress management techniques',
          'Self-care and boundary setting',
          'Support system development'
        ],
        reproductive_health: [
          'Regular hormonal health monitoring',
          'Fertility awareness and planning',
          'Menstrual health management',
          'Pregnancy and childbirth considerations'
        ]
      }
    } else if (gender === Gender.MALE) {
      return {
        vulnerable_areas: [
          'Cardiovascular health',
          'Stress-related hypertension',
          'Digestive issues from irregular eating',
          'Musculoskeletal problems',
          'Mental health and emotional expression'
        ],
        preventive_measures: [
          'Regular cardiovascular exercise',
          'Stress management and relaxation',
          'Regular health screenings',
          'Balanced work-life schedule',
          'Emotional expression and communication'
        ],
        mental_health_focus: [
          'Stress management and pressure handling',
          'Emotional expression development',
          'Work-life balance maintenance',
          'Relationship and communication skills'
        ]
      }
    } else {
      return {
        vulnerable_areas: [
          'Identity-related stress and anxiety',
          'Social acceptance challenges',
          'Hormonal health considerations',
          'Mental health and depression',
          'General wellness and self-care'
        ],
        preventive_measures: [
          'Regular mental health support',
          'Inclusive healthcare provider selection',
          'Stress management and self-care',
          'Community support and connection',
          'Holistic wellness approach'
        ],
        mental_health_focus: [
          'Identity acceptance and self-love',
          'Stress management for social challenges',
          'Community support and belonging',
          'Authentic self-expression development'
        ]
      }
    }
  }

  private analyzeSpiritual(positions: PlanetPosition[], gender: Gender): GenderSpecificAnalysis['spiritual'] {
    const ketu = positions.find(p => p.planet === 'Ketu')
    const jupiter = positions.find(p => p.planet === 'Jupiter')
    const moon = positions.find(p => p.planet === 'Moon')

    return {
      spiritual_inclinations: [
        'Meditation and mindfulness practices',
        'Service to others and community',
        'Nature connection and earth-based spirituality',
        'Wisdom traditions and philosophical study',
        'Healing arts and energy work'
      ],
      meditation_practices: [
        'Loving-kindness meditation',
        'Chakra balancing and energy work',
        'Mantra chanting and sound healing',
        'Walking meditation in nature',
        'Gratitude and appreciation practices'
      ],
      growth_areas: [
        'Self-acceptance and inner peace',
        'Compassion for self and others',
        'Intuitive development and trust',
        'Service and contribution to community',
        'Balance between material and spiritual life'
      ]
    }
  }

  private getBasePersonalityTraits(sun?: PlanetPosition, moon?: PlanetPosition, ascendant?: PlanetPosition): string[] {
    // Basic traits based on planetary positions
    return [
      'Naturally curious and learning-oriented',
      'Values personal growth and development',
      'Seeks meaning and purpose in life',
      'Appreciates beauty and harmony'
    ]
  }

  private getBaseCareerFields(sun?: PlanetPosition, mercury?: PlanetPosition, saturn?: PlanetPosition): string[] {
    // Basic career fields based on planetary positions
    return [
      'Consulting and advisory services',
      'Research and analysis',
      'Communication and media',
      'Management and administration'
    ]
  }

  private calculateMarriageTiming(venus?: PlanetPosition, jupiter?: PlanetPosition, gender?: Gender): string {
    // Simplified marriage timing calculation
    return 'Favorable periods for marriage: Ages 25-30, with strongest indicators around age 27-28'
  }
}