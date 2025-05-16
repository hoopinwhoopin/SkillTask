"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle2, Clock, ExternalLink, MessageSquare, Play } from "lucide-react"

export default function RoadmapDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")

  // This would be fetched from an API based on the ID
  const roadmap = {
    id: params.id,
    title: "Web Development Fundamentals",
    description: "A comprehensive roadmap to learn HTML, CSS, JavaScript, and responsive design principles.",
    progress: 68,
    currentWeek: 4,
    totalWeeks: 10,
    totalTopics: 32,
    completedTopics: 12,
    estimatedHours: 50,
    level: "Beginner",
    learners: 1245,
    modules: [
      {
        id: "html-basics",
        title: "HTML Fundamentals",
        week: 1,
        completed: true,
        topics: [
          { id: "html-1", title: "HTML Document Structure", completed: true },
          { id: "html-2", title: "HTML Elements & Attributes", completed: true },
          { id: "html-3", title: "Forms & Input Elements", completed: true },
          { id: "html-4", title: "Semantic HTML", completed: true },
        ],
        resources: [
          { id: "res-1", title: "HTML Crash Course", type: "video", duration: "45 min" },
          { id: "res-2", title: "Interactive HTML Practice", type: "exercise", duration: "1 hour" },
          { id: "res-3", title: "HTML5 Documentation", type: "reading", duration: "30 min" },
        ],
      },
      {
        id: "css-basics",
        title: "CSS Fundamentals",
        week: 2,
        completed: true,
        topics: [
          { id: "css-1", title: "CSS Selectors", completed: true },
          { id: "css-2", title: "Box Model & Layout", completed: true },
          { id: "css-3", title: "Typography & Colors", completed: true },
          { id: "css-4", title: "CSS Positioning", completed: true },
        ],
        resources: [
          { id: "res-4", title: "CSS Fundamentals", type: "video", duration: "1 hour" },
          { id: "res-5", title: "Styling Practice", type: "exercise", duration: "1.5 hours" },
          { id: "res-6", title: "CSS Reference Guide", type: "reading", duration: "45 min" },
        ],
      },
      {
        id: "js-basics",
        title: "JavaScript Basics",
        week: 3,
        completed: true,
        topics: [
          { id: "js-1", title: "Variables & Data Types", completed: true },
          { id: "js-2", title: "Functions & Scope", completed: true },
          { id: "js-3", title: "Control Flow", completed: true },
          { id: "js-4", title: "DOM Manipulation", completed: true },
        ],
        resources: [
          { id: "res-7", title: "JavaScript Essentials", type: "video", duration: "1.5 hours" },
          { id: "res-8", title: "JavaScript Challenges", type: "exercise", duration: "2 hours" },
          { id: "res-9", title: "JavaScript Reference", type: "reading", duration: "1 hour" },
        ],
      },
      {
        id: "responsive",
        title: "CSS Layouts & Responsive Design",
        week: 4,
        completed: false,
        current: true,
        topics: [
          { id: "resp-1", title: "Flexbox Fundamentals", completed: true },
          { id: "resp-2", title: "CSS Grid Layout", completed: true },
          { id: "resp-3", title: "Media Queries", completed: false, current: true },
          { id: "resp-4", title: "Responsive Design Patterns", completed: false },
        ],
        resources: [
          { id: "res-10", title: "Responsive Web Design", type: "video", duration: "1 hour" },
          { id: "res-11", title: "Flexbox & Grid Practice", type: "exercise", duration: "2 hours" },
          { id: "res-12", title: "Mobile-First Design Guide", type: "reading", duration: "45 min" },
        ],
      },
      {
        id: "js-advanced",
        title: "JavaScript Advanced Concepts",
        week: 5,
        completed: false,
        topics: [
          { id: "adv-1", title: "Asynchronous JavaScript", completed: false },
          { id: "adv-2", title: "Promises & Async/Await", completed: false },
          { id: "adv-3", title: "Error Handling", completed: false },
          { id: "adv-4", title: "ES6+ Features", completed: false },
        ],
        resources: [
          { id: "res-13", title: "Advanced JavaScript", type: "video", duration: "2 hours" },
          { id: "res-14", title: "Async JavaScript Practice", type: "exercise", duration: "1.5 hours" },
          { id: "res-15", title: "Modern JavaScript Guide", type: "reading", duration: "1 hour" },
        ],
      },
    ],
    discussions: [
      {
        id: "disc-1",
        title: "Help with Flexbox alignment",
        author: "Sarah J.",
        replies: 8,
        date: "2 days ago",
      },
      {
        id: "disc-2",
        title: "Best practices for responsive images",
        author: "Mike T.",
        replies: 12,
        date: "1 week ago",
      },
      {
        id: "disc-3",
        title: "Understanding JavaScript closures",
        author: "Alex W.",
        replies: 5,
        date: "3 days ago",
      },
    ],
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="h-4 w-4" />
      case "exercise":
        return <CheckCircle2 className="h-4 w-4" />
      case "reading":
        return <ExternalLink className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{roadmap.title}</h1>
          <p className="text-muted-foreground">{roadmap.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Share</Button>
          <Button>Continue Learning</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Your Progress</CardTitle>
              <Badge className="bg-blue-500 hover:bg-blue-600">In Progress</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Completion</span>
                <span className="font-medium">{roadmap.progress}%</span>
              </div>
              <Progress value={roadmap.progress} className="h-2" />
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <p className="text-2xl font-bold">{roadmap.completedTopics}</p>
                <p className="text-xs text-muted-foreground">Topics Completed</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{roadmap.currentWeek}</p>
                <p className="text-xs text-muted-foreground">Current Week</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{roadmap.totalWeeks}</p>
                <p className="text-xs text-muted-foreground">Total Weeks</p>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-lg font-medium mb-2">
                Current Module: {roadmap.modules.find((m) => m.current)?.title}
              </h3>
              <div className="space-y-3">
                {roadmap.modules
                  .find((m) => m.current)
                  ?.topics.map((topic) => (
                    <div key={topic.id} className="flex items-center gap-2">
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Roadmap Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Level</p>
                <p className="text-sm font-medium">{roadmap.level}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="text-sm font-medium">{roadmap.totalWeeks} weeks</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Time Required</p>
                <p className="text-sm font-medium">~{roadmap.estimatedHours} hours</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Learners</p>
                <p className="text-sm font-medium">{roadmap.learners.toLocaleString()}</p>
              </div>
            </div>

            <div className="pt-2">
              <h3 className="text-sm font-medium mb-2">Weekly Commitment</h3>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">~5 hours per week</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <MessageSquare className="h-4 w-4 mr-2" />
              Join Discussion
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="modules">Modules</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>About This Roadmap</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                This comprehensive roadmap is designed to take you from a complete beginner to having a solid foundation
                in web development. You'll learn HTML for structure, CSS for styling, and JavaScript for interactivity -
                the three core technologies of the web.
              </p>
              <p>By the end of this roadmap, you'll be able to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Build responsive websites that work on all devices</li>
                <li>Understand and implement modern CSS layouts</li>
                <li>Create interactive web experiences with JavaScript</li>
                <li>Apply best practices for web accessibility and performance</li>
                <li>Deploy your websites to the internet</li>
              </ul>
              <p>
                Each module includes video tutorials, practical exercises, and reading materials to ensure you gain both
                theoretical knowledge and hands-on experience.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="modules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Roadmap Modules</CardTitle>
              <CardDescription>Week-by-week learning path</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {roadmap.modules.map((module, index) => (
                  <AccordionItem key={module.id} value={module.id}>
                    <AccordionTrigger>
                      <div className="flex items-center gap-3 text-left">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                            module.completed
                              ? "bg-green-500 text-white"
                              : module.current
                                ? "bg-blue-500 text-white"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{module.title}</div>
                          <div className="text-xs text-muted-foreground">Week {module.week}</div>
                        </div>
                        {module.current && <Badge className="ml-2">Current</Badge>}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-9 space-y-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Topics</h4>
                          <ul className="space-y-2">
                            {module.topics.map((topic) => (
                              <li key={topic.id} className="flex items-center gap-2">
                                <div
                                  className={`w-4 h-4 rounded-full ${
                                    topic.completed
                                      ? "bg-green-500"
                                      : topic.current
                                        ? "bg-blue-500"
                                        : "bg-gray-200 dark:bg-gray-700"
                                  }`}
                                ></div>
                                <span className="text-sm">{topic.title}</span>
                                {topic.current && (
                                  <Badge variant="outline" className="ml-auto">
                                    Current
                                  </Badge>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Learning Resources</h4>
                          <ul className="space-y-2">
                            {module.resources.map((resource) => (
                              <li key={resource.id} className="flex items-center gap-2">
                                <div className="text-muted-foreground">{getResourceIcon(resource.type)}</div>
                                <span className="text-sm">{resource.title}</span>
                                <span className="text-xs text-muted-foreground ml-auto">{resource.duration}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Button size="sm" className="mt-2">
                          {module.completed ? "Review Module" : module.current ? "Continue Learning" : "Start Module"}
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Learning Resources</CardTitle>
              <CardDescription>Curated materials to help you master each topic</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {roadmap.modules.map((module) => (
                  <div key={module.id} className="space-y-3">
                    <h3 className="font-medium">{module.title}</h3>
                    <div className="grid gap-3">
                      {module.resources.map((resource) => (
                        <Card key={resource.id}>
                          <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="rounded-full bg-primary/10 p-2">{getResourceIcon(resource.type)}</div>
                              <div>
                                <h4 className="font-medium">{resource.title}</h4>
                                <p className="text-xs text-muted-foreground">
                                  {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)} • {resource.duration}
                                </p>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              {resource.type === "video" ? "Watch" : resource.type === "exercise" ? "Practice" : "Read"}
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Suggest a Resource
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="discussions" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Discussion Forum</CardTitle>
                <CardDescription>Connect with other learners</CardDescription>
              </div>
              <Button>New Thread</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {roadmap.discussions.map((discussion) => (
                  <Card key={discussion.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{discussion.title}</h3>
                        <Badge variant="outline">{discussion.replies} replies</Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <span>Started by {discussion.author}</span>
                        <span>•</span>
                        <span>{discussion.date}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button variant="ghost" size="sm">
                        View Thread
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Discussions
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
