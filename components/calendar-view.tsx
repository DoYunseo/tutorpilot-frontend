"use client"

import { useState } from "react"
import { addDays, format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from "date-fns"
import { CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Mock lesson data
const lessons = [
  {
    id: 1,
    student: "Jin Hyun Park",
    subject: "Python Programming",
    date: addDays(new Date(), 1),
    startTime: "15:00",
    endTime: "16:30",
    topic: "Object-Oriented Programming",
  },
  {
    id: 2,
    student: "Mei Lin Chen",
    subject: "TOEFL",
    date: addDays(new Date(), 2),
    startTime: "14:00",
    endTime: "15:30",
    topic: "Speaking Practice: Task 1 & 2",
  },
  {
    id: 3,
    student: "Hiroshi Tanaka",
    subject: "IB MYP Physics",
    date: addDays(new Date(), 3),
    startTime: "16:00",
    endTime: "17:30",
    topic: "Electricity and Magnetism",
  },
  {
    id: 4,
    student: "Soo-Jin Kim",
    subject: "Python Programming",
    date: new Date(),
    startTime: "10:00",
    endTime: "11:30",
    topic: "Data Analysis with Pandas",
  },
]

export function CalendarView() {
  const [date, setDate] = useState<Date>(new Date())
  const [view, setView] = useState<"week" | "month">("week")

  // Generate days for the current month
  const monthStart = startOfMonth(date)
  const monthEnd = endOfMonth(date)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Filter lessons for a specific day
  const getDayLessons = (day: Date) => {
    return lessons.filter((lesson) => isSameDay(lesson.date, day))
  }

  // Navigate to previous/next month
  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(date.getFullYear(), date.getMonth() + (direction === "next" ? 1 : -1))
    setDate(newDate)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span>{format(date, "MMMM yyyy")}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => navigateMonth("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Lesson
        </Button>
      </div>

      <Tabs value={view} onValueChange={(v) => setView(v as "week" | "month")}>
        <TabsList>
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
        </TabsList>
        <TabsContent value="week" className="mt-4">
          {/* Week view content */}
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 7 }).map((_, i) => {
              const day = addDays(date, i - date.getDay())
              return (
                <div key={day.toString()} className="flex flex-col">
                  <div className="mb-2 text-center">
                    <div className="text-sm font-medium">{format(day, "EEE")}</div>
                    <div
                      className={cn(
                        "mx-auto flex h-7 w-7 items-center justify-center rounded-full text-sm",
                        isSameDay(day, new Date()) ? "bg-primary text-primary-foreground" : ""
                      )}
                    >
                      {format(day, "d")}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    {getDayLessons(day).map((lesson) => (
                      <Card key={lesson.id} className="border-l-4 border-l-primary">
                        <CardContent className="p-2">
                          <div className="text-xs font-medium">{lesson.student}</div>
                          <div className="text-xs text-muted-foreground">
                            {lesson.startTime} - {lesson.endTime}
                          </div>
                          <div className="mt-1 text-xs">{lesson.topic}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </TabsContent>
        <TabsContent value="month" className="mt-4">
          {/* Month view content */}
          <div className="grid grid-cols-7 gap-2">
            {/* Day headers */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center text-sm font-medium p-2">
                {day}
              </div>
            ))}
            {/* Empty cells for days before the month starts */}
            {Array.from({ length: monthStart.getDay() }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square p-2 border rounded-lg" />
            ))}
            {/* Calendar days */}
            {monthDays.map((day) => (
              <div
                key={day.toString()}
                className={cn(
                  "h-28 border rounded-lg p-2 flex flex-col",
                  isSameDay(day, new Date()) ? "bg-primary/5" : "",
                  !isSameMonth(day, date) ? "opacity-50" : ""
                )}
              >
                <div className="text-right">
                  <span
                    className={cn(
                      "inline-flex h-6 w-6 items-center justify-center rounded-full text-sm",
                      isSameDay(day, new Date()) ? "bg-primary text-primary-foreground" : ""
                    )}
                  >
                    {format(day, "d")}
                  </span>
                </div>
                <div className="flex-1 overflow-y-auto space-y-1">
                  {getDayLessons(day).map((lesson) => (
                    <div
                      key={lesson.id}
                      className="text-xs bg-primary/10 rounded p-1"
                    >
                      <div className="font-medium truncate">{lesson.student}</div>
                      <div className="text-muted-foreground">{lesson.startTime} - {lesson.endTime}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
