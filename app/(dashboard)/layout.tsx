"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SidebarWrapper } from "@/components/sidebar"
import { useToast } from "@/components/ui/use-toast"

interface User {
  id: string
  name: string
  email: string
  image: string | null
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on component mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("skillkart_user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (e) {
      console.error("Failed to parse stored user", e)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const signOut = () => {
    localStorage.removeItem("skillkart_user")
    setUser(null)
    router.push("/")

    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    })
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <SidebarWrapper user={user} signOut={signOut}>
      {children}
    </SidebarWrapper>
  )
}
