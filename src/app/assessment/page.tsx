"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import Link from "next/link"

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [responses, setResponses] = useState({
    skills: {},
    personality: {},
    interests: {},
    preferences: {}
  })

  const totalSteps = 4
  const progressPercentage = (currentStep / totalSteps) * 100

  const skillsData = {
    technical: [
      { name: "Programming (Python, Java, etc.)", level: 3 },
      { name: "Data Analysis & Statistics", level: 2 },
      { name: "Web Development", level: 4 },
      { name: "Database Management", level: 2 },
      { name: "Machine Learning/AI", level: 1 },
      { name: "Mobile App Development", level: 2 }
    ],
    soft: [
      { name: "Communication", level: 4 },
      { name: "Leadership", level: 3 },
      { name: "Problem Solving", level: 4 },
      { name: "Team Collaboration", level: 5 },
      { name: "Time Management", level: 3 },
      { name: "Critical Thinking", level: 4 }
    ]
  }

  const personalityQuestions = [
    {
      question: "I prefer working in a team rather than alone",
      options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      question: "I enjoy taking on leadership responsibilities", 
      options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      question: "I am comfortable with ambiguity and uncertainty",
      options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      question: "I prefer structured, routine work over creative tasks",
      options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    }
  ]

  const careerInterests = [
    "Technology & Software",
    "Healthcare & Medicine", 
    "Finance & Banking",
    "Education & Training",
    "Marketing & Communications",
    "Engineering & Manufacturing",
    "Government & Public Service",
    "Arts & Entertainment",
    "Consulting & Strategy",
    "Entrepreneurship & Startups",
    "Research & Development",
    "Non-profit & Social Impact"
  ]

  const workPreferences = {
    workEnvironment: ["Office-based", "Remote", "Hybrid", "Field work", "Client sites"],
    companySize: ["Startup (1-50)", "Small (51-200)", "Medium (201-1000)", "Large (1000+)", "Any size"],
    industryType: ["IT/Software", "Finance", "Healthcare", "Manufacturing", "Government", "Education", "Any industry"]
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkillLevel = (skillName: string, level: number) => {
    setResponses(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [skillName]: level
      }
    }))
  }

  const handlePersonalityResponse = (questionIndex: number, value: string) => {
    setResponses(prev => ({
      ...prev,
      personality: {
        ...prev.personality,
        [questionIndex]: value
      }
    }))
  }

  const renderSkillsStep = () => (
    <Card>
      <CardHeader>
        <CardTitle>Skills Assessment</CardTitle>
        <CardDescription>Rate your proficiency level in these areas (1 = Beginner, 5 = Expert)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-blue-600">Technical Skills</h3>
          <div className="space-y-6">
            {skillsData.technical.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-sm font-medium">{skill.name}</Label>
                  <span className="text-sm text-gray-500">Level: {responses.skills[skill.name] || skill.level}</span>
                </div>
                <Slider
                  value={[responses.skills[skill.name] || skill.level]}
                  onValueChange={(value) => handleSkillLevel(skill.name, value[0])}
                  max={5}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-green-600">Soft Skills</h3>
          <div className="space-y-6">
            {skillsData.soft.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-sm font-medium">{skill.name}</Label>
                  <span className="text-sm text-gray-500">Level: {responses.skills[skill.name] || skill.level}</span>
                </div>
                <Slider
                  value={[responses.skills[skill.name] || skill.level]}
                  onValueChange={(value) => handleSkillLevel(skill.name, value[0])}
                  max={5}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderPersonalityStep = () => (
    <Card>
      <CardHeader>
        <CardTitle>Personality Assessment</CardTitle>
        <CardDescription>Help us understand your work style and preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {personalityQuestions.map((q, index) => (
          <div key={index} className="space-y-3">
            <h3 className="font-medium">{q.question}</h3>
            <RadioGroup 
              value={responses.personality[index]} 
              onValueChange={(value) => handlePersonalityResponse(index, value)}
            >
              {q.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`q${index}-${optionIndex}`} />
                  <Label htmlFor={`q${index}-${optionIndex}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </CardContent>
    </Card>
  )

  const renderInterestsStep = () => (
    <Card>
      <CardHeader>
        <CardTitle>Career Interests</CardTitle>
        <CardDescription>Select the industries and fields that interest you most</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {careerInterests.map((interest, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Checkbox 
                id={`interest-${index}`}
                checked={responses.interests[interest] || false}
                onCheckedChange={(checked) => {
                  setResponses(prev => ({
                    ...prev,
                    interests: {
                      ...prev.interests,
                      [interest]: checked
                    }
                  }))
                }}
              />
              <Label htmlFor={`interest-${index}`} className="text-sm">{interest}</Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const renderPreferencesStep = () => (
    <Card>
      <CardHeader>
        <CardTitle>Work Preferences</CardTitle>
        <CardDescription>Tell us about your ideal work environment and conditions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <h3 className="font-semibold mb-4">Preferred Work Environment</h3>
          <RadioGroup>
            {workPreferences.workEnvironment.map((env, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={env} id={`env-${index}`} />
                <Label htmlFor={`env-${index}`}>{env}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Company Size Preference</h3>
          <RadioGroup>
            {workPreferences.companySize.map((size, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={size} id={`size-${index}`} />
                <Label htmlFor={`size-${index}`}>{size}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Industry Focus</h3>
          <RadioGroup>
            {workPreferences.industryType.map((industry, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={industry} id={`industry-${index}`} />
                <Label htmlFor={`industry-${index}`}>{industry}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                AI
              </div>
              <span className="text-xl font-bold text-gray-900">Career Advisor</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost">Back to Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Career Assessment</h1>
              <p className="text-gray-600">Step {currentStep} of {totalSteps}</p>
            </div>
            <Badge variant="secondary">
              {Math.round(progressPercentage)}% Complete
            </Badge>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          {currentStep === 1 && renderSkillsStep()}
          {currentStep === 2 && renderPersonalityStep()}
          {currentStep === 3 && renderInterestsStep()}
          {currentStep === 4 && renderPreferencesStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            {currentStep < totalSteps ? (
              <Button onClick={handleNext}>
                Next Step
              </Button>
            ) : (
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Complete Assessment
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center space-x-8 mt-12">
          <div className={`flex items-center space-x-2 ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}>1</div>
            <span className="text-sm font-medium">Skills</span>
          </div>
          <div className={`flex items-center space-x-2 ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}>2</div>
            <span className="text-sm font-medium">Personality</span>
          </div>
          <div className={`flex items-center space-x-2 ${currentStep >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}>3</div>
            <span className="text-sm font-medium">Interests</span>
          </div>
          <div className={`flex items-center space-x-2 ${currentStep >= 4 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep >= 4 ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}>4</div>
            <span className="text-sm font-medium">Preferences</span>
          </div>
        </div>
      </div>
    </div>
  )
}