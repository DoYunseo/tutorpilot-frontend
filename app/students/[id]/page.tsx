"use client"

import { useState } from "react"
import React from "react"
import Link from "next/link"
import { ArrowLeft, Edit, Info, LineChart, BarChart } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TutorDashboardLayout } from "@/components/tutor-dashboard-layout"
import { StudentInfoDialog } from "@/components/student-info-dialog"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// At the top of the file, after imports
interface StudentProgressData {
  recentFeedback: {
    class: number
    engagement: number
    completion: number
    objectiveProgress: number
    summary: string
    date: string
  }[]
  engagementTrend: number[]
  completionRate: number[]
  objectiveProgress: number
}

interface Student {
  name: string
  subject: string
  avatar: string
  interests: string[]
  favoriteSubjects: string[]
  expectations: string
  methodology: string
  progress: string
  learningObjectives: string[]
  culturalBackground: string
  languageOfInstruction: string
  academicBackground: string
  disabilities: string
  progressData: StudentProgressData
}

// Mock student data - in a real app, this would come from a database
const students: Record<string, Student> = {
  "jin-hyun-park": {
    name: "Jin Hyun Park",
    subject: "Python Programming",
    avatar: "/placeholder.svg?height=80&width=80",
    interests: ["Chess", "Robotics", "Coding", "Basketball", "Science Fiction"],
    favoriteSubjects: ["Computer Science", "Mathematics", "Physics"],
    expectations:
      "Wants to build a strong foundation in programming concepts and develop practical coding skills for future tech projects.",
    methodology:
      "Responds well to project-based learning and hands-on coding exercises. Needs challenging problems to stay engaged. Prefers structured lessons with clear goals.",
    progress:
      "Has mastered basic syntax and control structures. Currently working on object-oriented programming concepts and struggling with inheritance and polymorphism.",
    learningObjectives: [
      "Master object-oriented programming principles in Python",
      "Develop skills in data structures and algorithms",
      "Build a portfolio of Python projects",
      "Prepare for AP Computer Science exam",
    ],
    culturalBackground: "Korean, moved to the US five years ago",
    languageOfInstruction: "English (fluent)",
    academicBackground: "High school senior, taking AP Computer Science and Calculus",
    disabilities: "ADHD - requires frequent breaks and varied activities",
    progressData: {
      recentFeedback: [
        {
          class: 3,
          engagement: 4,
          completion: 85,
          objectiveProgress: 70,
          summary: "Strong engagement in OOP concepts, completed all exercises, needs more practice with inheritance",
          date: "2024-04-10"
        },
        {
          class: 2,
          engagement: 5,
          completion: 90,
          objectiveProgress: 60,
          summary: "Excellent participation in data structures discussion, implemented basic algorithms successfully",
          date: "2024-04-03"
        },
        {
          class: 1,
          engagement: 4,
          completion: 80,
          objectiveProgress: 45,
          summary: "Good start with Python basics, shows strong analytical thinking",
          date: "2024-03-27"
        }
      ],
      engagementTrend: [4, 5, 4],
      completionRate: [80, 90, 85],
      objectiveProgress: 70
    }
  },
  "mei-lin-chen": {
    name: "Mei Lin Chen",
    subject: "TOEFL",
    avatar: "/placeholder.svg?height=80&width=80",
    interests: ["Poetry", "Drama", "Debate"],
    favoriteSubjects: ["Literature", "History", "Arts"],
    expectations: "Aims to achieve high scores in TOEFL for university applications.",
    methodology: "Learns best through interactive discussions and role-playing exercises.",
    progress: "Making steady progress in speaking and writing sections.",
    learningObjectives: [
      "Improve speaking fluency",
      "Master academic writing structure",
      "Expand academic vocabulary",
      "Practice listening comprehension"
    ],
    culturalBackground: "Chinese, studying in international school",
    languageOfInstruction: "English and Mandarin",
    academicBackground: "International school student, preparing for university",
    disabilities: "",
    progressData: {
      recentFeedback: [
        {
          class: 3,
          engagement: 5,
          completion: 90,
          objectiveProgress: 75,
          summary: "Excellent progress in speaking tasks, good vocabulary usage",
          date: "2024-04-10"
        },
        {
          class: 2,
          engagement: 4,
          completion: 85,
          objectiveProgress: 65,
          summary: "Good writing practice, needs work on essay structure",
          date: "2024-04-03"
        },
        {
          class: 1,
          engagement: 4,
          completion: 80,
          objectiveProgress: 50,
          summary: "Started working on speaking confidence",
          date: "2024-03-27"
        }
      ],
      engagementTrend: [4, 4, 5],
      completionRate: [80, 85, 90],
      objectiveProgress: 75
    }
  },
  "hiroshi-tanaka": {
    name: "Hiroshi Tanaka",
    subject: "SAT Math",
    avatar: "/placeholder.svg?height=80&width=80",
    interests: ["Mathematics", "Baseball", "Gaming"],
    favoriteSubjects: ["Mathematics", "Physics", "Computer Science"],
    expectations: "Aims to score 750+ on SAT Math section.",
    methodology: "Prefers systematic approach with many practice problems.",
    progress: "Strong in algebra, needs work on geometry and data analysis.",
    learningObjectives: [
      "Master SAT-style problem solving",
      "Improve speed and accuracy",
      "Learn test-taking strategies",
      "Review all math concepts"
    ],
    culturalBackground: "Japanese exchange student",
    languageOfInstruction: "English and Japanese",
    academicBackground: "High school junior, strong math background",
    disabilities: "",
    progressData: {
      recentFeedback: [
        {
          class: 3,
          engagement: 5,
          completion: 95,
          objectiveProgress: 80,
          summary: "Excellent progress in geometry, completed all practice sets",
          date: "2024-04-10"
        },
        {
          class: 2,
          engagement: 4,
          completion: 90,
          objectiveProgress: 70,
          summary: "Good work on algebra problems, needs more speed drills",
          date: "2024-04-03"
        },
        {
          class: 1,
          engagement: 4,
          completion: 85,
          objectiveProgress: 55,
          summary: "Started with diagnostic test and concept review",
          date: "2024-03-27"
        }
      ],
      engagementTrend: [4, 4, 5],
      completionRate: [85, 90, 95],
      objectiveProgress: 80
    }
  },
  "soo-jin-kim": {
    name: "Soo-jin Kim",
    subject: "AP Chemistry",
    avatar: "/placeholder.svg?height=80&width=80",
    interests: ["Chemistry", "Art", "Music", "Reading"],
    favoriteSubjects: ["Chemistry", "Art", "Literature"],
    expectations: "Aiming for a 5 on AP Chemistry exam and exploring chemistry in art conservation.",
    methodology: "Prefers structured learning with clear examples and visual aids.",
    progress: "Excellent in stoichiometry and chemical reactions, needs support in thermodynamics.",
    learningObjectives: [
      "Master AP Chemistry concepts",
      "Improve lab techniques",
      "Connect chemistry to art conservation",
      "Prepare for AP exam"
    ],
    culturalBackground: "Korean-American",
    languageOfInstruction: "English",
    academicBackground: "High school junior, strong science background",
    disabilities: "Dyslexia - benefits from additional time for reading and writing tasks",
    progressData: {
      recentFeedback: [
        {
          class: 3,
          engagement: 5,
          completion: 95,
          objectiveProgress: 85,
          summary: "Excellent work on chemical equilibrium concepts",
          date: "2024-04-10"
        },
        {
          class: 2,
          engagement: 4,
          completion: 90,
          objectiveProgress: 75,
          summary: "Good progress in thermodynamics, needs more practice",
          date: "2024-04-03"
        },
        {
          class: 1,
          engagement: 5,
          completion: 95,
          objectiveProgress: 65,
          summary: "Strong start with atomic structure and bonding",
          date: "2024-03-27"
        }
      ],
      engagementTrend: [5, 4, 5],
      completionRate: [95, 90, 95],
      objectiveProgress: 85
    }
  },
  "yong-wei-zhang": {
    name: "Yong-wei Zhang",
    subject: "AP Calculus BC",
    avatar: "/placeholder.svg?height=80&width=80",
    interests: ["Mathematics", "Chess", "Piano", "Basketball"],
    favoriteSubjects: ["Mathematics", "Physics", "Music"],
    expectations: "Aims to achieve a perfect score on AP Calculus BC and participate in math competitions.",
    methodology: "Learns best through problem-solving and practical applications.",
    progress: "Strong understanding of derivatives and integrals, working on series and sequences.",
    learningObjectives: [
      "Master AP Calculus BC concepts",
      "Prepare for math competitions",
      "Develop advanced problem-solving skills",
      "Connect calculus to real-world applications"
    ],
    culturalBackground: "Chinese-American",
    languageOfInstruction: "English",
    academicBackground: "High school senior, math team captain",
    disabilities: "None reported",
    progressData: {
      recentFeedback: [
        {
          class: 3,
          engagement: 5,
          completion: 100,
          objectiveProgress: 95,
          summary: "Excellent mastery of integration techniques",
          date: "2024-04-10"
        },
        {
          class: 2,
          engagement: 5,
          completion: 98,
          objectiveProgress: 90,
          summary: "Strong performance on series and sequences",
          date: "2024-04-03"
        },
        {
          class: 1,
          engagement: 5,
          completion: 100,
          objectiveProgress: 85,
          summary: "Perfect understanding of advanced derivatives",
          date: "2024-03-27"
        }
      ],
      engagementTrend: [5, 5, 5],
      completionRate: [100, 98, 100],
      objectiveProgress: 95
    }
  },
  "sarah-johnson": {
    name: "Sarah Johnson",
    subject: "AP Biology",
    avatar: "/placeholder.svg?height=80&width=80",
    interests: ["Biology", "Environmental Science", "Hiking"],
    favoriteSubjects: ["Biology", "Chemistry", "Environmental Science"],
    expectations: "Preparing for AP Biology exam and building foundation for pre-med.",
    methodology: "Visual learner who benefits from diagrams and hands-on experiments.",
    progress: "Excelling in cellular biology, needs support in genetics.",
    learningObjectives: [
      "Master AP Biology concepts",
      "Develop scientific writing skills",
      "Practice lab techniques",
      "Prepare for AP exam"
    ],
    culturalBackground: "American",
    languageOfInstruction: "English",
    academicBackground: "High school junior, taking multiple AP sciences",
    disabilities: "Dyslexia - benefits from visual aids and extra time for reading",
    progressData: {
      recentFeedback: [
        {
          class: 3,
          engagement: 5,
          completion: 90,
          objectiveProgress: 85,
          summary: "Excellent understanding of cell processes, great lab work",
          date: "2024-04-10"
        },
        {
          class: 2,
          engagement: 4,
          completion: 85,
          objectiveProgress: 75,
          summary: "Good progress in genetics, needs more practice with Punnett squares",
          date: "2024-04-03"
        },
        {
          class: 1,
          engagement: 5,
          completion: 95,
          objectiveProgress: 60,
          summary: "Strong start with basic biological concepts",
          date: "2024-03-27"
        }
      ],
      engagementTrend: [5, 4, 5],
      completionRate: [95, 85, 90],
      objectiveProgress: 85
    }
  }
}

