"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function CareersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("all")
  const [selectedExperience, setSelectedExperience] = useState("all")
  const [selectedSalary, setSelectedSalary] = useState("all")

  const careerPaths = [
    {
      title: "Software Engineer",
      industry: "Technology",
      experience: "Entry Level",
      salary: "₹8-15 LPA",
      growth: "+15%",
      match: 92,
      description: "Design, develop, and maintain software applications using modern programming languages and frameworks.",
      skills: ["Python", "JavaScript", "React", "Node.js", "Databases"],
      companies: ["Infosys", "TCS", "Wipro", "Microsoft", "Google"],
      education: "B.Tech/B.E in Computer Science or related field",
      trending: true
    },
    {
      title: "Data Scientist",
      industry: "Technology",
      experience: "Mid Level",
      salary: "₹12-20 LPA",
      growth: "+22%",
      match: 88,
      description: "Analyze complex data to extract insights and drive business decisions using statistical methods and machine learning.",
      skills: ["Python", "R", "Statistics", "Machine Learning", "SQL"],
      companies: ["Flipkart", "Amazon", "Myntra", "PayTM", "Ola"],
      education: "B.Tech/M.Tech with strong mathematics background",
      trending: true
    },
    {
      title: "Product Manager",
      industry: "Technology",
      experience: "Mid Level", 
      salary: "₹15-25 LPA",
      growth: "+18%",
      match: 84,
      description: "Lead product development from conception to launch, working with cross-functional teams.",
      skills: ["Strategy", "Analytics", "Communication", "Leadership", "Market Research"],
      companies: ["Swiggy", "Zomato", "Paytm", "Byju's", "Unacademy"],
      education: "MBA or B.Tech with business acumen",
      trending: false
    },
    {
      title: "Digital Marketing Specialist",
      industry: "Marketing",
      experience: "Entry Level",
      salary: "₹5-12 LPA", 
      growth: "+20%",
      match: 78,
      description: "Create and execute digital marketing campaigns across various online platforms and channels.",
      skills: ["SEO", "Google Ads", "Social Media", "Content Marketing", "Analytics"],
      companies: ["Ogilvy", "Dentsu", "Publicis", "WPP", "Havas"],
      education: "Any bachelor's degree with marketing specialization",
      trending: true
    },
    {
      title: "Financial Analyst",
      industry: "Finance",
      experience: "Entry Level",
      salary: "₹6-14 LPA",
      growth: "+12%",
      match: 75,
      description: "Analyze financial data, create reports, and provide insights for investment and business decisions.",
      skills: ["Excel", "Financial Modeling", "Valuation", "SQL", "Accounting"],
      companies: ["HDFC Bank", "ICICI", "Axis Bank", "Kotak Mahindra", "SBI"],
      education: "B.Com, BBA, or related field with CFA/FRM preferred",
      trending: false
    },
    {
      title: "UX/UI Designer",
      industry: "Design",
      experience: "Entry Level",
      salary: "₹7-16 LPA",
      growth: "+25%",
      match: 82,
      description: "Design user interfaces and experiences for web and mobile applications with focus on usability.",
      skills: ["Figma", "Adobe XD", "Prototyping", "User Research", "Design Systems"],
      companies: ["Razorpay", "Freshworks", "Zerodha", "Dream11", "PhonePe"],
      education: "Design degree or portfolio-based with strong UX foundation",
      trending: true
    }
  ]

  const industries = ["all", "Technology", "Finance", "Healthcare", "Marketing", "Design", "Consulting"]
  const experienceLevels = ["all", "Entry Level", "Mid Level", "Senior Level"]
  const salaryRanges = ["all", "₹5-10 LPA", "₹10-15 LPA", "₹15-20 LPA", "₹20+ LPA"]

  const filteredCareers = careerPaths.filter(career => {
    const matchesSearch = career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         career.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         career.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesIndustry = selectedIndustry === "all" || career.industry === selectedIndustry
    const matchesExperience = selectedExperience === "all" || career.experience === selectedExperience
    const matchesSalary = selectedSalary === "all" || career.salary.includes(selectedSalary.split("-")[0].replace("₹", ""))
    
    return matchesSearch && matchesIndustry && matchesExperience && matchesSalary
  })

  const trendingCareers = careerPaths.filter(career => career.trending)

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
              <Link href="/learning" className="text-gray-600 hover:text-gray-900 transition-colors">Learning</Link>
              <Link href="/insights" className="text-gray-600 hover:text-gray-900 transition-colors">Insights</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Career Explorer</h1>
          <p className="text-gray-600">Discover career paths tailored to your skills and interests</p>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Careers</TabsTrigger>
            <TabsTrigger value="matches">Top Matches</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </TabsList>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Find Your Perfect Career</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <Input
                  placeholder="Search careers, skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map(industry => (
                      <SelectItem key={industry} value={industry}>
                        {industry === "all" ? "All Industries" : industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                  <SelectTrigger>
                    <SelectValue placeholder="Experience" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceLevels.map(level => (
                      <SelectItem key={level} value={level}>
                        {level === "all" ? "All Levels" : level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedSalary} onValueChange={setSelectedSalary}>
                  <SelectTrigger>
                    <SelectValue placeholder="Salary Range" />
                  </SelectTrigger>
                  <SelectContent>
                    {salaryRanges.map(range => (
                      <SelectItem key={range} value={range}>
                        {range === "all" ? "All Ranges" : range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <TabsContent value="all" className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-gray-600">{filteredCareers.length} careers found</p>
            </div>
            
            <div className="grid gap-6">
              {filteredCareers.map((career, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-2 flex items-center gap-2">
                          {career.title}
                          {career.trending && <Badge variant="secondary" className="text-xs">Trending</Badge>}
                        </CardTitle>
                        <CardDescription className="text-gray-600 mb-3">
                          {career.description}
                        </CardDescription>
                      </div>
                      <Badge variant={career.match >= 85 ? "default" : "outline"}>
                        {career.match}% Match
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-gray-500">Industry</span>
                        <p className="font-medium">{career.industry}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Experience</span>
                        <p className="font-medium">{career.experience}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Salary</span>
                        <p className="font-medium">{career.salary}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Growth</span>
                        <p className="font-medium text-green-600">{career.growth}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-sm text-gray-500 block mb-2">Key Skills Required</span>
                      <div className="flex flex-wrap gap-2">
                        {career.skills.map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-sm text-gray-500 block mb-2">Top Hiring Companies</span>
                      <div className="flex flex-wrap gap-2">
                        {career.companies.slice(0, 3).map((company, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {company}
                          </Badge>
                        ))}
                        {career.companies.length > 3 && (
                          <span className="text-sm text-gray-500">+{career.companies.length - 3} more</span>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-sm text-gray-500 block mb-1">Education Requirements</span>
                      <p className="text-sm">{career.education}</p>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/careers/${career.title.toLowerCase().replace(/ /g, '-')}`}>
                        <Button variant="default" size="sm">Learn More</Button>
                      </Link>
                      <Link href="/learning">
                        <Button variant="outline" size="sm">Skill Roadmap</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="matches" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Best Career Matches</h2>
              <p className="text-gray-600">Based on your assessment and profile</p>
            </div>
            
            <div className="grid gap-6">
              {careerPaths.filter(career => career.match >= 80).map((career, index) => (
                <Card key={index} className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-2">{career.title}</CardTitle>
                        <CardDescription>{career.description}</CardDescription>
                      </div>
                      <Badge className="bg-blue-600">
                        {career.match}% Match
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-gray-500">Salary</span>
                        <p className="font-medium">{career.salary}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Growth</span>
                        <p className="font-medium text-green-600">{career.growth}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Experience</span>
                        <p className="font-medium">{career.experience}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/careers/${career.title.toLowerCase().replace(/ /g, '-')}`}>
                        <Button size="sm">Explore Career</Button>
                      </Link>
                      <Link href="/learning">
                        <Button variant="outline" size="sm">Get Skills</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Trending Careers</h2>
              <p className="text-gray-600">High-growth opportunities in India's job market</p>
            </div>
            
            <div className="grid gap-6">
              {trendingCareers.map((career, index) => (
                <Card key={index} className="border-l-4 border-l-green-500">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-2 flex items-center gap-2">
                          {career.title}
                          <Badge variant="secondary">🔥 Trending</Badge>
                        </CardTitle>
                        <CardDescription>{career.description}</CardDescription>
                      </div>
                      <Badge variant="outline">
                        {career.growth} Growth
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-gray-500">Salary Range</span>
                        <p className="font-medium">{career.salary}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Match Score</span>
                        <p className="font-medium">{career.match}%</p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <span className="text-sm text-gray-500 block mb-2">Hot Skills</span>
                      <div className="flex flex-wrap gap-2">
                        {career.skills.slice(0, 3).map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/careers/${career.title.toLowerCase().replace(/ /g, '-')}`}>
                        <Button size="sm">Learn More</Button>
                      </Link>
                      <Link href="/assessment">
                        <Button variant="outline" size="sm">Check Fit</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}