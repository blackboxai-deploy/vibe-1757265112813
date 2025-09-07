import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { skills, personality, interests, preferences } = await request.json()

    // Simulate AI-powered career recommendation
    const recommendations = generateCareerRecommendations(skills, personality, interests, preferences)
    
    // Calculate match scores
    const scoredRecommendations = calculateMatchScores(recommendations, skills, interests)
    
    // Sort by match score
    const sortedRecommendations = scoredRecommendations.sort((a, b) => b.matchScore - a.matchScore)

    return NextResponse.json({
      success: true,
      data: {
        recommendations: sortedRecommendations.slice(0, 10),
        totalMatches: sortedRecommendations.length,
        topMatch: sortedRecommendations[0],
        matchCriteria: {
          skillsWeight: 40,
          interestsWeight: 30,
          personalityWeight: 20,
          preferencesWeight: 10
        }
      }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to generate career recommendations' },
      { status: 500 }
    )
  }
}

const careerDatabase = [
  {
    title: "Software Engineer",
    industry: "Technology",
    requiredSkills: ["Programming (Python, Java, etc.)", "Web Development", "Problem Solving"],
    salaryRange: "₹8-15 LPA",
    growth: "+15%",
    description: "Design, develop, and maintain software applications",
    workEnvironment: ["Office-based", "Remote", "Hybrid"],
    companyTypes: ["Startup", "Small", "Medium", "Large"],
    personalityTraits: ["analytical", "detail-oriented", "collaborative"],
    industryFocus: ["Technology"]
  },
  {
    title: "Data Scientist",
    industry: "Technology",
    requiredSkills: ["Data Analysis & Statistics", "Programming (Python, Java, etc.)", "Machine Learning/AI"],
    salaryRange: "₹12-20 LPA",
    growth: "+22%",
    description: "Analyze complex data to extract business insights",
    workEnvironment: ["Office-based", "Remote", "Hybrid"],
    companyTypes: ["Medium", "Large"],
    personalityTraits: ["analytical", "curious", "detail-oriented"],
    industryFocus: ["Technology", "Finance", "Healthcare"]
  },
  {
    title: "Product Manager",
    industry: "Technology",
    requiredSkills: ["Communication", "Leadership", "Problem Solving"],
    salaryRange: "₹15-25 LPA",
    growth: "+18%",
    description: "Lead product development from conception to launch",
    workEnvironment: ["Office-based", "Hybrid"],
    companyTypes: ["Startup", "Medium", "Large"],
    personalityTraits: ["leadership", "strategic", "collaborative"],
    industryFocus: ["Technology"]
  },
  {
    title: "Digital Marketing Specialist",
    industry: "Marketing",
    requiredSkills: ["Communication", "Problem Solving"],
    salaryRange: "₹5-12 LPA",
    growth: "+20%",
    description: "Create and execute digital marketing campaigns",
    workEnvironment: ["Office-based", "Remote", "Hybrid"],
    companyTypes: ["Startup", "Small", "Medium"],
    personalityTraits: ["creative", "analytical", "collaborative"],
    industryFocus: ["Marketing", "Technology"]
  },
  {
    title: "Financial Analyst",
    industry: "Finance",
    requiredSkills: ["Data Analysis & Statistics", "Problem Solving"],
    salaryRange: "₹6-14 LPA",
    growth: "+12%",
    description: "Analyze financial data and create investment recommendations",
    workEnvironment: ["Office-based"],
    companyTypes: ["Medium", "Large"],
    personalityTraits: ["analytical", "detail-oriented", "strategic"],
    industryFocus: ["Finance"]
  },
  {
    title: "UX/UI Designer",
    industry: "Design",
    requiredSkills: ["Problem Solving", "Communication"],
    salaryRange: "₹7-16 LPA",
    growth: "+25%",
    description: "Design user interfaces and experiences for digital products",
    workEnvironment: ["Office-based", "Remote", "Hybrid"],
    companyTypes: ["Startup", "Medium", "Large"],
    personalityTraits: ["creative", "empathetic", "detail-oriented"],
    industryFocus: ["Technology", "Design"]
  }
]

