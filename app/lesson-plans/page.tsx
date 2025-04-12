"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Wand2, Save, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { TutorDashboardLayout } from "@/components/tutor-dashboard-layout"

// Mock student data
const students = [
  { id: "jin-hyun-park", name: "Jin Hyun Park", subject: "Python Programming" },
  { id: "mei-lin-chen", name: "Mei Lin Chen", subject: "TOEFL" },
  { id: "hiroshi-tanaka", name: "Hiroshi Tanaka", subject: "IB MYP Physics" },
  { id: "soo-jin-kim", name: "Soo-Jin Kim", subject: "Python Programming" },
  { id: "yong-wei-zhang", name: "Yong Wei Zhang", subject: "IBDP Global Politics" },
]

// Mock lesson dates
const lessonDates = [
  { id: "1", date: new Date(), startTime: "10:00", endTime: "11:30" },
  { id: "2", date: new Date(Date.now() + 86400000), startTime: "15:00", endTime: "16:30" },
  { id: "3", date: new Date(Date.now() + 172800000), startTime: "14:00", endTime: "15:30" },
  { id: "4", date: new Date(Date.now() + 259200000), startTime: "16:00", endTime: "17:30" },
  { id: "5", date: new Date(Date.now() + 345600000), startTime: "11:00", endTime: "12:30" },
]

// Generate lesson plan based on student and subject
const generateLessonPlan = (studentId: string, lessonDateId: string) => {
  const student = students.find((s) => s.id === studentId)
  const lessonDate = lessonDates.find((l) => l.id === lessonDateId)

  if (!student || !lessonDate) return null

  const lessonPlans = {
    "Python Programming": {
      objectives: [
        "Understand the principles of object-oriented programming in Python",
        "Implement classes and objects with appropriate attributes and methods",
        "Apply inheritance and polymorphism concepts to solve programming problems",
        "Debug and troubleshoot common OOP implementation issues",
      ],
      structure: `
# ${student.name}'s Python Programming Lesson - ${format(lessonDate.date, "MMMM d, yyyy")} (${lessonDate.startTime}-${lessonDate.endTime})

## Lesson Overview
This session will focus on object-oriented programming concepts in Python, building on previous knowledge of basic syntax and control structures.

## Lesson Structure

### 1. Warm-up (10 minutes)
- Review of previous concepts
- Quick coding challenge to reinforce prior learning

### 2. Introduction to Classes and Objects (20 minutes)
- Theoretical explanation with visual diagrams
- Live coding demonstration of class creation
- Discussion of real-world applications

### 3. Guided Practice (25 minutes)
- Step-by-step implementation of a simple class
- Adding methods and attributes
- Testing and debugging

### 4. Independent Practice (20 minutes)
- Individual coding exercise
- Implementation of a custom class based on student's interests
- Peer review and feedback

### 5. Wrap-up and Homework Assignment (15 minutes)
- Summary of key concepts
- Preview of next lesson
- Assignment of practice problems

## Materials Needed
- Python IDE
- Class diagram handouts
- Example code snippets
- Practice exercise worksheet
      `,
    },
    TOEFL: {
      objectives: [
        "Improve speaking fluency for TOEFL independent speaking tasks",
        "Develop effective note-taking strategies for listening sections",
        "Practice paraphrasing and summarizing academic content",
        "Build confidence in spontaneous English responses",
      ],
      structure: `
# ${student.name}'s TOEFL Preparation Lesson - ${format(lessonDate.date, "MMMM d, yyyy")} (${lessonDate.startTime}-${lessonDate.endTime})

## Lesson Overview
This session will focus on TOEFL speaking tasks, with emphasis on improving fluency and organization in responses.

## Lesson Structure

### 1. Warm-up (10 minutes)
- Casual conversation about recent activities
- Quick vocabulary review from previous lesson

### 2. TOEFL Speaking Task Analysis (15 minutes)
- Review of speaking task types and requirements
- Analysis of sample responses
- Discussion of scoring criteria

### 3. Guided Practice (25 minutes)
- Step-by-step approach to organizing responses
- Timed practice with feedback
- Focus on pronunciation and intonation

### 4. Independent Practice (30 minutes)
- Mock TOEFL speaking tasks
- Self-recording and evaluation
- Peer feedback session

### 5. Wrap-up and Homework Assignment (10 minutes)
- Summary of key strategies
- Assignment of practice tasks
- Preview of next lesson focus

## Materials Needed
- TOEFL speaking prompts
- Audio recording equipment
- Sample response transcripts
- Evaluation rubrics
      `,
    },
    "IB MYP Physics": {
      objectives: [
        "Understand the fundamental principles of electricity and magnetism",
        "Apply mathematical models to describe electromagnetic phenomena",
        "Design and conduct experiments to investigate electromagnetic interactions",
        "Connect theoretical concepts to real-world applications",
      ],
      structure: `
# ${student.name}'s IB MYP Physics Lesson - ${format(lessonDate.date, "MMMM d, yyyy")} (${lessonDate.startTime}-${lessonDate.endTime})

## Lesson Overview
This session will focus on electricity and magnetism concepts, building a foundation for understanding electromagnetic interactions.

## Lesson Structure

### 1. Warm-up (10 minutes)
- Review of previous concepts
- Quick quiz on basic electrical principles

### 2. Conceptual Introduction (20 minutes)
- Explanation of key electromagnetic principles
- Demonstration of magnetic field visualization
- Discussion of real-world applications

### 3. Mathematical Modeling (25 minutes)
- Introduction to relevant equations
- Worked examples with step-by-step solutions
- Guided problem-solving practice

### 4. Hands-on Activity (25 minutes)
- Small group experiment with simple circuits
- Data collection and analysis
- Connection to theoretical principles

### 5. Wrap-up and Homework Assignment (10 minutes)
- Summary of key concepts
- Preview of next lesson
- Assignment of practice problems and pre-reading

## Materials Needed
- Circuit components
- Magnets and iron filings
- Worksheets with practice problems
- Digital simulation tools
      `,
    },
    "IBDP Global Politics": {
      objectives: [
        "Analyze key theoretical frameworks in global politics",
        "Develop structured essay writing skills for political analysis",
        "Apply case study methodology to contemporary political issues",
        "Evaluate the effectiveness of international organizations in addressing global challenges",
      ],
      structure: `
# ${student.name}'s IBDP Global Politics Lesson - ${format(lessonDate.date, "MMMM d, yyyy")} (${lessonDate.startTime}-${lessonDate.endTime})

## Lesson Overview
This session will focus on theoretical frameworks in global politics and their application to case study analysis.

## Lesson Structure

### 1. Warm-up (10 minutes)
- Discussion of recent global news
- Review of key concepts from previous lesson

### 2. Theoretical Framework Analysis (20 minutes)
- Detailed explanation of realism, liberalism, and constructivism
- Comparison of theoretical perspectives
- Application to contemporary examples

### 3. Case Study Methodology (25 minutes)
- Introduction to effective case study analysis
- Demonstration using a sample case
- Discussion of evaluation criteria

### 4. Essay Structure Workshop (25 minutes)
- Analysis of sample essays
- Outline development practice
- Peer review and feedback

### 5. Wrap-up and Homework Assignment (10 minutes)
- Summary of key concepts
- Assignment of practice essay
- Preview of next lesson focus

## Materials Needed
- Case study handouts
- Sample essays and rubrics
- Outline templates
- Current event articles
      `,
    },
  }

  return lessonPlans[student.subject as keyof typeof lessonPlans]
}

