"use client"

import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface WeekData {
  week: number
  title: string
  topics: string[]
  resources: string[]
  activities: string[]
  assessments: string[]
}

interface StrategyEditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  weekData: WeekData
  onSave: (weekData: WeekData) => void
}

export function StrategyEditDialog({ open, onOpenChange, weekData, onSave }: StrategyEditDialogProps) {
  const [editData, setEditData] = useState<WeekData>({
    week: 1,
    title: "",
    topics: [],
    resources: [],
    activities: [],
    assessments: [],
  })

  useEffect(() => {
    if (weekData) {
      setEditData(weekData)
    }
  }, [weekData])

  const handleChange = (field: string, value: string) => {
    if (field === "title") {
      setEditData((prev) => ({ ...prev, title: value }))
    } else {
      // For arrays, split by new lines
      setEditData((prev) => ({
        ...prev,
        [field]: value.split("\n").filter((item) => item.trim() !== ""),
      }))
    }
  }

  const handleSubmit = () => {
    onSave(editData)
  }

  // Convert arrays to newline-separated strings for textarea
  const arrayToText = (arr: string[]) => arr.join("\n")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Week {weekData?.week}</DialogTitle>
          <DialogDescription>Modify the content for this week's learning strategy.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Week Title</Label>
            <Input id="title" value={editData.title} onChange={(e) => handleChange("title", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="topics">Topics (one per line)</Label>
            <Textarea
              id="topics"
              value={arrayToText(editData.topics)}
              onChange={(e) => handleChange("topics", e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="resources">Resources (one per line)</Label>
            <Textarea
              id="resources"
              value={arrayToText(editData.resources)}
              onChange={(e) => handleChange("resources", e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="activities">Activities (one per line)</Label>
            <Textarea
              id="activities"
              value={arrayToText(editData.activities)}
              onChange={(e) => handleChange("activities", e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="assessments">Assessments (one per line)</Label>
            <Textarea
              id="assessments"
              value={arrayToText(editData.assessments)}
              onChange={(e) => handleChange("assessments", e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
