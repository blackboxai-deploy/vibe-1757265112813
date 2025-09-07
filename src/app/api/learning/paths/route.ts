import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { careerGoal, currentSkills, learningPreferences } = await request.json()

    // Generate personalized learning paths
    const learningPaths = generateLearningPaths(careerGoal, currentSkills, learningPreferences)
    
    // Calculate estimated timelines
    const pathsWithTimelines = addTimelines(learningPaths, currentSkills)
    
    // Add difficulty assessments
    const completePaths = addDifficultyLevels(pathsWithTimelines)

    return NextResponse.json({
      success: true,
      data: {
        recommendedPaths: completePaths,
        totalPaths: completePaths.length,
        estimatedCompletion: calculateOverallTimeline(completePaths),
        skillGapAnalysis: analyzeSkillGaps(careerGoal, currentSkills)
      }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to generate learning paths' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Return popular learning paths
    const popularPaths = getPopularLearningPaths()
    
    return NextResponse.json({
      success: true,
      data: {
        popularPaths,
        categories: getLearningCategories(),
        featuredCourses: getFeaturedCourses()
      }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch learning paths' },
      { status: 500 }
    )
  }
}

const learningDatabase = [
  {
    id: 'fullstack-web-dev',
    title: 'Full Stack Web Development',
    category: 'Programming',
    targetCareers: ['Software Engineer', 'Full Stack Developer', 'Web Developer'],
    prerequisites: ['Basic computer skills'],
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'Git'],
    modules: [
      { name: 'HTML & CSS Fundamentals', duration: '2 weeks', difficulty: 'Beginner' },
      { name: 'JavaScript Essentials', duration: '3 weeks', difficulty: 'Beginner' },
      { name: 'React Development', duration: '4 weeks', difficulty: 'Intermediate' },
      { name: 'Backend with Node.js', duration: '3 weeks', difficulty: 'Intermediate' },
      { name: 'Database Design', duration: '2 weeks', difficulty: 'Intermediate' },
      { name: 'Full Stack Projects', duration: '4 weeks', difficulty: 'Advanced' }
    ],
    totalDuration: '18 weeks',
    difficulty: 'Beginner to Advanced',
    certification: true,
    practicalProjects: 5
  },
  {
    id: 'data-science-analytics',
    title: 'Data Science & Analytics',
    category: 'Data Science',
    targetCareers: ['Data Scientist', 'Data Analyst', 'Business Analyst'],
    prerequisites: ['Basic mathematics', 'Statistics knowledge'],
    skills: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Tableau', 'SQL'],
    modules: [
      { name: 'Python for Data Science', duration: '3 weeks', difficulty: 'Beginner' },
      { name: 'Statistics & Probability', duration: '2 weeks', difficulty: 'Intermediate' },
      { name: 'Data Manipulation with Pandas', duration: '2 weeks', difficulty: 'Intermediate' },
      { name: 'Machine Learning Basics', duration: '4 weeks', difficulty: 'Intermediate' },
      { name: 'Data Visualization', duration: '2 weeks', difficulty: 'Beginner' },
      { name: 'Advanced ML & Projects', duration: '3 weeks', difficulty: 'Advanced' }
    ],
    totalDuration: '16 weeks',
    difficulty: 'Intermediate to Advanced',
    certification: true,
    practicalProjects: 4
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Mastery',
    category: 'Marketing',
    targetCareers: ['Digital Marketing Specialist', 'Marketing Manager', 'Growth Hacker'],
    prerequisites: ['Basic computer skills', 'Communication skills'],
    skills: ['SEO', 'Google Ads', 'Facebook Ads', 'Content Marketing', 'Analytics', 'Email Marketing'],
    modules: [
      { name: 'Digital Marketing Fundamentals', duration: '1 week', difficulty: 'Beginner' },
      { name: 'Search Engine Optimization', duration: '2 weeks', difficulty: 'Beginner' },
      { name: 'Pay-Per-Click Advertising', duration: '2 weeks', difficulty: 'Intermediate' },
      { name: 'Social Media Marketing', duration: '2 weeks', difficulty: 'Beginner' },
      { name: 'Content Marketing Strategy', duration: '2 weeks', difficulty: 'Intermediate' },
      { name: 'Analytics & Optimization', duration: '2 weeks', difficulty: 'Intermediate' }
    ],
    totalDuration: '11 weeks',
    difficulty: 'Beginner to Intermediate',
    certification: true,
    practicalProjects: 3
  }
]

function generateLearningPaths(careerGoal: string, currentSkills: any, preferences: any) {
  // Filter learning paths based on career goal
  let relevantPaths = learningDatabase.filter(path => 
    path.targetCareers.some(career => 
      career.toLowerCase().includes(careerGoal.toLowerCase()) ||
      careerGoal.toLowerCase().includes(career.toLowerCase())
    )
  )
  
  // If no direct matches, include related paths
  if (relevantPaths.length === 0) {
    relevantPaths = learningDatabase.slice(0, 2) // Return top 2 as fallback
  }
  
  // Customize paths based on current skills
  return relevantPaths.map(path => ({
    ...path,
    customized: true,
    skipableModules: identifySkipableModules(path, currentSkills),
    prioritySkills: identifyPrioritySkills(path, currentSkills)
  }))
}