export default function LessonPlansPage() {
  const [selectedStudent, setSelectedStudent] = useState<string>("")
  const [selectedLessonDate, setSelectedLessonDate] = useState<string>("")
  const [lessonPlan, setLessonPlan] = useState<{ objectives: string[]; structure: string } | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handleGenerate = () => {
    if (!selectedStudent || !selectedLessonDate) return

    setIsGenerating(true)

    // Simulate API call delay
    setTimeout(() => {
      const plan = generateLessonPlan(selectedStudent, selectedLessonDate)
      setLessonPlan(plan)
      setIsGenerating(false)
    }, 1500)
  }

  const handleSave = () => {
    setIsSaved(true)
    // Reset the saved state after 2 seconds
    setTimeout(() => {
      setIsSaved(false)
    }, 2000)
  }

  const formatLessonDate = (date: Date, startTime: string, endTime: string) => {
    return `${format(date, "MMM d, yyyy")} (${startTime}-${endTime})`
  }

  return (
    <TutorDashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lesson Plans</h1>
          <p className="text-muted-foreground">Generate and manage your lesson plans for upcoming sessions.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Generate Lesson Plan</CardTitle>
            <CardDescription>Select a student and lesson date to generate a customized lesson plan.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="student">Student</Label>
                <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                  <SelectTrigger id="student">
                    <SelectValue placeholder="Select a student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name} - {student.subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lesson-date">Lesson Date</Label>
                <Select value={selectedLessonDate} onValueChange={setSelectedLessonDate}>
                  <SelectTrigger id="lesson-date">
                    <SelectValue placeholder="Select a lesson date" />
                  </SelectTrigger>
                  <SelectContent>
                    {lessonDates.map((lesson) => (
                      <SelectItem key={lesson.id} value={lesson.id}>
                        {formatLessonDate(lesson.date, lesson.startTime, lesson.endTime)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              onClick={handleGenerate}
              disabled={!selectedStudent || !selectedLessonDate || isGenerating}
              className="w-full md:w-auto"
            >
              {isGenerating ? (
                <>Generating...</>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Lesson Plan
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {lessonPlan && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Objectives</CardTitle>
                <CardDescription>
                  Key goals for this lesson based on the student's needs and curriculum requirements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="ml-6 list-disc space-y-2">
                  {lessonPlan.objectives.map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Lesson Plan</CardTitle>
                    <CardDescription>
                      A detailed outline of the lesson plan. Edit as needed to customize for your student.
                    </CardDescription>
                  </div>
                  <Button 
                    variant={isSaved ? "default" : "outline"} 
                    size="sm"
                    onClick={handleSave}
                    className={isSaved ? "bg-green-500 hover:bg-green-600" : ""}
                  >
                    {isSaved ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  className="min-h-[500px] font-mono text-sm"
                  value={lessonPlan.structure}
                  onChange={(e) => setLessonPlan({ ...lessonPlan, structure: e.target.value })}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </TutorDashboardLayout>
  )
}
