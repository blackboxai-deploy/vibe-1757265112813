"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function HomePage() {
  const features = [
    {
      title: "AI-Powered Assessment",
      description: "Comprehensive skills and personality analysis tailored for Indian students",
      badge: "Smart Analysis"
    },
    {
      title: "Personalized Recommendations", 
      description: "Career paths aligned with your unique profile and market demands",
      badge: "Custom Guidance"
    },
    {
      title: "Market Intelligence",
      description: "Real-time insights on job trends, salaries, and emerging opportunities",
      badge: "Live Data"
    },
    {
      title: "Learning Pathways",
      description: "Curated skill development roadmaps with progress tracking",
      badge: "Growth Focus"
    }
  ]

  const stats = [
    { label: "Career Paths Analyzed", value: "500+" },
    { label: "Skills Mapped", value: "1000+" },
    { label: "Students Guided", value: "10K+" },
    { label: "Success Rate", value: "92%" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                AI
              </div>
              <span className="text-xl font-bold text-gray-900">Career Advisor</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</Link>
              <Link href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</Link>
              <Link href="/dashboard">
                <Button variant="default" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-6">
            AI-Powered Career Guidance
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Discover Your Ideal 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Career Path</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Leverage advanced AI to map your skills, explore personalized career recommendations, and prepare for India's evolving job market with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3">
                Start Your Assessment
              </Button>
            </Link>
            <Link href="/careers">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-3">
                Explore Careers
              </Button>
            </Link>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            <img 
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/468fdaf6-6b0a-4995-9d78-5eb4e495c7be.png" 
              alt="AI Career Advisor dashboard showing personalized career recommendations and skills analysis for Indian students"
              className="w-full rounded-2xl shadow-2xl"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.nextElementSibling?.classList.remove('hidden')
              }}
            />
            <div className="hidden w-full h-96 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
              <span className="text-gray-500 text-lg">Career Guidance Dashboard Preview</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Key Features</Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Comprehensive Career Guidance</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to make informed career decisions and succeed in India's dynamic job market
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-3">{feature.badge}</Badge>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Shape Your Future?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of students who have discovered their ideal career path with AI-powered guidance
          </p>
          <Link href="/assessment">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Take Assessment Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  AI
                </div>
                <span className="text-xl font-bold">Career Advisor</span>
              </div>
              <p className="text-gray-400">
                Empowering Indian students with AI-driven career guidance for the future of work.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link href="/assessment" className="hover:text-white transition-colors">Assessment</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Career Explorer</Link></li>
                <li><Link href="/learning" className="hover:text-white transition-colors">Learning Hub</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/insights" className="hover:text-white transition-colors">Market Insights</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Career Guide</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Success Stories</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Support</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AI Career Advisor. All rights reserved. Built for Indian students.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}