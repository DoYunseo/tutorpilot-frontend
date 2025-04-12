"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface StudentInfoDialogProps {
  student: {
    name: string
    avatar: string
    culturalBackground: string
    languageOfInstruction: string
    academicBackground: string
    disabilities?: string
  }
  trigger?: React.ReactNode
}

export function StudentInfoDialog({ student, trigger }: StudentInfoDialogProps) {
  const [open, setOpen] = useState(false)

  // Generate initials from name
  const initials = student.name
    .split(" ")
    .map((n) => n[0])
    .join("")

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Student Information</DialogTitle>
          <DialogDescription>Additional details about {student.name}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <Avatar className="h-24 w-24 border-2">
            <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold">{student.name}</h2>
        </div>
        <div className="grid gap-4">
          <div>
            <h3 className="mb-2 text-sm font-medium">Cultural Background</h3>
            <p className="text-sm text-muted-foreground">{student.culturalBackground}</p>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-medium">Language of Instruction</h3>
            <p className="text-sm text-muted-foreground">{student.languageOfInstruction}</p>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-medium">Academic Background</h3>
            <p className="text-sm text-muted-foreground">{student.academicBackground}</p>
          </div>
          {student.disabilities && (
            <div>
              <h3 className="mb-2 text-sm font-medium">Accommodations & Support Needs</h3>
              <p className="text-sm text-muted-foreground">{student.disabilities}</p>
            </div>
          )}
        </div>
        <div className="mt-4 flex justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>
            <X className="mr-2 h-4 w-4" />
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
