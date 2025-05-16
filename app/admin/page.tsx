"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Upload } from "lucide-react"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("roadmaps")

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage roadmaps, resources, and user content</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create New
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="roadmaps">Roadmaps</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
        </TabsList>

        <TabsContent value="roadmaps" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <CardTitle>Manage Roadmaps</CardTitle>
                  <CardDescription>Create and edit learning roadmaps</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search roadmaps..." className="pl-8 w-full md:w-[250px]" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Learners</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: 1,
                      title: "Web Development Fundamentals",
                      level: "Beginner",
                      duration: "10 weeks",
                      status: "Published",
                      learners: 1245,
                    },
                    {
                      id: 2,
                      title: "UI/UX Design Basics",
                      level: "Beginner",
                      duration: "8 weeks",
                      status: "Published",
                      learners: 876,
                    },
                    {
                      id: 3,
                      title: "React Framework",
                      level: "Intermediate",
                      duration: "6 weeks",
                      status: "Published",
                      learners: 543,
                    },
                    {
                      id: 4,
                      title: "Advanced JavaScript",
                      level: "Advanced",
                      duration: "8 weeks",
                      status: "Draft",
                      learners: 0,
                    },
                    {
                      id: 5,
                      title: "Full-Stack Development",
                      level: "Advanced",
                      duration: "12 weeks",
                      status: "Draft",
                      learners: 0,
                    },
                  ].map((roadmap) => (
                    <TableRow key={roadmap.id}>
                      <TableCell className="font-medium">{roadmap.title}</TableCell>
                      <TableCell>{roadmap.level}</TableCell>
                      <TableCell>{roadmap.duration}</TableCell>
                      <TableCell>
                        <Badge variant={roadmap.status === "Published" ? "default" : "outline"}>{roadmap.status}</Badge>
                      </TableCell>
                      <TableCell>{roadmap.learners.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Create New Roadmap</CardTitle>
              <CardDescription>Define a new learning path</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Roadmap Title</Label>
                  <Input id="title" placeholder="e.g., Web Development Fundamentals" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="level">Difficulty Level</Label>
                  <Select>
                    <SelectTrigger id="level">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (weeks)</Label>
                  <Input id="duration" type="number" min="1" placeholder="e.g., 10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web-dev">Web Development</SelectItem>
                      <SelectItem value="ui-ux">UI/UX Design</SelectItem>
                      <SelectItem value="data-science">Data Science</SelectItem>
                      <SelectItem value="mobile-dev">Mobile Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe the roadmap and what learners will achieve" rows={4} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Save as Draft</Button>
              <Button>Continue to Modules</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <CardTitle>Learning Resources</CardTitle>
                  <CardDescription>Manage videos, articles, and exercises</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search resources..." className="pl-8 w-full md:w-[250px]" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Roadmap</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: 1,
                      title: "HTML Crash Course",
                      type: "Video",
                      duration: "45 min",
                      roadmap: "Web Development Fundamentals",
                    },
                    {
                      id: 2,
                      title: "CSS Fundamentals",
                      type: "Video",
                      duration: "1 hour",
                      roadmap: "Web Development Fundamentals",
                    },
                    {
                      id: 3,
                      title: "JavaScript Essentials",
                      type: "Video",
                      duration: "1.5 hours",
                      roadmap: "Web Development Fundamentals",
                    },
                    {
                      id: 4,
                      title: "Interactive HTML Practice",
                      type: "Exercise",
                      duration: "1 hour",
                      roadmap: "Web Development Fundamentals",
                    },
                    {
                      id: 5,
                      title: "CSS Reference Guide",
                      type: "Reading",
                      duration: "45 min",
                      roadmap: "Web Development Fundamentals",
                    },
                  ].map((resource) => (
                    <TableRow key={resource.id}>
                      <TableCell className="font-medium">{resource.title}</TableCell>
                      <TableCell>{resource.type}</TableCell>
                      <TableCell>{resource.duration}</TableCell>
                      <TableCell>{resource.roadmap}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add New Resource
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>View and manage user accounts</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search users..." className="pl-8 w-full md:w-[250px]" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Active Roadmaps</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: 1,
                      name: "Alex Johnson",
                      email: "alex@example.com",
                      joined: "Jan 15, 2023",
                      role: "Learner",
                      roadmaps: 2,
                    },
                    {
                      id: 2,
                      name: "Sarah Williams",
                      email: "sarah@example.com",
                      joined: "Feb 3, 2023",
                      role: "Learner",
                      roadmaps: 1,
                    },
                    {
                      id: 3,
                      name: "Michael Brown",
                      email: "michael@example.com",
                      joined: "Mar 22, 2023",
                      role: "Learner",
                      roadmaps: 3,
                    },
                    {
                      id: 4,
                      name: "Emily Davis",
                      email: "emily@example.com",
                      joined: "Apr 10, 2023",
                      role: "Curator",
                      roadmaps: 0,
                    },
                    {
                      id: 5,
                      name: "David Wilson",
                      email: "david@example.com",
                      joined: "May 5, 2023",
                      role: "Admin",
                      roadmaps: 0,
                    },
                  ].map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.joined}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === "Admin" ? "default" : "outline"}>{user.role}</Badge>
                      </TableCell>
                      <TableCell>{user.roadmaps}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discussions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <CardTitle>Discussion Threads</CardTitle>
                  <CardDescription>Moderate community discussions</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search discussions..." className="pl-8 w-full md:w-[250px]" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Roadmap</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Replies</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: 1,
                      title: "Help with Flexbox alignment",
                      author: "Sarah J.",
                      roadmap: "Web Development",
                      created: "2 days ago",
                      replies: 8,
                    },
                    {
                      id: 2,
                      title: "Best practices for responsive images",
                      author: "Mike T.",
                      roadmap: "Web Development",
                      created: "1 week ago",
                      replies: 12,
                    },
                    {
                      id: 3,
                      title: "Understanding JavaScript closures",
                      author: "Alex W.",
                      roadmap: "Web Development",
                      created: "3 days ago",
                      replies: 5,
                    },
                    {
                      id: 4,
                      title: "Color theory resources",
                      author: "Emma L.",
                      roadmap: "UI/UX Design",
                      created: "5 days ago",
                      replies: 7,
                    },
                    {
                      id: 5,
                      title: "React hooks vs class components",
                      author: "John D.",
                      roadmap: "React Framework",
                      created: "1 day ago",
                      replies: 10,
                    },
                  ].map((discussion) => (
                    <TableRow key={discussion.id}>
                      <TableCell className="font-medium">{discussion.title}</TableCell>
                      <TableCell>{discussion.author}</TableCell>
                      <TableCell>{discussion.roadmap}</TableCell>
                      <TableCell>{discussion.created}</TableCell>
                      <TableCell>{discussion.replies}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Moderate
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
