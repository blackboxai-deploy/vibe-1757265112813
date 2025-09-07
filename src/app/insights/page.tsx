"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import Link from "next/link"

export default function InsightsPage() {
  const salaryTrends = [
    { year: '2020', 'Software Engineer': 8, 'Data Scientist': 12, 'Product Manager': 15, 'Digital Marketer': 5 },
    { year: '2021', 'Software Engineer': 9, 'Data Scientist': 14, 'Product Manager': 17, 'Digital Marketer': 6 },
    { year: '2022', 'Software Engineer': 11, 'Data Scientist': 16, 'Product Manager': 19, 'Digital Marketer': 7 },
    { year: '2023', 'Software Engineer': 13, 'Data Scientist': 18, 'Product Manager': 22, 'Digital Marketer': 8 },
    { year: '2024', 'Software Engineer': 15, 'Data Scientist': 20, 'Product Manager': 25, 'Digital Marketer': 10 }
  ]

  const jobDemand = [
    { skill: 'Python', demand: 95, growth: '+25%' },
    { skill: 'JavaScript', demand: 88, growth: '+18%' },
    { skill: 'React', demand: 82, growth: '+22%' },
    { skill: 'Machine Learning', demand: 78, growth: '+35%' },
    { skill: 'Cloud Computing', demand: 75, growth: '+28%' },
    { skill: 'Data Analysis', demand: 72, growth: '+20%' },
    { skill: 'Digital Marketing', demand: 68, growth: '+15%' },
    { skill: 'UI/UX Design', demand: 65, growth: '+30%' }
  ]

  const industryGrowth = [
    { name: 'Technology', value: 35, color: '#3B82F6' },
    { name: 'Healthcare', value: 18, color: '#10B981' },
    { name: 'FinTech', value: 15, color: '#8B5CF6' },
    { name: 'E-commerce', value: 12, color: '#F59E0B' },
    { name: 'Education', value: 10, color: '#EF4444' },
    { name: 'Others', value: 10, color: '#6B7280' }
  ]

  const emergingRoles = [
    {
      title: "AI/ML Engineer",
      growth: "+45%",
      salary: "₹15-25 LPA",
      demand: "Very High",
      description: "Develop and deploy machine learning models and AI systems",
      skills: ["Python", "TensorFlow", "PyTorch", "MLOps"],
      companies: ["Google", "Amazon", "Microsoft", "OpenAI"]
    },
    {
      title: "Cloud Solutions Architect",
      growth: "+38%",
      salary: "₹20-35 LPA",
      demand: "High",
      description: "Design and implement cloud infrastructure solutions",
      skills: ["AWS", "Azure", "Docker", "Kubernetes"],
      companies: ["Amazon", "Microsoft", "IBM", "Accenture"]
    },
    {
      title: "Product Growth Manager",
      growth: "+32%",
      salary: "₹18-28 LPA",
      demand: "High",
      description: "Drive user acquisition and product expansion strategies",
      skills: ["Analytics", "A/B Testing", "Growth Hacking", "SQL"],
      companies: ["Meta", "Uber", "Spotify", "Netflix"]
    },
    {
      title: "Cybersecurity Analyst",
      growth: "+40%",
      salary: "₹12-22 LPA",
      demand: "Very High",
      description: "Protect organizations from cyber threats and vulnerabilities",
      skills: ["Security", "Penetration Testing", "Risk Assessment"],
      companies: ["Cisco", "IBM", "Palo Alto", "CrowdStrike"]
    }
  ]

  const marketInsights = [
    {
      title: "Remote Work Revolution",
      impact: "High",
      description: "70% of Indian companies now offer remote or hybrid work options, creating new opportunities across geographic boundaries.",
      actionable: "Develop strong digital communication and collaboration skills"
    },
    {
      title: "AI Skills Premium",
      impact: "Very High", 
      description: "Professionals with AI/ML skills earn 40-60% more than their peers in similar roles.",
      actionable: "Consider adding AI/ML courses to your learning path"
    },
    {
      title: "Green Tech Growth",
      impact: "Medium",
      description: "Renewable energy and sustainability roles are growing 25% year-over-year in India.",
      actionable: "Explore environmental technology and clean energy careers"
    },
    {
      title: "Startup Ecosystem Boom",
      impact: "High",
      description: "India's startup ecosystem is the 3rd largest globally, creating diverse opportunities for early-career professionals.",
      actionable: "Consider startup experience for rapid skill development"
    }
  ]

  const regionData = [
    { city: 'Bangalore', jobs: 45, salary: '₹12-18 LPA', growth: '+20%' },
    { city: 'Pune', jobs: 32, salary: '₹10-16 LPA', growth: '+18%' },
    { city: 'Hyderabad', jobs: 28, salary: '₹9-15 LPA', growth: '+22%' },
    { city: 'Chennai', jobs: 25, salary: '₹8-14 LPA', growth: '+15%' },
    { city: 'Mumbai', jobs: 38, salary: '₹11-17 LPA', growth: '+12%' },
    { city: 'Delhi NCR', jobs: 40, salary: '₹10-16 LPA', growth: '+14%' }
  ]

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
              <Link href="/learning" className="text-gray-600 hover:text-gray-900 transition-colors">Learning</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Market Insights</h1>
          <p className="text-gray-600">Real-time intelligence on India's job market and career trends</p>
        </div>

        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList>
            <TabsTrigger value="trends">Market Trends</TabsTrigger>
            <TabsTrigger value="skills">In-Demand Skills</TabsTrigger>
            <TabsTrigger value="emerging">Emerging Roles</TabsTrigger>
            <TabsTrigger value="regional">Regional Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-6">
            {/* Key Market Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Key Market Insights</CardTitle>
                <CardDescription>Critical trends shaping India's job market</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {marketInsights.map((insight, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{insight.title}</h3>
                        <Badge variant={insight.impact === 'Very High' ? 'default' : 
                                      insight.impact === 'High' ? 'secondary' : 'outline'}>
                          {insight.impact} Impact
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                      <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                        💡 Action: {insight.actionable}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Salary Trends Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Salary Trends by Role (LPA)</CardTitle>
                <CardDescription>Average salary growth across key positions in India</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salaryTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`₹${value} LPA`]} />
                      <Line type="monotone" dataKey="Software Engineer" stroke="#3B82F6" strokeWidth={2} />
                      <Line type="monotone" dataKey="Data Scientist" stroke="#10B981" strokeWidth={2} />
                      <Line type="monotone" dataKey="Product Manager" stroke="#8B5CF6" strokeWidth={2} />
                      <Line type="monotone" dataKey="Digital Marketer" stroke="#F59E0B" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Industry Growth Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Industry Growth Distribution</CardTitle>
                <CardDescription>Job growth by industry sector in India</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={industryGrowth}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({name, value}) => `${name}: ${value}%`}
                        >
                          {industryGrowth.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-3">
                    {industryGrowth.map((industry, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded`} style={{backgroundColor: industry.color}} />
                          <span className="font-medium">{industry.name}</span>
                        </div>
                        <span className="text-gray-600">{industry.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Most In-Demand Skills</CardTitle>
                <CardDescription>Skills with highest job demand and growth potential</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobDemand.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{item.skill}</span>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-green-600">
                            {item.growth}
                          </Badge>
                          <span className="text-sm text-gray-600">{item.demand}%</span>
                        </div>
                      </div>
                      <Progress value={item.demand} className="h-2" />
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">💡 Skill Strategy Tip</h3>
                  <p className="text-blue-800 text-sm">
                    Focus on combination skills like "Python + Machine Learning" or "React + Cloud Computing" 
                    for maximum career impact and salary potential.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Skills vs Salary Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Skills Demand vs Growth Rate</CardTitle>
                <CardDescription>Higher demand skills with strong growth potential</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={jobDemand} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="skill" type="category" width={120} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Demand']} />
                      <Bar dataKey="demand" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="emerging" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Emerging High-Growth Roles</h2>
              <p className="text-gray-600">New career opportunities with exceptional growth potential</p>
            </div>

            <div className="grid gap-6">
              {emergingRoles.map((role, index) => (
                <Card key={index} className="border-l-4 border-l-green-500">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-1">{role.title}</CardTitle>
                        <CardDescription>{role.description}</CardDescription>
                      </div>
                      <Badge className="bg-green-600">
                        {role.growth} Growth
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-gray-500">Salary Range</span>
                        <p className="font-medium">{role.salary}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Job Demand</span>
                        <p className="font-medium">{role.demand}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Growth Rate</span>
                        <p className="font-medium text-green-600">{role.growth}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-sm text-gray-500 block mb-2">Key Skills Required</span>
                      <div className="flex flex-wrap gap-2">
                        {role.skills.map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-sm text-gray-500 block mb-2">Top Hiring Companies</span>
                      <div className="flex flex-wrap gap-2">
                        {role.companies.map((company, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {company}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link href="/careers">
                        <Button size="sm">Explore Path</Button>
                      </Link>
                      <Link href="/learning">
                        <Button variant="outline" size="sm">Learn Skills</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="regional" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Regional Job Market Analysis</CardTitle>
                <CardDescription>Tech job opportunities across major Indian cities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {regionData.map((region, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{region.city}</h3>
                        <div className="grid grid-cols-3 gap-4 mt-2 text-sm">
                          <div>
                            <span className="text-gray-500">Job Openings</span>
                            <p className="font-medium">{region.jobs}K+</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Avg Salary</span>
                            <p className="font-medium">{region.salary}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">YoY Growth</span>
                            <p className="font-medium text-green-600">{region.growth}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Regional Comparison Chart */}
            <Card>
              <CardHeader>
                <CardTitle>City-wise Job Opportunities</CardTitle>
                <CardDescription>Tech job openings comparison across cities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={regionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="city" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value}K jobs`]} />
                      <Bar dataKey="jobs" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regional Career Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-900">🚀 Best for Tech Startups</h3>
                    <p className="text-blue-800 text-sm mt-1">
                      <strong>Bangalore, Pune</strong> - Highest startup density and venture capital activity
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-900">💰 Best for Salary Growth</h3>
                    <p className="text-green-800 text-sm mt-1">
                      <strong>Hyderabad, Chennai</strong> - Rapid salary growth with lower cost of living
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-semibold text-purple-900">🏢 Best for MNCs</h3>
                    <p className="text-purple-800 text-sm mt-1">
                      <strong>Mumbai, Delhi NCR</strong> - Largest concentration of multinational companies
                    </p>
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