import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { skills, userId } = await request.json()

    // Simulate AI-powered skills analysis
    const analyzedSkills = analyzeSkills(skills)
    
    // Generate skill recommendations
    const recommendations = generateSkillRecommendations(analyzedSkills)
    
    // Calculate skill gaps
    const skillGaps = calculateSkillGaps(analyzedSkills)

    return NextResponse.json({
      success: true,
      data: {
        analyzedSkills,
        recommendations,
        skillGaps,
        overallScore: calculateOverallScore(analyzedSkills),
        strengthAreas: identifyStrengths(analyzedSkills),
        improvementAreas: identifyImprovements(analyzedSkills)
      }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to analyze skills' },
      { status: 500 }
    )
  }
}

function analyzeSkills(skills: Record<string, number>) {
  const analyzed = {}
  
  Object.entries(skills).forEach(([skill, level]) => {
    const category = categorizeSkill(skill)
    const marketDemand = getMarketDemand(skill)
    const salaryImpact = getSalaryImpact(skill)
    
    analyzed[skill] = {
      userLevel: level,
      category,
      marketDemand,
      salaryImpact,
      proficiencyLevel: getProficiencyLabel(level),
      improvementPotential: 5 - level
    }
  })
  
  return analyzed
}

function categorizeSkill(skill: string): string {
  const categories = {
    'programming': ['Programming (Python, Java, etc.)', 'Web Development', 'Mobile App Development'],
    'data': ['Data Analysis & Statistics', 'Machine Learning/AI'],
    'technical': ['Database Management'],
    'soft': ['Communication', 'Leadership', 'Problem Solving', 'Team Collaboration', 'Time Management', 'Critical Thinking']
  }
  
  for (const [category, skillList] of Object.entries(categories)) {
    if (skillList.some(s => skill.includes(s) || s.includes(skill))) {
      return category
    }
  }
  
  return 'other'
}

function getMarketDemand(skill: string): number {
  const demandMap = {
    'Programming': 95,
    'Web Development': 88,
    'Data Analysis': 82,
    'Machine Learning': 78,
    'Communication': 85,
    'Leadership': 75,
    'Problem Solving': 90
  }
  
  // Find closest match
  const match = Object.keys(demandMap).find(k => skill.includes(k) || k.includes(skill))
  return match ? demandMap[match] : 60
}

function getSalaryImpact(skill: string): string {
  const highImpactSkills = ['Programming', 'Machine Learning', 'Data Analysis', 'Leadership']
  const isHighImpact = highImpactSkills.some(s => skill.includes(s) || s.includes(skill))
  
  return isHighImpact ? 'High' : 'Medium'
}

function getProficiencyLabel(level: number): string {
  const labels = {
    1: 'Beginner',
    2: 'Novice',
    3: 'Intermediate',
    4: 'Advanced',
    5: 'Expert'
  }
  return labels[level] || 'Unknown'
}

function generateSkillRecommendations(analyzedSkills: any) {
  const recommendations = []
  
  Object.entries(analyzedSkills).forEach(([skill, data]: [string, any]) => {
    if (data.userLevel < 3 && data.marketDemand > 75) {
      recommendations.push({
        skill,
        priority: 'High',
        reason: `${skill} has high market demand (${data.marketDemand}%) but you're at ${data.proficiencyLevel} level`,
        suggestedActions: [
          `Take an advanced ${skill} course`,
          `Build 2-3 projects using ${skill}`,
          `Get certified in ${skill}`
        ]
      })
    }
  })
  
  return recommendations.slice(0, 5) // Top 5 recommendations
}

function calculateSkillGaps(analyzedSkills: any) {
  const industryStandards = {
    'Programming (Python, Java, etc.)': 4,
    'Web Development': 3,
    'Data Analysis & Statistics': 3,
    'Communication': 4,
    'Problem Solving': 4
  }
  
  const gaps = []
  
  Object.entries(industryStandards).forEach(([skill, requiredLevel]) => {
    const userSkill = analyzedSkills[skill]
    if (userSkill && userSkill.userLevel < requiredLevel) {
      gaps.push({
        skill,
        currentLevel: userSkill.userLevel,
        requiredLevel,
        gap: requiredLevel - userSkill.userLevel,
        priority: requiredLevel - userSkill.userLevel > 2 ? 'High' : 'Medium'
      })
    }
  })
  
  return gaps
}

function calculateOverallScore(analyzedSkills: any): number {
  const skillValues = Object.values(analyzedSkills) as any[]
  const totalScore = skillValues.reduce((sum, skill) => sum + skill.userLevel, 0)
  const maxPossibleScore = skillValues.length * 5
  
  return Math.round((totalScore / maxPossibleScore) * 100)
}

function identifyStrengths(analyzedSkills: any) {
  return Object.entries(analyzedSkills)
    .filter(([_, data]: [string, any]) => data.userLevel >= 4)
    .map(([skill, data]: [string, any]) => ({
      skill,
      level: data.userLevel,
      category: data.category
    }))
    .slice(0, 3)
}

function identifyImprovements(analyzedSkills: any) {
  return Object.entries(analyzedSkills)
    .filter(([_, data]: [string, any]) => data.userLevel <= 2 && data.marketDemand > 70)
    .map(([skill, data]: [string, any]) => ({
      skill,
      currentLevel: data.userLevel,
      marketDemand: data.marketDemand,
      category: data.category
    }))
    .slice(0, 3)
}