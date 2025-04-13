import { useState } from "react"
import { Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface LessonPlanDialogProps {
  studentName: string
  subject: string
  date: string
  time: string
  children: React.ReactNode
}

export function LessonPlanDialog({ studentName, subject, date, time, children }: LessonPlanDialogProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [lessonPlan, setLessonPlan] = useState(`Python Programming Lesson Plan (Week 3)
Section 1: Warm-Up - Real-World Connection (15 min)

Imagine a world without programming.
List 3 apps or systems you use that rely on Python behind the scenes.
How would your life change without them?
Which of these have you used recently?

Section 2: Concept Check - Code Visualization (20 min)

Look at or write short code snippets for the following:

a) A basic Python function that adds two numbers
b) A loop that prints all even numbers from 1 to 10
c) A Python class that models a simple Student with name and score

For each:
- Annotate each line to explain what it does
- Describe what the output would be
- Reflect: What's one thing that could confuse someone new to Python?

Section 3: Case Study - AI Chatbot Debate (30 min)

Python is the go-to language for building AI chatbots.

Why might developers choose Python over other languages for this task?
What are the strengths and weaknesses of Python in large-scale systems?
Would you choose Python if you had to build your own chatbot? Why or why not?

Section 4: Practice - Solve and Explain (25 min)

What will be the output of this code?
def mystery(x):
    return x * x if x % 2 == 0 else x + 1

print(mystery(3))

Write a Python function that checks if a number is prime.
What happens if you use a mutable default argument in a function (e.g., def func(a, b=[]))?`)

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>{subject} - Lesson Plan</DialogTitle>
              <DialogDescription>
                {studentName} • {date} • {time}
              </DialogDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="h-4 w-4 mr-2" />
              {isEditing ? "Save" : "Edit"}
            </Button>
          </div>
        </DialogHeader>
        {isEditing ? (
          <Textarea
            value={lessonPlan}
            onChange={(e) => setLessonPlan(e.target.value)}
            className="min-h-[60vh] font-mono"
          />
        ) : (
          <div className="whitespace-pre-wrap font-mono">{lessonPlan}</div>
        )}
      </DialogContent>
    </Dialog>
  )
} 