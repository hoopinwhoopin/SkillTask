"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Github } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
  const error = searchParams.get("error")
  const signupSuccess = searchParams.get("signup") === "success"

  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  useEffect(() => {
    if (signupSuccess) {
      toast({
        title: "Account created successfully",
        description: "You can now log in with your credentials.",
      })
    }
  }, [signupSuccess, toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Get users from localStorage
      const usersJSON = localStorage.getItem("skillkart_users")
      const users = usersJSON ? JSON.parse(usersJSON) : []

      // Find user with matching email and password
      const user = users.find((u: any) => u.email === formData.email && u.password === formData.password)

      if (user) {
        // Store current user in localStorage
        localStorage.setItem("skillkart_user", JSON.stringify(user))

        toast({
          title: "Login successful",
          description: `Welcome back, ${user.name}!`,
        })

        // Redirect to dashboard or callback URL
        router.push(callbackUrl)
      } else {
        // Check if email exists but password is wrong
        const emailExists = users.some((u: any) => u.email === formData.email)

        if (emailExists) {
          toast({
            title: "Incorrect password",
            description: "The password you entered is incorrect. Please try again.",
            variant: "destructive",
          })
        } else {
          toast({
            title: "Account not found",
            description: "No account found with this email. Please sign up first.",
            variant: "destructive",
          })
        }
      }
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Something went wrong",
        description: "There was a problem with your request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Function to create and use a demo account
  const useDemoAccount = () => {
    setIsLoading(true)

    try {
      // Create a demo user
      const demoUser = {
        id: "demo-user",
        name: "Demo User",
        email: "demo@example.com",
        password: "password123",
        image: null,
      }

      // Get existing users or initialize empty array
      const existingUsersJSON = localStorage.getItem("skillkart_users")
      const existingUsers = existingUsersJSON ? JSON.parse(existingUsersJSON) : []

      // Check if demo user already exists
      const demoUserExists = existingUsers.some((u: any) => u.email === demoUser.email)

      if (!demoUserExists) {
        // Add demo user to users array
        existingUsers.push(demoUser)
        localStorage.setItem("skillkart_users", JSON.stringify(existingUsers))
      }

      // Set as current user
      localStorage.setItem("skillkart_user", JSON.stringify(demoUser))

      toast({
        title: "Demo account activated",
        description: "You are now logged in as a demo user.",
      })

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Demo login error:", error)
      toast({
        title: "Something went wrong",
        description: "There was a problem with the demo account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Log in</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>

              <Button type="button" variant="outline" className="w-full" disabled={isLoading} onClick={useDemoAccount}>
                Use Demo Account
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  type="button"
                  disabled={isLoading}
                  onClick={() => {
                    toast({
                      title: "GitHub Sign In",
                      description: "This would normally redirect to GitHub OAuth.",
                    })
                  }}
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  disabled={isLoading}
                  onClick={() => {
                    toast({
                      title: "Google Sign In",
                      description: "This would normally redirect to Google OAuth.",
                    })
                  }}
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
              </div>
            </div>
          </CardContent>
        </form>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
