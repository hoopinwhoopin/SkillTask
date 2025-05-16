import type React from "react"
import Link from "next/link"
import { GraduationCap } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="rounded-md bg-primary p-1">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">SkillKart</span>
          </Link>
          <ModeToggle />
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center">{children}</main>
      <footer className="border-t py-4 bg-background">
        <div className="container">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} SkillKart. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
