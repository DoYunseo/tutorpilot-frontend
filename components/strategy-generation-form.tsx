"use client"

import type React from "react"

import { useState } from "react"
import { Wand2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"

interface StrategyGenerationFormProps {
  onGenerate: (formData: any) => void
  isGenerating: boolean
}

export function StrategyGenerationForm({ onGenerate, isGenerating }: StrategyGenerationFormProps) {
  const [formData, setFormData] = useState({
    student: "",
    subject: "",
    duration: 12,
    objective: "",
    level: "intermediate",
    culturalContext: "",
    specialNeeds: "",
  })

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onGenerate(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Generate Learning Strategy</CardTitle>
          <CardDescription>
            Create a personalized long-term learning strategy based on student profile and educational needs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="student">Student</Label>
              <Select value={formData.student} onValueChange={(value) => handleChange("student", value)} required>
                <SelectTrigger id="student">
                  <SelectValue placeholder="Select a student" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Jin Hyun Park">Jin Hyun Park</SelectItem>
                  <SelectItem value="Mei Lin Chen">Mei Lin Chen</SelectItem>
                  <SelectItem value="Hiroshi Tanaka">Hiroshi Tanaka</SelectItem>
                  <SelectItem value="Soo-Jin Kim">Soo-Jin Kim</SelectItem>
                  <SelectItem value="Yong Wei Zhang">Yong Wei Zhang</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select value={formData.subject} onValueChange={(value) => handleChange("subject", value)} required>
                <SelectTrigger id="subject">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Python Programming">Python Programming</SelectItem>
                  <SelectItem value="TOEFL">TOEFL</SelectItem>
                  <SelectItem value="IB MYP Physics">IB MYP Physics</SelectItem>
                  <SelectItem value="IBDP Global Politics">IBDP Global Politics</SelectItem>
                  <SelectItem value="AP Calculus">AP Calculus</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="duration">Duration (weeks)</Label>
              <span className="text-sm text-muted-foreground">{formData.duration} weeks</span>
            </div>
            <Slider
              id="duration"
              min={4}
              max={24}
              step={1}
              value={[formData.duration]}
              onValueChange={(value) => handleChange("duration", value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="level">Proficiency Level</Label>
            <Select value={formData.level} onValueChange={(value) => handleChange("level", value)}>
              <SelectTrigger id="level">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="objective">Learning Objective</Label>
            <Textarea
              id="objective"
              placeholder="What should the student achieve by the end of this learning period?"
              value={formData.objective}
              onChange={(e) => handleChange("objective", e.target.value)}
              required
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="culturalContext">Cultural Context (Optional)</Label>
            <Input
              id="culturalContext"
              placeholder="Any cultural considerations to incorporate (e.g., country-specific standards)"
              value={formData.culturalContext}
              onChange={(e) => handleChange("culturalContext", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialNeeds">Special Needs or Accommodations (Optional)</Label>
            <Textarea
              id="specialNeeds"
              placeholder="Any learning accommodations or special needs to consider"
              value={formData.specialNeeds}
              onChange={(e) => handleChange("specialNeeds", e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isGenerating}>
            {isGenerating ? (
              "Generating Strategy..."
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Learning Strategy
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}
