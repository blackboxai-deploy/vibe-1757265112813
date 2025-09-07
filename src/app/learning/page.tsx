"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function LearningPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")

  const learningPaths = [
    {
      title: "Full Stack Web Development",
      category: "Programming",
      level: "Beginner to Intermediate",
      duration: "6 months",
      progress: 35,
      description: "Master modern web development with React, Node.js, and databases",
      skills: ["HTML/CSS", "JavaScript", "React", "Node.js", "MongoDB", "Git"],
      modules: 12,
      rating: 4.8,
      students: 2543,
      certificate: true,
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9cfafcf8-14ee-41b9-a750-54c6e1ec3b91.png"
    },
    {
      title: "Data Science & Analytics",
      category: "Data Science",
      level: "Intermediate",
      duration: "8 months",
      progress: 0,
      description: "Learn data analysis, machine learning, and statistical modeling",
      skills: ["Python", "Pandas", "NumPy", "Scikit-learn", "Tableau", "SQL"],
      modules: 16,
      rating: 4.9,
      students: 1876,
      certificate: true,
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/eaeb8b4b-e9a7-4212-a19d-15d7a3eee511.png"
    },
    {
      title: "Digital Marketing Mastery",
      category: "Marketing",
      level: "Beginner",
      duration: "4 months",
      progress: 60,
      description: "Complete digital marketing from SEO to social media advertising",
      skills: ["SEO", "Google Ads", "Facebook Ads", "Content Marketing", "Analytics"],
      modules: 10,
      rating: 4.7,
      students: 3421,
      certificate: true,
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7898a69c-9675-4d19-b157-cd9ffd58fd30.png"
    },
    {
      title: "Financial Analysis & Modeling",
      category: "Finance",
      level: "Intermediate",
      duration: "5 months",
      progress: 20,
      description: "Master financial modeling, valuation, and investment analysis",
      skills: ["Excel", "Financial Modeling", "Valuation", "Risk Analysis", "Bloomberg"],
      modules: 14,
      rating: 4.6,
      students: 987,
      certificate: true,
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a557da16-531a-4de4-81e9-eb6561045edb.png"
    },
    {
      title: "UX/UI Design Fundamentals",
      category: "Design",
      level: "Beginner",
      duration: "4 months",
      progress: 0,
      description: "Create beautiful and functional user interfaces and experiences",
      skills: ["Figma", "Adobe XD", "Prototyping", "User Research", "Design Systems"],
      modules: 11,
      rating: 4.8,
      students: 2156,
      certificate: true,
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f72c316a-66b6-4bc4-bafd-15540c82df5e.png"
    },
    {
      title: "Cloud Computing with AWS",
      category: "Cloud Technology",
      level: "Intermediate",
      duration: "6 months",
      progress: 10,
      description: "Build and deploy scalable applications on Amazon Web Services",
      skills: ["AWS EC2", "S3", "Lambda", "Docker", "Kubernetes", "DevOps"],
      modules: 18,
      rating: 4.7,
      students: 1543,
      certificate: true,
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d400759d-faff-4e4a-83df-719184040aff.png"
    }
  ]

  const achievements = [
    { name: "First Course Completed", icon: "🎓", unlocked: true },
    { name: "Week Streak", icon: "🔥", unlocked: true },
    { name: "Skill Master", icon: "⭐", unlocked: false },
    { name: "Project Builder", icon: "🛠️", unlocked: true },
    { name: "Community Helper", icon: "🤝", unlocked: false },
    { name: "Speed Learner", icon: "⚡", unlocked: false }
  ]

  const currentGoals = [
    { task: "Complete React fundamentals module", progress: 80, deadline: "3 days" },
    { task: "Build portfolio project", progress: 45, deadline: "2 weeks" },
    { task: "Earn JavaScript certification", progress: 90, deadline: "1 week" },
    { task: "Practice coding challenges", progress: 60, deadline: "Ongoing" }
  ]

  const categories = ["all", "Programming", "Data Science", "Marketing", "Finance", "Design", "Cloud Technology"]
  const levels = ["all", "Beginner", "Intermediate", "Advanced"]

  const filteredPaths = learningPaths.filter(path => {
    const matchesSearch = path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         path.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         path.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === "all" || path.category === selectedCategory
    const matchesLevel = selectedLevel === "all" || path.level.includes(selectedLevel)
    
    return matchesSearch && matchesCategory && matchesLevel
  })

  const inProgressPaths = learningPaths.filter(path => path.progress > 0)

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
            <div className="flex items-center space-x-6">
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">Dashboard</Link>
              <Link href="/assessment" className="text-gray-600 hover:text-gray-900 transition-colors">Assessment</Link>
              <Link href="/careers" className="text-gray-600 hover:text-gray-900 transition-colors">Careers</Link>
              <Link href="/insights" className="text-gray-600 hover:text-gray-900 transition-colors">Insights</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Hub</h1>
          <p className="text-gray-600">Build the skills you need for your dream career</p>
        </div>

        <Tabs defaultValue="paths" className="space-y-6">
          <TabsList>
            <TabsTrigger value="paths">Learning Paths</TabsTrigger>
            <TabsTrigger value="progress">My Progress</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="paths" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Find Learning Paths</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    placeholder="Search courses, skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category === "all" ? "All Categories" : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map(level => (
                        <SelectItem key={level} value={level}>
                          {level === "all" ? "All Levels" : level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Learning Paths Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPaths.map((path, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <img 
                      src={path.image} 
                      alt={path.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.nextElementSibling?.classList.remove('hidden')
                      }}
                    />
                    <div className="hidden w-full h-48 bg-gradient-to-r from-blue-100 to-purple-100 rounded-t-lg flex items-center justify-center">
                      <span className="text-gray-500">{path.title}</span>
                    </div>
                    {path.certificate && (
                      <Badge className="absolute top-2 right-2 bg-green-600">
                        Certificate
                      </Badge>
                    )}
                  </div>
                  
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg">{path.title}</CardTitle>
                      <Badge variant="outline">{path.level}</Badge>
                    </div>
                    <CardDescription>{path.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-gray-500">Duration</span>
                        <p className="font-medium">{path.duration}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Modules</span>
                        <p className="font-medium">{path.modules}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Rating</span>
                        <p className="font-medium">⭐ {path.rating}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Students</span>
                        <p className="font-medium">{path.students.toLocaleString()}</p>
                      </div>
                    </div>

                    {path.progress > 0 && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{path.progress}%</span>
                        </div>
                        <Progress value={path.progress} />
                      </div>
                    )}

                    <div className="mb-4">
                      <span className="text-sm text-gray-500 block mb-2">Skills You'll Learn</span>
                      <div className="flex flex-wrap gap-1">
                        {path.skills.slice(0, 4).map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {path.skills.length > 4 && (
                          <span className="text-xs text-gray-500">+{path.skills.length - 4} more</span>
                        )}
                      </div>
                    </div>

                    <Button className="w-full" variant={path.progress > 0 ? "default" : "outline"}>
                      {path.progress > 0 ? "Continue Learning" : "Start Course"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current Goals */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Goals</CardTitle>
                  <CardDescription>Track your learning objectives</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentGoals.map((goal, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{goal.task}</span>
                        <span className="text-gray-500">{goal.deadline}</span>
                      </div>
                      <Progress value={goal.progress} />
                      <div className="text-xs text-gray-500 text-right">{goal.progress}% complete</div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Learning Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle>Learning Stats</CardTitle>
                  <CardDescription>Your learning journey overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Learning Hours</span>
                      <span className="font-medium">124 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Courses Completed</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Certificates Earned</span>
                      <span className="font-medium">2</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Current Streak</span>
                      <span className="font-medium">7 days 🔥</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Skills Mastered</span>
                      <span className="font-medium">8</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* In Progress Courses */}
            <Card>
              <CardHeader>
                <CardTitle>Courses in Progress</CardTitle>
                <CardDescription>Continue where you left off</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inProgressPaths.map((path, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{path.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{path.duration}</span>
                          <span>•</span>
                          <span>{path.modules} modules</span>
                        </div>
                        <div className="mt-2">
                          <Progress value={path.progress} className="h-2" />
                          <span className="text-xs text-gray-500">{path.progress}% complete</span>
                        </div>
                      </div>
                      <Button size="sm" className="ml-4">Continue</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Achievements</CardTitle>
                <CardDescription>Celebrate your learning milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {achievements.map((achievement, index) => (
                    <div key={index} className={`text-center p-4 rounded-lg border ${
                      achievement.unlocked 
                        ? 'bg-gradient-to-b from-yellow-50 to-yellow-100 border-yellow-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className={`text-4xl mb-2 ${!achievement.unlocked && 'grayscale opacity-50'}`}>
                        {achievement.icon}
                      </div>
                      <h3 className={`font-medium ${achievement.unlocked ? 'text-gray-900' : 'text-gray-400'}`}>
                        {achievement.name}
                      </h3>
                      {achievement.unlocked ? (
                        <Badge variant="secondary" className="mt-2">Unlocked</Badge>
                      ) : (
                        <Badge variant="outline" className="mt-2">Locked</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Next Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Coming Next</CardTitle>
                <CardDescription>Achievements you can unlock soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🎯</span>
                      <div>
                        <h4 className="font-medium">Goal Achiever</h4>
                        <p className="text-sm text-gray-600">Complete all current learning goals</p>
                      </div>
                    </div>
                    <Badge variant="outline">3/4 goals</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">⚡</span>
                      <div>
                        <h4 className="font-medium">Speed Learner</h4>
                        <p className="text-sm text-gray-600">Complete a course in under 2 weeks</p>
                      </div>
                    </div>
                    <Badge variant="outline">Progress: 60%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}