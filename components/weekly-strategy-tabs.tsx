"use client"

import { useState } from "react"
import { Edit } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface WeekData {
  week: number
  title: string
  topics: string[]
  resources: string[]
  activities: string[]
  assessments: string[]
}

interface WeeklyStrategyTabsProps {
  weeks: WeekData[]
  onEditWeek: (weekNumber: number) => void
}

export function WeeklyStrategyTabs({ weeks, onEditWeek }: WeeklyStrategyTabsProps) {
  const [activeWeek, setActiveWeek] = useState("1")

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Weekly Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeWeek} onValueChange={setActiveWeek} className="space-y-4">
          <div className="overflow-x-auto pb-2">
            <TabsList className="inline-flex w-auto">
              {weeks.map((week) => (
                <TabsTrigger key={week.week} value={week.week.toString()}>
                  Week {week.week}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {weeks.map((week) => (
            <TabsContent key={week.week} value={week.week.toString()} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Week {week.week}: {week.title}
                </h3>
                <Button variant="outline" size="sm" onClick={() => onEditWeek(week.week)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Week
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Topics</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {week.topics.map((topic, index) => (
                        <li key={index} className="text-sm">
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Resources</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {week.resources.map((resource, index) => (
                        <li key={index} className="text-sm">
                          {resource}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Activities</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {week.activities.map((activity, index) => (
                        <li key={index} className="text-sm">
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Assessments</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {week.assessments.map((assessment, index) => (
                        <li key={index} className="text-sm">
                          {assessment}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