interface PageParams {
  params: Promise<{ id: string }>
}

export default function StudentPage({ params }: PageParams) {
  const resolvedParams = React.use(params)
  const student = students[resolvedParams.id as keyof typeof students]
  const [showInfo, setShowInfo] = useState(false)

  if (!student) {
    return <div>Student not found</div>
  }

  // Generate initials from name
  const initials = student.name
    .split(" ")
    .map((n) => n[0])
    .join("")

  // Calculate max values for charts
  const maxEngagement = 5 // Engagement is rated from 1-5
  const maxCompletion = 100 // Completion is in percentage

  return (
    <TutorDashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">{student.name}</h1>
          </div>
          <Button variant="outline" onClick={() => setShowInfo(!showInfo)}>
            <Info className="mr-2 h-4 w-4" />
            Student Info
          </Button>
        </div>

        {!showInfo ? (
          // Progress Tracker View
          <div className="space-y-6">
            {/* Overall Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Overall Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Objective Progress</span>
                      <span className="text-sm text-muted-foreground">{student.progressData.objectiveProgress}%</span>
                    </div>
                    <Progress value={student.progressData.objectiveProgress} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Metrics */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Engagement Trend */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base">
                    <LineChart className="h-4 w-4 inline-block mr-2" />
                    Engagement Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-end justify-between gap-2">
                    {student.progressData.engagementTrend.map((value, index) => (
                      <div key={index} className="relative flex-1">
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-primary rounded-t transition-all"
                          style={{ height: `${(value / maxEngagement) * 100}%` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    {student.progressData.recentFeedback.map((feedback, index) => (
                      <div key={index} className="text-xs text-muted-foreground">
                        Class {feedback.class}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Completion Rate */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base">
                    <BarChart className="h-4 w-4 inline-block mr-2" />
                    Completion Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-end justify-between gap-2">
                    {student.progressData.completionRate.map((value, index) => (
                      <div key={index} className="relative flex-1">
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-primary rounded-t transition-all"
                          style={{ height: `${(value / maxCompletion) * 100}%` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    {student.progressData.recentFeedback.map((feedback, index) => (
                      <div key={index} className="text-xs text-muted-foreground">
                        Class {feedback.class}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Feedback */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {student.progressData.recentFeedback.map((feedback, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex justify-between mb-2">
                          <div className="font-medium">Class {feedback.class}</div>
                          <div className="text-sm text-muted-foreground">{feedback.date}</div>
                        </div>
                        <div className="text-sm">{feedback.summary}</div>
                        <div className="flex gap-4 mt-2 text-sm">
                          <div>Engagement: {feedback.engagement}/5</div>
                          <div>Completion: {feedback.completion}%</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Student Info View
          <div className="grid gap-6 md:grid-cols-3">
            {/* Left column - Student info */}
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <StudentInfoDialog
                      student={{
                        name: student.name,
                        avatar: student.avatar,
                        culturalBackground: student.culturalBackground,
                        languageOfInstruction: student.languageOfInstruction,
                        academicBackground: student.academicBackground,
                        disabilities: student.disabilities,
                      }}
                      trigger={
                        <Avatar className="h-24 w-24 border-2 cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all">
                          <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                          <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                      }
                    />
                    <h2 className="mt-4 text-xl font-bold">{student.name}</h2>
                    <p className="text-sm text-muted-foreground">{student.subject}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Personal Interests</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="ml-6 list-disc text-sm">
                    {student.interests.map((interest, index) => (
                      <li key={index} className="mt-1">
                        {interest}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Favorite Subjects</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="ml-6 list-disc text-sm">
                    {student.favoriteSubjects.map((subject, index) => (
                      <li key={index} className="mt-1">
                        {subject}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Right column - Student details */}
            <div className="space-y-6 md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Expectations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{student.expectations}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">What Works for the Student</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{student.methodology}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Current Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{student.progress}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-base">Learning Objectives</CardTitle>
                  <Button size="sm" variant="outline">
                    <Edit className="mr-2 h-3 w-3" />
                    Edit
                  </Button>
                </CardHeader>
                <CardContent>
                  <ol className="ml-6 list-decimal text-sm">
                    {student.learningObjectives.map((objective, index) => (
                      <li key={index} className="mt-2">
                        {objective}
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </TutorDashboardLayout>
  )
}
