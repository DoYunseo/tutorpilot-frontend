"use client"

import { useState } from "react"
import { GraduationCap, Plus, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { format, startOfWeek, addDays, addWeeks, subWeeks } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TutorDashboardLayout } from "@/components/tutor-dashboard-layout"
import { StudentCard } from "@/components/student-card"

// Mock student data
const students = [
  {
    id: "jin-hyun-park",
    name: "Jin Hyun Park",
    subject: "Python Programming",
    progress: 78,
    interests: ["Chess", "Robotics", "Coding"],
    avatarSrc: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "mei-lin-chen",
    name: "Mei Lin Chen",
    subject: "TOEFL",
    progress: 65,
    interests: ["Poetry", "Drama", "Debate"],
    avatarSrc: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "hiroshi-tanaka",
    name: "Hiroshi Tanaka",
    subject: "IB MYP Physics",
    progress: 42,
    interests: ["Basketball", "Video Games", "Space"],
    avatarSrc: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "soo-jin-kim",
    name: "Soo-Jin Kim",
    subject: "Python Programming",
    progress: 91,
    interests: ["Piano", "Art", "Science Fairs"],
    avatarSrc: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "yong-wei-zhang",
    name: "Yong Wei Zhang",
    subject: "IBDP Global Politics",
    progress: 58,
    interests: ["Documentaries", "Politics", "Reading"],
    avatarSrc: "/placeholder.svg?height=40&width=40",
  },
]

// Function to generate weekly schedule
const generateWeeklySchedule = (startDate: Date) => {
  return Array.from({ length: 7 }).map((_, index) => {
    const date = addDays(startDate, index)
    const dayStr = format(date, "EEE")
    const dateNum = parseInt(format(date, "d"))
    
    // Find lessons for this date (mock data - in real app would come from database)
    const mockLessons = [
      {
        date: 13,
        student: "Soo-Jin Kim",
        time: "10:00 - 11:30",
        topic: "Python Programming"
      },
      {
        date: 14,
        student: "Jin Hyun Park",
        time: "15:00 - 16:30",
        topic: "Python Programming"
      },
      {
        date: 15,
        student: "Mei Lin Chen",
        time: "14:00 - 15:30",
        topic: "TOEFL"
      },
      {
        date: 16,
        student: "Hiroshi Tanaka",
        time: "16:00 - 17:30",
        topic: "IB MYP Physics"
      }
    ]

    const lessons = mockLessons.filter(lesson => lesson.date === dateNum)
    
    return {
      day: dayStr,
      date: dateNum,
      lessons: lessons.map(lesson => ({
        student: lesson.student,
        time: lesson.time,
        topic: lesson.topic
      }))
    }
  })
}

export default function DashboardPage() {
  // State to track the selected subject filter
  const [selectedSubject, setSelectedSubject] = useState<string>("all")
  // State to track current week
  const [currentWeek, setCurrentWeek] = useState(new Date())

  // Get unique subjects from students
  const subjects = ["all", ...new Set(students.map((student) => student.subject))]

  // Filter students based on selected subject
  const filteredStudents =
    selectedSubject === "all" ? students : students.filter((student) => student.subject === selectedSubject)

  // Generate weekly schedule based on current week
  const weeklySchedule = generateWeeklySchedule(startOfWeek(currentWeek))

  // Navigation handlers
  const goToPreviousWeek = () => setCurrentWeek(prev => subWeeks(prev, 1))
  const goToNextWeek = () => setCurrentWeek(prev => addWeeks(prev, 1))

  return (
    <TutorDashboardLayout>
      <div className="flex flex-col gap-4 md:gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's an overview of your tutoring activities.</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Lesson
          </Button>
        </div>

        {/* Weekly Calendar */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                <h2 className="text-lg font-semibold">{format(currentWeek, "MMMM yyyy")}</h2>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={goToPreviousWeek}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setCurrentWeek(new Date())}>
                  This week
                </Button>
                <Button variant="outline" size="icon" onClick={goToNextWeek}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-4">
              {weeklySchedule.map((day, index) => (
                <div key={index} className="flex flex-col">
                  <div className="text-center mb-2">
                    <div className="text-sm font-medium">{day.day}</div>
                    <div className={`text-sm ${format(currentWeek, "d") === day.date.toString() ? 'bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center mx-auto' : ''}`}>
                      {day.date}
                    </div>
                  </div>
                  <div className="space-y-2">
                    {day.lessons.map((lesson, lessonIndex) => (
                      <div
                        key={lessonIndex}
                        className="bg-secondary p-2 rounded-md text-xs"
                      >
                        <div className="font-medium">{lesson.student}</div>
                        <div className="text-muted-foreground">{lesson.time}</div>
                        <div className="mt-1 line-clamp-2">{lesson.topic}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Student Cards */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            {subjects.map((subject) => (
              <Badge
                key={subject}
                variant={selectedSubject === subject ? "default" : "outline"}
                className="cursor-pointer hover:bg-accent"
                onClick={() => setSelectedSubject(subject)}
              >
                {subject === "all" ? "All Subjects" : subject}
              </Badge>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {filteredStudents.map((student) => (
              <StudentCard
                key={student.id}
                name={student.name}
                subject={student.subject}
                progress={student.progress}
                interests={student.interests}
                avatarSrc={student.avatarSrc}
                href={`/students/${student.id}`}
              />
            ))}
            <Card className="flex h-[220px] flex-col items-center justify-center border-dashed">
              <CardContent className="flex flex-col items-center justify-center pt-6">
                <Link href="/students/new" className="flex flex-col items-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-3">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium">Add New Student</h3>
                  <p className="text-sm text-muted-foreground text-center mt-2">Create a profile for a new student</p>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TutorDashboardLayout>
  )
}
