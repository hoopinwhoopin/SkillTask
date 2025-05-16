"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, Filter, Search, Users } from "lucide-react"

export default function ExplorePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      try {
        const user = localStorage.getItem("skillkart_user")
        if (!user) {
          router.push("/login?callbackUrl=/explore")
          return
        }
        setIsAuthenticated(true)
      } catch (error) {
        console.error("Auth check error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const roadmaps = [
    {
      id: "web-dev",
      title: "Web Development Fundamentals",
      description: "HTML, CSS, JavaScript, and responsive design",
      level: "Beginner",
      weeks: 10,
      learners: 1245,
      category: "web-development",
    },
    {
      id: "ui-design",
      title: "UI/UX Design Basics",
      description: "Design principles, wireframing, and prototyping",
      level: "Beginner",
      weeks: 8,
      learners: 876,
      category: "design",
    },
    {
      id: "react",
      title: "React Framework",
      description: "Components, state management, and hooks",
      level: "Intermediate",
      weeks: 6,
      learners: 543,
      category: "web-development",
    },
    {
      id: "data-science",
      title: "Data Science Fundamentals",
      description: "Statistics, Python, and data visualization",
      level: "Beginner",
      weeks: 12,
      learners: 932,
      category: "data-science",
    },
    {
      id: "mobile-dev",
      title: "Mobile App Development",
      description: "React Native for iOS and Android",
      level: "Intermediate",
      weeks: 8,
      learners: 421,
      category: "mobile",
    },
    {
      id: "node-backend",
      title: "Node.js Backend Development",
      description: "Server-side JavaScript with Express",
      level: "Intermediate",
      weeks: 8,
      learners: 387,
      category: "web-development",
    },
  ]

  // Show loading state
  if (isLoading) {
    return (
      <div className="container py-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading roadmaps...</h2>
          <Progress value={30} className="w-[300px] h-2" />
        </div>
      </div>
    )
  }

  // If not authenticated, this will redirect in the useEffect
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Explore Roadmaps</h1>
        <p className="text-muted-foreground">Discover learning paths curated by experts</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search roadmaps..." className="pl-8 w-full" />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
        <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="web-development">Web Dev</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="data-science">Data Science</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roadmaps.map((roadmap) => (
          <Card key={roadmap.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{roadmap.title}</CardTitle>
                  <CardDescription className="mt-2">{roadmap.description}</CardDescription>
                </div>
                <Badge variant="outline">{roadmap.level}</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{roadmap.weeks} weeks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">~5 hours/week</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{roadmap.learners.toLocaleString()} learners</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">View Roadmap</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
