"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function AuthErrorPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  // Map error codes to user-friendly messages
  const getErrorMessage = (errorCode: string | null) => {
    switch (errorCode) {
      case "Configuration":
        return "There is a problem with the server configuration."
      case "AccessDenied":
        return "You do not have permission to sign in."
      case "Verification":
        return "The verification link may have been used or has expired."
      case "OAuthSignin":
      case "OAuthCallback":
      case "OAuthCreateAccount":
      case "OAuthAccountNotLinked":
      case "EmailCreateAccount":
      case "Callback":
      case "EmailSignin":
        return "There was a problem with your authentication provider."
      case "CredentialsSignin":
        return "The email or password you entered is incorrect."
      case "SessionRequired":
        return "You must be signed in to access this page."
      default:
        return "An unexpected error occurred during authentication."
    }
  }

  // Log the error for debugging
  useEffect(() => {
    console.error("Authentication error:", error)
  }, [error])

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <CardTitle className="text-2xl font-bold">Authentication Error</CardTitle>
          </div>
          <CardDescription>{getErrorMessage(error)}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Error code: {error || "Unknown"}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            Go Back
          </Button>
          <Link href="/login">
            <Button>Return to Login</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
