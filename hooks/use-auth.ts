"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

// User type definition
interface User {
  id: string
  name: string
  email: string
  image: string | null
  password?: string
}

interface Session {
  user: User | null
}

export function useAuth() {
  const router = useRouter()
  const { toast } = useToast()
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on component mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("skillkart_user")

      if (storedUser) {
        const user = JSON.parse(storedUser) as User
        // Remove password from session for security
        const { password, ...userWithoutPassword } = user
        setSession({ user: userWithoutPassword })
      }
    } catch (e) {
      console.error("Failed to parse stored user", e)
      localStorage.removeItem("skillkart_user")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const signIn = async (credentials: { email: string; password: string }) => {
    setIsLoading(true)

    try {
      // Get users from localStorage
      const usersJSON = localStorage.getItem("skillkart_users")
      const users = usersJSON ? JSON.parse(usersJSON) : []

      // Find user with matching email and password
      const user = users.find((u: User) => u.email === credentials.email && u.password === credentials.password)

      if (user) {
        // Remove password from session for security
        const { password, ...userWithoutPassword } = user

        // Update session state
        setSession({ user: userWithoutPassword })

        // Store in localStorage
        localStorage.setItem("skillkart_user", JSON.stringify(user))

        setIsLoading(false)
        return { success: true }
      }

      setIsLoading(false)
      return { success: false, error: "Invalid credentials" }
    } catch (error) {
      console.error("Sign in error:", error)
      setIsLoading(false)
      return { success: false, error: "An unexpected error occurred" }
    }
  }

  const signOut = () => {
    setSession(null)
    localStorage.removeItem("skillkart_user")
    router.push("/")

    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    })
  }

  return {
    session,
    isAuthenticated: !!session?.user,
    isLoading,
    signIn,
    signOut,
  }
}