function generateCareerRecommendations(skills: any, personality: any, interests: any, preferences: any) {
  // Filter careers based on basic criteria
  let filteredCareers = careerDatabase.filter(career => {
    // Check work environment preference
    if (preferences.workEnvironment && 
        !career.workEnvironment.includes(preferences.workEnvironment)) {
      return false
    }
    
    // Check company size preference
    if (preferences.companySize && 
        !career.companyTypes.some(type => preferences.companySize.includes(type))) {
      return false
    }
    
    return true
  })
  
  return filteredCareers
}

function calculateMatchScores(careers: any[], skills: any, interests: any) {
  return careers.map(career => {
    let matchScore = 0
    let factors = []
    
    // Skills matching (40% weight)
    const skillMatch = calculateSkillMatch(career.requiredSkills, skills)
    matchScore += skillMatch * 0.4
    factors.push({ factor: 'Skills', score: skillMatch, weight: 40 })
    
    // Interest matching (30% weight)
    const interestMatch = calculateInterestMatch(career.industryFocus, interests)
    matchScore += interestMatch * 0.3
    factors.push({ factor: 'Interests', score: interestMatch, weight: 30 })
    
    // Base personality matching (20% weight)
    const personalityMatch = 75 // Simplified for demo
    matchScore += personalityMatch * 0.2
    factors.push({ factor: 'Personality', score: personalityMatch, weight: 20 })
    
    // Preferences matching (10% weight)
    const preferencesMatch = 80 // Simplified for demo
    matchScore += preferencesMatch * 0.1
    factors.push({ factor: 'Preferences', score: preferencesMatch, weight: 10 })
    
    return {
      ...career,
      matchScore: Math.round(matchScore),
      matchFactors: factors,
      recommendations: generateCareerAdvice(career, matchScore)
    }
  })
}

function calculateSkillMatch(requiredSkills: string[], userSkills: any): number {
  if (!userSkills || Object.keys(userSkills).length === 0) {
    return 50 // Base score if no skills provided
  }
  
  let totalScore = 0
  let skillCount = 0
  
  requiredSkills.forEach(requiredSkill => {
    // Find matching user skill
    const userSkill = Object.keys(userSkills).find(skill => 
      skill.includes(requiredSkill) || requiredSkill.includes(skill)
    )
    
    if (userSkill) {
      // Convert skill level (1-5) to percentage
      totalScore += (userSkills[userSkill] / 5) * 100
    } else {
      // Penalty for missing required skill
      totalScore += 20
    }
    skillCount++
  })
  
  return skillCount > 0 ? Math.round(totalScore / skillCount) : 50
}

function calculateInterestMatch(careerIndustries: string[], userInterests: any): number {
  if (!userInterests || Object.keys(userInterests).length === 0) {
    return 60 // Base score if no interests provided
  }
  
  const selectedInterests = Object.keys(userInterests).filter(interest => userInterests[interest])
  
  if (selectedInterests.length === 0) {
    return 60
  }
  
  // Check if any career industries match user interests
  const matchingInterests = careerIndustries.filter(industry =>
    selectedInterests.some(interest =>
      interest.includes(industry) || industry.includes(interest) ||
      (industry === 'Technology' && interest === 'Technology & Software')
    )
  )
  
  // Calculate match percentage
  const matchPercentage = (matchingInterests.length / Math.max(careerIndustries.length, selectedInterests.length)) * 100
  
  return Math.min(Math.round(matchPercentage), 100)
}

function generateCareerAdvice(career: any, matchScore: number) {
  const advice = []
  
  if (matchScore >= 85) {
    advice.push("Excellent match! This career aligns very well with your profile.")
    advice.push("Consider taking immediate action to pursue this path.")
  } else if (matchScore >= 70) {
    advice.push("Good match with potential for growth.")
    advice.push("Focus on developing the key required skills.")
  } else {
    advice.push("Moderate match - consider if this interests you.")
    advice.push("Significant skill development may be required.")
  }
  
  // Add specific skill recommendations
  advice.push(`Key skills to focus on: ${career.requiredSkills.slice(0, 3).join(', ')}`)
  
  return advice
}