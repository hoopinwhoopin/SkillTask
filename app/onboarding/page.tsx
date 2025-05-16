"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/ui/use-toast"

export default function OnboardingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState({
    interests: [] as string[],
    goal: "",
    hoursPerWeek: 5,
  })

  const interests = [
    { id: "web-dev", label: "Web Development" },
    { id: "ui-ux", label: "UI/UX Design" },
    { id: "data-science", label: "Data Science" },
    { id: "mobile-dev", label: "Mobile Development" },
    { id: "machine-learning", label: "Machine Learning" },
    { id: "devops", label: "DevOps" },
    { id: "blockchain", label: "Blockchain" },
    { id: "game-dev", label: "Game Development" },
  ]

  const goals = [
    { id: "career", label: "Career Change" },
    { id: "skill", label: "Skill Enhancement" },
    { id: "hobby", label: "Personal Interest" },
    { id: "certification", label: "Get Certified" },
  ]

  const handleInterestChange = (checked: boolean, id: string) => {
    if (checked) {
      setProfile((prev) => ({
        ...prev,
        interests: [...prev.interests, id],
      }))
    } else {
      setProfile((prev) => ({
        ...prev,
        interests: prev.interests.filter((item) => item !== id),
      }))
    }
  }

  const handleGoalChange = (value: string) => {
    setProfile((prev) => ({
      ...prev,
      goal: value,
    }))
  }

  const handleHoursChange = (value: number[]) => {
    setProfile((prev) => ({
      ...prev,
      hoursPerWeek: value[0],
    }))
  }

  const handleNext = () => {
    if (step === 1 && profile.interests.length === 0) {
      toast({
        title: "Select at least one interest",
        description: "Please select at least one area of interest to continue.",
        variant: "destructive",
      })
      return
    }

    if (step === 2 && !profile.goal) {
      toast({
        title: "Select a goal",
        description: "Please select your primary learning goal to continue.",
        variant: "destructive",
      })
      return
    }

    if (step < 3) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)

    try {
      // This would be replaced with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Profile completed!",
        description: "Your learning profile has been set up successfully.",
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem saving your profile.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Set Up Your Learning Profile</CardTitle>
          <CardDescription>
            Step {step} of 3:{" "}
            {step === 1 ? "Select Your Interests" : step === 2 ? "Define Your Goal" : "Set Your Schedule"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-sm">Select areas you're interested in learning (select all that apply):</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {interests.map((interest) => (
                  <div key={interest.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={interest.id}
                      checked={profile.interests.includes(interest.id)}
                      onCheckedChange={(checked) => handleInterestChange(checked as boolean, interest.id)}
                    />
                    <Label htmlFor={interest.id}>{interest.label}</Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="text-sm">What is your primary goal for learning?</div>
              <RadioGroup value={profile.goal} onValueChange={handleGoalChange}>
                {goals.map((goal) => (
                  <div key={goal.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={goal.id} id={goal.id} />
                    <Label htmlFor={goal.id}>{goal.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-sm">How many hours per week can you dedicate to learning?</div>
              <div className="space-y-4">
                <Slider value={[profile.hoursPerWeek]} min={1} max={20} step={1} onValueChange={handleHoursChange} />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">1 hour</span>
                  <span className="text-sm font-medium">{profile.hoursPerWeek} hours</span>
                  <span className="text-sm text-muted-foreground">20 hours</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={step === 1}>
            Back
          </Button>
          <Button onClick={handleNext} disabled={loading}>
            {step === 3 ? (loading ? "Saving..." : "Complete Setup") : "Next"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
