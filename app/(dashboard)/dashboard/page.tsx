"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Award, BookOpen, Calendar, Clock, Flame, TrendingUp } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function DashboardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      try {
        const user = localStorage.getItem("skillkart_user")
        if (!user) {
          router.push("/login?callbackUrl=/dashboard")
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

  // Simulate loading progress
  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => setProgress(68), 500)
      return () => clearTimeout(timer)
    }
  }, [isAuthenticated])

  // Show loading state
  if (isLoading) {
    return (
      <div className="container py-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading your dashboard...</h2>
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
        <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Track your learning progress.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <div className="rounded-full bg-orange-500/20 p-1">
              <Flame className="h-4 w-4 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7 days</div>
            <p className="text-xs text-muted-foreground">Keep it going!</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">XP Points</CardTitle>
            <div className="rounded-full bg-yellow-500/20 p-1">
              <Award className="h-4 w-4 text-yellow-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-xs text-muted-foreground">+120 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Topics</CardTitle>
            <div className="rounded-full bg-blue-500/20 p-1">
              <BookOpen className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Out of 32 total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Hours</CardTitle>
            <div className="rounded-full bg-green-500/20 p-1">
              <Clock className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.2</div>
            <p className="text-xs text-muted-foreground">Of 8 hour goal</p>
          </CardContent>
        </Card>
      </div>

      {/* Current Roadmap */}
      <Tabs defaultValue="current" className="space-y-6">
        <TabsList>
          <TabsTrigger value="current">Current Roadmap</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
        </TabsList>
        <TabsContent value="current" className="space-y-0">
          <Card>
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-2/3 lg:border-r">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Web Development Fundamentals</CardTitle>
                      <CardDescription>Week 4 of 10</CardDescription>
                    </div>
                    <Badge className="bg-blue-500 hover:bg-blue-600">In Progress</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall Progress</span>
                      <span className="font-medium">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">View Details</Button>
                  <Button>Continue Learning</Button>
                </CardFooter>
              </div>
              <div className="lg:w-1/3 p-6">
                <h4 className="text-sm font-medium mb-4">Current Module: CSS Layouts & Responsive Design</h4>
                <div className="space-y-3">
                  {[
                    { title: "Flexbox Fundamentals", completed: true },
                    { title: "CSS Grid Layout", completed: true },
                    { title: "Media Queries", completed: false, current: true },
                    { title: "Responsive Design Patterns", completed: false },
                  ].map((topic, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-full ${topic.completed ? "bg-green-500" : topic.current ? "bg-blue-500" : "bg-gray-200 dark:bg-gray-700"}`}
                      ></div>
                      <span className={`text-sm ${topic.current ? "font-medium" : ""}`}>{topic.title}</span>
                      {topic.current && (
                        <Badge variant="outline" className="ml-auto">
                          Current
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="recommended" className="space-y-0">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "JavaScript Frameworks",
                description: "Learn React, Vue, or Angular",
                weeks: 8,
                level: "Intermediate",
              },
              {
                title: "Backend Development",
                description: "Node.js, Express, and databases",
                weeks: 10,
                level: "Intermediate",
              },
              {
                title: "Full-Stack Projects",
                description: "Build complete web applications",
                weeks: 12,
                level: "Advanced",
              },
            ].map((roadmap, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{roadmap.title}</CardTitle>
                  <CardDescription>{roadmap.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>{roadmap.weeks} weeks</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm mt-2">
                    <TrendingUp className="h-4 w-4" />
                    <span>{roadmap.level}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Add to My Roadmaps
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="badges" className="space-y-0">
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { name: "7-Day Streak", icon: "🔥", earned: true, description: "Learned for 7 consecutive days" },
              { name: "HTML Master", icon: "🏆", earned: true, description: "Completed all HTML modules" },
              { name: "CSS Wizard", icon: "✨", earned: false, description: "Complete all CSS modules" },
              {
                name: "First Discussion",
                icon: "💬",
                earned: true,
                description: "Participated in a discussion thread",
              },
              { name: "Helper", icon: "🤝", earned: false, description: "Answer 5 questions from other learners" },
              { name: "Quiz Champion", icon: "🎯", earned: false, description: "Score 100% on 3 consecutive quizzes" },
              { name: "Project Builder", icon: "🛠️", earned: false, description: "Complete your first project" },
              { name: "Feedback Provider", icon: "📝", earned: true, description: "Provided feedback on a resource" },
            ].map((badge, index) => (
              <Card key={index} className={`${!badge.earned ? "opacity-60" : ""}`}>
                <CardHeader className="text-center pb-2">
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <CardTitle className="text-base">{badge.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground">{badge.description}</CardContent>
                <CardFooter className="justify-center pt-0">
                  <Badge variant={badge.earned ? "default" : "outline"}>{badge.earned ? "Earned" : "Locked"}</Badge>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
