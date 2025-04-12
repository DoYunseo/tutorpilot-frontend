"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { TutorDashboardLayout } from "@/components/tutor-dashboard-layout"

// Available subjects
const subjects = [
  "Python Programming",
  "TOEFL",
  "IB MYP Physics",
  "IBDP Global Politics",
  "Mathematics",
  "Chemistry",
  "Biology",
  "English Literature",
]

// Learning styles (VARK model)
const learningStyles = [
  { value: "visual", label: "Visual" },
  { value: "auditory", label: "Auditory" },
  { value: "kinesthetic", label: "Kinesthetic" },
  { value: "reading_writing", label: "Reading/Writing" },
]

// Academic levels
const academicLevels = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
]

export default function NewStudentPage() {
  const [formData, setFormData] = useState({
    // Basic Information
    name: "",
    subject: "",
    tutoringLength: "",
    availability: "",

    // Demographics
    age: "",
    grade: "",
    countryOfResidence: "",
    nationality: "",
    languages: "",
    interests: "",
    favoriteSubjects: "",
    learningStyle: "",
    hobbies: "",

    // Academic
    currentLevel: "",

    // Goals
    expectations: "",
    objectives: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log(formData)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <TutorDashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Add New Student</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter the student's basic details and tutoring preferences.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select value={formData.subject} onValueChange={(value) => handleChange("subject", value)}>
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tutoringLength">Tutoring Length</Label>
                <Input
                  id="tutoringLength"
                  placeholder="e.g., 6 months"
                  value={formData.tutoringLength}
                  onChange={(e) => handleChange("tutoringLength", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="availability">Availability</Label>
                <Input
                  id="availability"
                  placeholder="e.g., Mon 4-5 PM"
                  value={formData.availability}
                  onChange={(e) => handleChange("availability", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Demographics */}
          <Card>
            <CardHeader>
              <CardTitle>Demographics</CardTitle>
              <CardDescription>Information about the student's background and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleChange("age", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">Grade/Year</Label>
                <Input
                  id="grade"
                  value={formData.grade}
                  onChange={(e) => handleChange("grade", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="countryOfResidence">Country of Residence</Label>
                <Input
                  id="countryOfResidence"
                  value={formData.countryOfResidence}
                  onChange={(e) => handleChange("countryOfResidence", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  id="nationality"
                  value={formData.nationality}
                  onChange={(e) => handleChange("nationality", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="languages">Languages Spoken</Label>
                <Input
                  id="languages"
                  placeholder="e.g., English, Spanish"
                  value={formData.languages}
                  onChange={(e) => handleChange("languages", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="learningStyle">Learning Style</Label>
                <Select value={formData.learningStyle} onValueChange={(value) => handleChange("learningStyle", value)}>
                  <SelectTrigger id="learningStyle">
                    <SelectValue placeholder="Select learning style" />
                  </SelectTrigger>
                  <SelectContent>
                    {learningStyles.map((style) => (
                      <SelectItem key={style.value} value={style.value}>
                        {style.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="interests">Interests</Label>
                <Input
                  id="interests"
                  placeholder="e.g., gaming, sci-fi"
                  value={formData.interests}
                  onChange={(e) => handleChange("interests", e.target.value)}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="favoriteSubjects">Favorite Subjects</Label>
                <Input
                  id="favoriteSubjects"
                  placeholder="e.g., math, history"
                  value={formData.favoriteSubjects}
                  onChange={(e) => handleChange("favoriteSubjects", e.target.value)}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="hobbies">Hobbies</Label>
                <Input
                  id="hobbies"
                  placeholder="e.g., writing, soccer"
                  value={formData.hobbies}
                  onChange={(e) => handleChange("hobbies", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Academic */}
          <Card>
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
              <CardDescription>Details about the student's current academic level.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="currentLevel">Current Level</Label>
                <Select value={formData.currentLevel} onValueChange={(value) => handleChange("currentLevel", value)}>
                  <SelectTrigger id="currentLevel">
                    <SelectValue placeholder="Select current level" />
                  </SelectTrigger>
                  <SelectContent>
                    {academicLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Goals */}
          <Card>
            <CardHeader>
              <CardTitle>Goals and Expectations</CardTitle>
              <CardDescription>The student's learning goals and expectations from tutoring.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="expectations">Expectations</Label>
                <Textarea
                  id="expectations"
                  placeholder="e.g., Improve grades, prepare for exams"
                  value={formData.expectations}
                  onChange={(e) => handleChange("expectations", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="objectives">Learning Objectives</Label>
                <Textarea
                  id="objectives"
                  placeholder="e.g., Master fractions, improve essay writing"
                  value={formData.objectives}
                  onChange={(e) => handleChange("objectives", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="outline" asChild>
              <Link href="/">Cancel</Link>
            </Button>
            <Button type="submit">Add Student</Button>
          </div>
        </form>
      </div>
    </TutorDashboardLayout>
  )
} 