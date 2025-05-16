"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Plus } from "lucide-react"

export default function MyRoadmapsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      try {
        const user = localStorage.getItem("skillkart_user")
        if (!user) {
          router.push("/login?callbackUrl=/my-roadmaps")
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
      progress: 68,
      currentWeek: 4,
      totalWeeks: 10,
      status: "in-progress",
      nextTopic: "Media Queries",
    },
    {
      id: "ui-design",
      title: "UI/UX Design Basics",
      description: "Design principles, wireframing, and prototyping",
      progress: 25,
      currentWeek: 2,
      totalWeeks: 8,
      status: "in-progress",
      nextTopic: "Color Theory",
    },
    {
      id: "react",
      title: "React Framework",
      description: "Components, state management, and hooks",
      progress: 0,
      currentWeek: 0,
      totalWeeks: 6,
      status: "not-started",
      nextTopic: "Introduction to React",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>
      case "in-progress":
        return <Badge className="bg-blue-500 hover:bg-blue-600">In Progress</Badge>
      case "not-started":
        return <Badge variant="outline">Not Started</Badge>
      default:
        return null
    }
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="container py-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading your roadmaps...</h2>
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
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">My Roadmaps</h1>
          <p className="text-muted-foreground">Manage and track your learning journeys</p>
        </div>
        <div className="flex items-center">
          <Link href="/explore">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Roadmap
            </Button>
          </Link>
        </div>
      </div>

      <div className="space-y-6">
        {roadmaps.map((roadmap) => (
          <Card key={roadmap.id} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 bg-muted p-6 flex flex-col justify-center">
                <h2 className="text-xl font-bold mb-2">{roadmap.title}</h2>
                <p className="text-sm text-muted-foreground mb-4">{roadmap.description}</p>
                {getStatusBadge(roadmap.status)}
              </div>
              <div className="md:w-3/4 p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{roadmap.progress}%</span>
                    </div>
                    <Progress value={roadmap.progress} className="h-2" />
                  </div>

                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Week {roadmap.currentWeek} of {roadmap.totalWeeks}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">~5 hours/week</span>
                    </div>
                    {roadmap.status !== "not-started" && (
                      <div className="flex items-center">
                        <span className="text-sm font-medium">Next Topic:</span>
                        <span className="text-sm text-muted-foreground ml-2">{roadmap.nextTopic}</span>
                      </div>
                    )}
                  </div>

                  <Button variant={roadmap.status === "not-started" ? "default" : "outline"}>
                    {roadmap.status === "not-started" ? "Start Learning" : "Continue Learning"}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
