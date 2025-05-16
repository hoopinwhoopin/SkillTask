import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Clock, GraduationCap, Users } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <div className="rounded-md bg-primary p-1">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">SkillKart</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/" className="text-sm font-medium text-primary">
                Home
              </Link>
              <Link href="/explore" className="text-sm font-medium text-muted-foreground hover:text-primary">
                Explore
              </Link>
              <Link href="/how-it-works" className="text-sm font-medium text-muted-foreground hover:text-primary">
                How It Works
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Link href="/login">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <div className="space-y-4 max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                SkillKart - Curated Learning Roadmap Builder
              </h1>
              <p className="text-muted-foreground md:text-xl">
                SkillKart helps you build customized learning paths for Web Development, UI/UX, Data Science, and more.
              </p>
              <div className="flex flex-row gap-4 justify-center pt-4">
                <Link href="/signup">
                  <Button size="lg" className="gap-1">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/explore">
                  <Button size="lg" variant="outline">
                    Explore Roadmaps
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mt-12">
              <img
                alt="SkillKart Learning Roadmap"
                className="rounded-xl object-cover object-center max-w-full mx-auto"
                height="400"
                src="/placeholder.svg?height=400&width=800"
                width="800"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12">
            <div className="md:w-1/3 space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">How SkillKart Works</h2>
              <p className="text-muted-foreground">
                Our platform creates personalized learning experiences tailored to your goals and schedule
              </p>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Personalized Roadmaps</h3>
                <p className="text-center text-muted-foreground">
                  Select your interests and goals to get a customized learning path
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Flexible Learning</h3>
                <p className="text-center text-muted-foreground">
                  Set your own pace with week-by-week modules that fit your schedule
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Community Support</h3>
                <p className="text-center text-muted-foreground">
                  Learn together with discussion threads and peer assistance
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Skills Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12 mb-12">
            <div className="md:w-1/3 space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Popular Skills</h2>
              <p className="text-muted-foreground">Discover our most popular learning roadmaps</p>
              <Link href="/explore" className="inline-block mt-4">
                <Button variant="outline" size="lg">
                  View All Roadmaps
                </Button>
              </Link>
            </div>
            <div className="md:w-2/3 overflow-x-auto pb-4">
              <div className="flex space-x-6 min-w-max">
                {[
                  { title: "Web Development", image: "/placeholder.svg?height=200&width=300", weeks: 12 },
                  { title: "UI/UX Design", image: "/placeholder.svg?height=200&width=300", weeks: 10 },
                  { title: "Data Science", image: "/placeholder.svg?height=200&width=300", weeks: 14 },
                  { title: "Mobile Development", image: "/placeholder.svg?height=200&width=300", weeks: 12 },
                ].map((skill, index) => (
                  <Link key={index} href={`/roadmaps/${skill.title.toLowerCase().replace(/\s+/g, "-")}`}>
                    <div className="group relative overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md w-[280px]">
                      <img
                        src={skill.image || "/placeholder.svg"}
                        alt={skill.title}
                        width={280}
                        height={160}
                        className="aspect-video w-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold">{skill.title}</h3>
                        <p className="text-sm text-muted-foreground">{skill.weeks} week roadmap</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container flex flex-col md:flex-row justify-between py-8 md:py-12">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="rounded-md bg-primary p-1">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">SkillKart</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Building personalized learning roadmaps to help you master new skills efficiently.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Platform</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/explore" className="text-sm text-muted-foreground hover:text-foreground">
                    Explore Roadmaps
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="text-sm text-muted-foreground hover:text-foreground">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-sm text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container py-6 border-t">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} SkillKart. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