function addTimelines(paths: any[], currentSkills: any) {
  return paths.map(path => {
    const skipableModules = path.skipableModules || []
    const remainingModules = path.modules.filter((module, index) => 
      !skipableModules.includes(index)
    )
    
    const adjustedDuration = remainingModules.reduce((total, module) => {
      const weeks = parseInt(module.duration.split(' ')[0])
      return total + weeks
    }, 0)
    
    return {
      ...path,
      originalDuration: path.totalDuration,
      adjustedDuration: `${adjustedDuration} weeks`,
      remainingModules,
      timeSkipped: `${parseInt(path.totalDuration) - adjustedDuration} weeks saved`
    }
  })
}

function addDifficultyLevels(paths: any[]) {
  return paths.map(path => ({
    ...path,
    difficultyScore: calculateDifficultyScore(path),
    learningIntensity: calculateLearningIntensity(path),
    successRate: estimateSuccessRate(path)
  }))
}

function identifySkipableModules(path: any, currentSkills: any): number[] {
  const skipable = []
  
  path.modules.forEach((module, index) => {
    // Check if user already has skills related to this module
    const moduleSkills = getModuleSkills(module.name)
    const hasSkills = moduleSkills.some(skill => 
      currentSkills && currentSkills[skill] && currentSkills[skill] >= 3
    )
    
    if (hasSkills) {
      skipable.push(index)
    }
  })
  
  return skipable
}

function identifyPrioritySkills(path: any, currentSkills: any): string[] {
  // Identify skills that are most important for the career path
  const priority = []
  
  path.skills.forEach(skill => {
    const userLevel = currentSkills && currentSkills[skill] ? currentSkills[skill] : 0
    if (userLevel < 3) { // If skill level is below intermediate
      priority.push(skill)
    }
  })
  
  return priority.slice(0, 3) // Top 3 priority skills
}

function getModuleSkills(moduleName: string): string[] {
  const skillMap = {
    'HTML & CSS Fundamentals': ['Web Development'],
    'JavaScript Essentials': ['Programming (Python, Java, etc.)'],
    'React Development': ['Web Development'],
    'Python for Data Science': ['Programming (Python, Java, etc.)'],
    'Statistics & Probability': ['Data Analysis & Statistics'],
    'Digital Marketing Fundamentals': ['Communication']
  }
  
  return skillMap[moduleName] || []
}

function calculateDifficultyScore(path: any): number {
  const difficultyMap = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 }
  const scores = path.modules.map(module => difficultyMap[module.difficulty] || 2)
  const avgScore = scores.reduce((sum, score) => sum + score, 0) / scores.length
  
  return Math.round(avgScore * 10) / 10
}

function calculateLearningIntensity(path: any): string {
  const totalWeeks = parseInt(path.adjustedDuration || path.totalDuration)
  const moduleCount = path.modules.length
  
  const intensity = moduleCount / totalWeeks
  
  if (intensity > 0.6) return 'High'
  if (intensity > 0.3) return 'Medium'
  return 'Low'
}

function estimateSuccessRate(path: any): number {
  // Simulate success rate based on difficulty and length
  const baseDifficulty = path.difficultyScore
  const lengthFactor = parseInt(path.totalDuration) > 12 ? 0.8 : 1
  const projectFactor = path.practicalProjects > 3 ? 1.1 : 1
  
  const successRate = (95 - (baseDifficulty * 10)) * lengthFactor * projectFactor
  return Math.round(Math.min(Math.max(successRate, 60), 95))
}

function calculateOverallTimeline(paths: any[]): string {
  if (paths.length === 0) return '0 weeks'
  
  const avgWeeks = paths.reduce((sum, path) => {
    const weeks = parseInt(path.adjustedDuration || path.totalDuration)
    return sum + weeks
  }, 0) / paths.length
  
  return `${Math.round(avgWeeks)} weeks average`
}

function analyzeSkillGaps(careerGoal: string, currentSkills: any) {
  // Find required skills for the career goal
  const careerPath = learningDatabase.find(path =>
    path.targetCareers.some(career =>
      career.toLowerCase().includes(careerGoal.toLowerCase())
    )
  )
  
  if (!careerPath) {
    return { gaps: [], analysis: 'No specific analysis available for this career goal' }
  }
  
  const gaps = careerPath.skills.filter(skill => {
    const userLevel = currentSkills && currentSkills[skill] ? currentSkills[skill] : 0
    return userLevel < 3 // Below intermediate level
  })
  
  return {
    gaps,
    analysis: `You have ${gaps.length} skill gaps to address for ${careerGoal}`,
    priority: gaps.slice(0, 3),
    timeToFill: `${gaps.length * 2}-${gaps.length * 4} weeks`
  }
}

function getPopularLearningPaths() {
  return learningDatabase.map(path => ({
    ...path,
    popularity: Math.floor(Math.random() * 1000) + 500,
    rating: (Math.random() * 1 + 4).toFixed(1),
    students: Math.floor(Math.random() * 5000) + 1000
  }))
}

function getLearningCategories() {
  return [
    'Programming',
    'Data Science',
    'Marketing',
    'Design',
    'Finance',
    'Cloud Technology',
    'Cybersecurity',
    'Project Management'
  ]
}

function getFeaturedCourses() {
  return learningDatabase.slice(0, 3).map(course => ({
    ...course,
    featured: true,
    discount: Math.floor(Math.random() * 30) + 10,
    rating: (Math.random() * 0.5 + 4.5).toFixed(1)
  }))
}