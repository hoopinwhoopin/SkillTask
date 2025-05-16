"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Search, ThumbsUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function DiscussionsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      try {
        const user = localStorage.getItem("skillkart_user")
        if (!user) {
          router.push("/login?callbackUrl=/discussions")
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

  const discussions = [
    {
      id: 1,
      title: "Help with Flexbox alignment",
      content:
        "I'm struggling to center items both horizontally and vertically with Flexbox. Can someone explain the correct approach?",
      author: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SJ",
      },
      roadmap: "Web Development",
      created: "2 days ago",
      replies: 8,
      likes: 12,
      tags: ["css", "flexbox", "layout"],
    },
    {
      id: 2,
      title: "Best practices for responsive images",
      content:
        "What's the most efficient way to handle responsive images across different devices? Should I use srcset, picture element, or CSS?",
      author: {
        name: "Mike Thompson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "MT",
      },
      roadmap: "Web Development",
      created: "1 week ago",
      replies: 12,
      likes: 18,
      tags: ["html", "responsive", "images"],
    },
    {
      id: 3,
      title: "Understanding JavaScript closures",
      content:
        "I'm having trouble understanding closures in JavaScript. Can someone provide a simple explanation with examples?",
      author: {
        name: "Alex Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "AW",
      },
      roadmap: "Web Development",
      created: "3 days ago",
      replies: 5,
      likes: 9,
      tags: ["javascript", "functions", "closures"],
    },
  ]

  // Show loading state
  if (isLoading) {
    return (
      <div className="container py-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading discussions...</h2>
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
          <h1 className="text-3xl font-bold tracking-tight mb-2">Discussions</h1>
          <p className="text-muted-foreground">Connect with other learners and get help</p>
        </div>
        <div className="flex items-center">
          <Button>Start New Discussion</Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-3/4 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search discussions..." className="pl-8 w-full" />
            </div>
            <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="my-roadmaps">My Roadmaps</TabsTrigger>
                <TabsTrigger value="my-posts">My Posts</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-4">
            {discussions.map((discussion) => (
              <Card key={discussion.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <Link href={`/discussions/${discussion.id}`} className="hover:underline">
                      <CardTitle className="text-xl">{discussion.title}</CardTitle>
                    </Link>
                    <Badge variant="outline">{discussion.roadmap}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-muted-foreground line-clamp-2">{discussion.content}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {discussion.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={discussion.author.avatar || "/placeholder.svg"} alt={discussion.author.name} />
                      <AvatarFallback>{discussion.author.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{discussion.author.name}</span>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{discussion.created}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{discussion.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{discussion.replies}</span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="md:w-1/4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Popular Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {[
                  "javascript",
                  "css",
                  "html",
                  "react",
                  "design",
                  "responsive",
                  "flexbox",
                  "hooks",
                  "layout",
                  "components",
                ].map((tag, index) => (
                  <Badge key={index} variant="secondary" className="cursor-pointer">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
