"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function DashboardPage() {
  const [user] = useState({
    name: "Priya Sharma",
    assessmentCompleted: 75,
    skillsAssessed: 12,
    careersExplored: 8,
    learningHours: 24
  })

  const recentActivity = [
    { action: "Completed Technical Skills Assessment", time: "2 hours ago", type: "assessment" },
    { action: "Explored Software Engineer career path", time: "1 day ago", type: "career" },
    { action: "Started Python Programming course", time: "3 days ago", type: "learning" },
    { action: "Updated personality profile", time: "1 week ago", type: "profile" }
  ]

  const topCareerMatches = [
    {
      title: "Software Engineer",
      match: 92,
      growth: "+15%",
      salary: "₹8-15 LPA",
      description: "Build and maintain software applications using modern technologies",
      skills: ["Python", "JavaScript", "Problem Solving"]
    },
    {
      title: "Data Scientist", 
      match: 88,
      growth: "+22%",
      salary: "₹12-20 LPA", 
      description: "Analyze complex data to drive business insights and decisions",
      skills: ["Statistics", "Python", "Machine Learning"]
    },
    {
      title: "Product Manager",
      match: 84,
      growth: "+18%",
      salary: "₹15-25 LPA",
      description: "Lead product development from conception to market launch",
      skills: ["Strategy", "Communication", "Analytics"]
    }
  ]

  const skillsProgress = [
    { name: "Technical Skills", current: 8, total: 12, percentage: 67 },
    { name: "Soft Skills", current: 6, total: 10, percentage: 60 },
    { name: "Industry Knowledge", current: 4, total: 8, percentage: 50 },
    { name: "Communication", current: 7, total: 10, percentage: 70 }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                AI
              </div>
              <span className="text-xl font-bold text-gray-900">Career Advisor</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/assessment" className="text-gray-600 hover:text-gray-900 transition-colors">Assessment</Link>
              <Link href="/careers" className="text-gray-600 hover:text-gray-900 transition-colors">Careers</Link>
              <Link href="/learning" className="text-gray-600 hover:text-gray-900 transition-colors">Learning</Link>
              <Link href="/insights" className="text-gray-600 hover:text-gray-900 transition-colors">Insights</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">Continue building your career roadmap with personalized AI guidance</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assessment Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.assessmentCompleted}%</div>
              <Progress value={user.assessmentCompleted} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Skills Assessed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.skillsAssessed}</div>
              <p className="text-xs text-muted-foreground">+2 this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Careers Explored</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.careersExplored}</div>
              <p className="text-xs text-muted-foreground">+3 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.learningHours}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="careers">Top Matches</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Assessment Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Continue Your Assessment</CardTitle>
                  <CardDescription>Complete your profile to get better recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Technical Skills</span>
                    <Badge variant="secondary">Completed</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Personality Assessment</span>
                    <Badge variant="secondary">Completed</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Career Interests</span>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Industry Preferences</span>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                  <Link href="/assessment">
                    <Button className="w-full mt-4">Continue Assessment</Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Jump to important areas of your career journey</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/careers">
                    <Button variant="outline" className="w-full justify-start">
                      Explore Career Paths
                    </Button>
                  </Link>
                  <Link href="/learning">
                    <Button variant="outline" className="w-full justify-start">
                      Find Learning Resources
                    </Button>
                  </Link>
                  <Link href="/insights">
                    <Button variant="outline" className="w-full justify-start">
                      View Market Insights
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full justify-start">
                    Schedule Career Consultation
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="careers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Top Career Matches</CardTitle>
                <CardDescription>AI-powered recommendations based on your profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {topCareerMatches.map((career, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{career.title}</h3>
                          <p className="text-gray-600 text-sm">{career.description}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={career.match >= 90 ? "default" : "secondary"}>
                            {career.match}% Match
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <span className="text-sm text-gray-500">Growth Rate</span>
                          <p className="font-medium text-green-600">{career.growth}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Salary Range</span>
                          <p className="font-medium">{career.salary}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {career.skills.map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <Link href={`/careers/${career.title.toLowerCase().replace(' ', '-')}`}>
                        <Button variant="outline" size="sm">Learn More</Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Skills Progress</CardTitle>
                <CardDescription>Track your skill development across different areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {skillsProgress.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-gray-500">{skill.current}/{skill.total}</span>
                      </div>
                      <Progress value={skill.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
                <Link href="/learning">
                  <Button className="w-full mt-6">Improve Skills</Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest actions and progress updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'assessment' ? 'bg-blue-500' :
                        activity.type === 'career' ? 'bg-green-500' :
                        activity.type === 'learning' ? 'bg-purple-500' : 'bg-gray-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}