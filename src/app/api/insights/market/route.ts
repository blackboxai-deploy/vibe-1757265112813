import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const region = searchParams.get('region') || 'all'
    const industry = searchParams.get('industry') || 'all'

    // Generate market insights based on parameters
    const marketData = generateMarketInsights(region, industry)

    return NextResponse.json({
      success: true,
      data: {
        ...marketData,
        lastUpdated: new Date().toISOString(),
        region,
        industry
      }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch market insights' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { skills, experience, location } = await request.json()

    // Generate personalized market insights
    const personalizedInsights = generatePersonalizedInsights(skills, experience, location)

    return NextResponse.json({
      success: true,
      data: personalizedInsights
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to generate personalized insights' },
      { status: 500 }
    )
  }
}

function generateMarketInsights(region: string, industry: string) {
  const salaryTrends = generateSalaryTrends(region, industry)
  const demandMetrics = generateDemandMetrics(industry)
  const emergingRoles = generateEmergingRoles(industry)
  const skillDemand = generateSkillDemand(industry)
  const regionalData = generateRegionalData(region)

  return {
    salaryTrends,
    demandMetrics,
    emergingRoles,
    skillDemand,
    regionalData,
    marketSentiment: calculateMarketSentiment(),
    predictions: generateMarketPredictions(industry)
  }
}

function generateSalaryTrends(region: string, industry: string) {
  const baseSalaries = {
    'Software Engineer': { min: 8, max: 15, growth: 15 },
    'Data Scientist': { min: 12, max: 20, growth: 22 },
    'Product Manager': { min: 15, max: 25, growth: 18 },
    'Digital Marketing Specialist': { min: 5, max: 12, growth: 20 },
    'Financial Analyst': { min: 6, max: 14, growth: 12 },
    'UX/UI Designer': { min: 7, max: 16, growth: 25 }
  }

  // Apply regional multipliers
  const regionalMultipliers = {
    'bangalore': 1.2,
    'mumbai': 1.1,
    'delhi': 1.1,
    'pune': 1.0,
    'hyderabad': 0.9,
    'chennai': 0.85
  }

  const multiplier = region === 'all' ? 1 : (regionalMultipliers[region.toLowerCase()] || 1)

  return Object.entries(baseSalaries).map(([role, data]) => ({
    role,
    currentRange: `₹${Math.round(data.min * multiplier)}-${Math.round(data.max * multiplier)} LPA`,
    yearlyGrowth: `+${data.growth}%`,
    projectedRange: `₹${Math.round(data.min * multiplier * 1.15)}-${Math.round(data.max * multiplier * 1.15)} LPA`,
    demandLevel: getDemandLevel(role),
    competitionLevel: getCompetitionLevel(role)
  }))
}

function generateDemandMetrics(industry: string) {
  const baseMetrics = {
    totalJobs: Math.floor(Math.random() * 50000) + 20000,
    newJobsThisMonth: Math.floor(Math.random() * 3000) + 1000,
    averageTimeToFill: `${Math.floor(Math.random() * 30) + 15} days`,
    topSkillsInDemand: generateTopSkills(industry),
    hiringRate: `+${Math.floor(Math.random() * 20) + 10}%`,
    remoteJobsPercentage: `${Math.floor(Math.random() * 30) + 40}%`
  }

  return baseMetrics
}

function generateEmergingRoles(industry: string) {
  const rolesByIndustry = {
    'technology': [
      { title: 'AI/ML Engineer', growth: '+45%', salary: '₹15-25 LPA' },
      { title: 'Cloud Solutions Architect', growth: '+38%', salary: '₹20-35 LPA' },
      { title: 'DevOps Engineer', growth: '+35%', salary: '₹12-22 LPA' }
    ],
    'finance': [
      { title: 'Blockchain Developer', growth: '+50%', salary: '₹18-30 LPA' },
      { title: 'Quantitative Analyst', growth: '+28%', salary: '₹15-25 LPA' },
      { title: 'Risk Management Specialist', growth: '+22%', salary: '₹10-18 LPA' }
    ],
    'marketing': [
      { title: 'Growth Hacker', growth: '+40%', salary: '₹8-16 LPA' },
      { title: 'Marketing Automation Specialist', growth: '+35%', salary: '₹7-15 LPA' },
      { title: 'Influencer Marketing Manager', growth: '+30%', salary: '₹6-12 LPA' }
    ]
  }

  const defaultRoles = [
    { title: 'Product Growth Manager', growth: '+32%', salary: '₹18-28 LPA' },
    { title: 'Cybersecurity Analyst', growth: '+40%', salary: '₹12-22 LPA' },
    { title: 'Sustainability Consultant', growth: '+25%', salary: '₹8-16 LPA' }
  ]

  return rolesByIndustry[industry.toLowerCase()] || defaultRoles
}

function generateSkillDemand(industry: string) {
  const skillsByIndustry = {
    'technology': [
      { skill: 'Python', demand: 95, growth: '+25%' },
      { skill: 'JavaScript', demand: 88, growth: '+18%' },
      { skill: 'React', demand: 82, growth: '+22%' },
      { skill: 'Machine Learning', demand: 78, growth: '+35%' },
      { skill: 'Cloud Computing', demand: 75, growth: '+28%' }
    ],
    'finance': [
      { skill: 'Financial Modeling', demand: 85, growth: '+20%' },
      { skill: 'Risk Analysis', demand: 78, growth: '+15%' },
      { skill: 'Excel/VBA', demand: 90, growth: '+10%' },
      { skill: 'Python', demand: 70, growth: '+30%' },
      { skill: 'SQL', demand: 82, growth: '+18%' }
    ],
    'marketing': [
      { skill: 'Digital Marketing', demand: 88, growth: '+25%' },
      { skill: 'SEO/SEM', demand: 85, growth: '+20%' },
      { skill: 'Data Analytics', demand: 80, growth: '+28%' },
      { skill: 'Content Marketing', demand: 78, growth: '+22%' },
      { skill: 'Social Media', demand: 75, growth: '+18%' }
    ]
  }

  const defaultSkills = [
    { skill: 'Communication', demand: 90, growth: '+15%' },
    { skill: 'Problem Solving', demand: 88, growth: '+12%' },
    { skill: 'Leadership', demand: 75, growth: '+10%' },
    { skill: 'Project Management', demand: 82, growth: '+18%' }
  ]

  return skillsByIndustry[industry.toLowerCase()] || defaultSkills
}

function generateRegionalData(region: string) {
  const cityData = {
    'bangalore': {
      jobOpenings: 45000,
      averageSalary: '₹12-18 LPA',
      costOfLiving: 'High',
      techHubs: ['Electronic City', 'Whitefield', 'Koramangala'],
      topCompanies: ['Infosys', 'Wipro', 'Microsoft', 'Google'],
      growthRate: '+20%'
    },
    'mumbai': {
      jobOpenings: 38000,
      averageSalary: '₹11-17 LPA',
      costOfLiving: 'Very High',
      techHubs: ['BKC', 'Powai', 'Andheri'],
      topCompanies: ['TCS', 'Accenture', 'JP Morgan', 'Goldman Sachs'],
      growthRate: '+12%'
    },
    'pune': {
      jobOpenings: 32000,
      averageSalary: '₹10-16 LPA',
      costOfLiving: 'Medium',
      techHubs: ['Hinjewadi', 'Magarpatta', 'Aundh'],
      topCompanies: ['Cognizant', 'Persistent', 'Tech Mahindra', 'Bajaj'],
      growthRate: '+18%'
    }
  }

  if (region === 'all') {
    return {
      totalMarketSize: '₹2.1 Trillion',
      averageGrowthRate: '+16%',
      topCities: Object.keys(cityData),
      overview: 'India\'s tech market continues to show strong growth across all regions'
    }
  }

  return cityData[region.toLowerCase()] || {
    jobOpenings: 15000,
    averageSalary: '₹8-14 LPA',
    costOfLiving: 'Medium',
    growthRate: '+15%'
  }
}

function getDemandLevel(role: string): string {
  const highDemand = ['Software Engineer', 'Data Scientist', 'UX/UI Designer']
  const mediumDemand = ['Product Manager', 'Digital Marketing Specialist']
  
  if (highDemand.includes(role)) return 'Very High'
  if (mediumDemand.includes(role)) return 'High' 
  return 'Medium'
}

function getCompetitionLevel(role: string): string {
  const highCompetition = ['Product Manager', 'UX/UI Designer']
  const mediumCompetition = ['Software Engineer', 'Digital Marketing Specialist']
  
  if (highCompetition.includes(role)) return 'High'
  if (mediumCompetition.includes(role)) return 'Medium'
  return 'Low'
}

function generateTopSkills(industry: string) {
  const skillMap = {
    'technology': ['Python', 'JavaScript', 'Cloud Computing', 'Machine Learning'],
    'finance': ['Financial Analysis', 'Excel', 'Risk Management', 'Accounting'],
    'marketing': ['Digital Marketing', 'SEO', 'Content Creation', 'Analytics']
  }
  
  return skillMap[industry.toLowerCase()] || ['Communication', 'Leadership', 'Problem Solving', 'Analytics']
}

function calculateMarketSentiment(): string {
  const sentiments = ['Very Positive', 'Positive', 'Neutral', 'Cautious']
  const weights = [0.4, 0.4, 0.15, 0.05] // Weighted towards positive
  
  const random = Math.random()
  let cumulative = 0
  
  for (let i = 0; i < sentiments.length; i++) {
    cumulative += weights[i]
    if (random <= cumulative) {
      return sentiments[i]
    }
  }
  
  return 'Positive'
}

function generateMarketPredictions(industry: string) {
  return [
    {
      prediction: 'Remote work adoption will stabilize at 60-70% hybrid model',
      confidence: 85,
      timeframe: '6-12 months',
      impact: 'Medium'
    },
    {
      prediction: 'AI/ML skills premium will increase by 15-20%',
      confidence: 90,
      timeframe: '12-18 months', 
      impact: 'High'
    },
    {
      prediction: 'Green tech roles will see 30%+ growth',
      confidence: 75,
      timeframe: '18-24 months',
      impact: 'Medium'
    }
  ]
}

function generatePersonalizedInsights(skills: any, experience: string, location: string) {
  const marketFit = calculateMarketFit(skills, location)
  const salaryPrediction = predictSalary(skills, experience, location)
  const careerOpportunities = identifyOpportunities(skills, location)
  const skillGaps = identifyMarketSkillGaps(skills)

  return {
    marketFit,
    salaryPrediction,
    careerOpportunities,
    skillGaps,
    recommendations: generatePersonalizedRecommendations(skills, experience, location)
  }
}

function calculateMarketFit(skills: any, location: string): number {
  // Simplified market fit calculation
  const locationMultiplier = location.toLowerCase().includes('bangalore') ? 1.2 : 1.0
  const skillScore = skills ? Object.values(skills).reduce((sum: number, level: any) => sum + level, 0) / Object.keys(skills).length : 3
  
  return Math.round((skillScore / 5) * 100 * locationMultiplier)
}

function predictSalary(skills: any, experience: string, location: string) {
  const baseMap = { 'Entry Level': 8, 'Mid Level': 15, 'Senior Level': 25 }
  const locationMap = { 'bangalore': 1.2, 'mumbai': 1.1, 'pune': 1.0 }
  
  const baseSalary = baseMap[experience] || 12
  const locationFactor = locationMap[location?.toLowerCase()] || 1.0
  const skillFactor = skills ? 1 + (Object.keys(skills).length * 0.1) : 1.1
  
  const predicted = baseSalary * locationFactor * skillFactor
  
  return {
    range: `₹${Math.round(predicted * 0.8)}-${Math.round(predicted * 1.3)} LPA`,
    confidence: 78,
    factors: ['Skills diversity', 'Location premium', 'Experience level']
  }
}

function identifyOpportunities(skills: any, location: string) {
  return [
    {
      opportunity: 'Senior Software Engineer at Tech Startup',
      match: 85,
      salaryRange: '₹15-22 LPA',
      location: location || 'Bangalore'
    },
    {
      opportunity: 'Product Manager at E-commerce Company',
      match: 72,
      salaryRange: '₹18-25 LPA',
      location: location || 'Mumbai'
    },
    {
      opportunity: 'Data Scientist at Financial Services',
      match: 68,
      salaryRange: '₹14-20 LPA',
      location: location || 'Pune'
    }
  ]
}

function identifyMarketSkillGaps(skills: any) {
  const marketNeeds = ['Python', 'Cloud Computing', 'Machine Learning', 'Communication']
  const userSkills = skills ? Object.keys(skills) : []
  
  const gaps = marketNeeds.filter(need => 
    !userSkills.some(skill => skill.toLowerCase().includes(need.toLowerCase()))
  )
  
  return gaps.map(gap => ({
    skill: gap,
    marketDemand: 85,
    salaryImpact: '+15-25%',
    learningTime: '2-4 months'
  }))
}

function generatePersonalizedRecommendations(skills: any, experience: string, location: string) {
  return [
    'Focus on cloud computing skills to increase market value by 20%',
    `Consider ${location || 'Bangalore'} market for 15% higher salary potential`,
    'Add machine learning certification for premium positioning',
    'Build a strong portfolio with 3-5 diverse projects'
  ]
}