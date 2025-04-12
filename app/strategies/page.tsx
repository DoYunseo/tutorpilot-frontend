"use client"

import { useState } from "react"
import { CalendarRange, Edit, GraduationCap, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TutorDashboardLayout } from "@/components/tutor-dashboard-layout"
import { StrategyGenerationForm } from "@/components/strategy-generation-form"
import { WeeklyStrategyTabs } from "@/components/weekly-strategy-tabs"
import { StrategyEditDialog } from "@/components/strategy-edit-dialog"

// Mock strategy data
const mockStrategy = {
  studentName: "Jin Hyun Park",
  subject: "Python Programming",
  duration: "12 weeks",
  objective: "Master Python fundamentals and build a strong foundation in programming concepts",
  weeks: [
    {
      week: 1,
      title: "Introduction to Python",
      topics: [
        "Setting up the development environment",
        "Basic syntax",
        "Variables and data types",
        "Simple operations",
      ],
      resources: ["Python.org documentation", "Automate the Boring Stuff with Python (Ch. 1-2)", "Practice exercises"],
      activities: ["Install Python and IDE", "Write first 'Hello World' program", "Complete basic syntax exercises"],
      assessments: ["Simple quiz on basic concepts", "Code review of practice exercises"],
    },
    {
      week: 2,
      title: "Control Flow",
      topics: ["Conditional statements", "Loops", "Boolean logic", "Comparison operators"],
      resources: [
        "Automate the Boring Stuff with Python (Ch. 3)",
        "Python.org tutorial on control flow",
        "Practice problems",
      ],
      activities: ["Implement decision-making programs", "Create loop-based solutions", "Debug control flow issues"],
      assessments: ["Control flow quiz", "Small project implementing various control structures"],
    },
    {
      week: 3,
      title: "Functions and Modules",
      topics: ["Function definition", "Parameters and arguments", "Return values", "Importing modules"],
      resources: ["Python.org documentation on functions", "Real Python tutorial on functions", "Practice exercises"],
      activities: ["Create custom functions", "Use built-in modules", "Refactor code using functions"],
      assessments: ["Function implementation exercises", "Code review focusing on modularity"],
    },
    {
      week: 4,
      title: "Data Structures: Lists and Tuples",
      topics: ["List operations", "List methods", "Tuples", "Sequence operations"],
      resources: ["Python.org documentation on data structures", "Practice problems", "Real-world examples"],
      activities: [
        "Implement list-based solutions",
        "Convert between data structures",
        "Solve sequence manipulation problems",
      ],
      assessments: ["Data structure quiz", "Project implementing various list operations"],
    },
    {
      week: 5,
      title: "Data Structures: Dictionaries and Sets",
      topics: [
        "Dictionary operations",
        "Dictionary methods",
        "Sets and set operations",
        "When to use which data structure",
      ],
      resources: ["Python.org documentation on dictionaries and sets", "Practice problems", "Real-world examples"],
      activities: [
        "Implement dictionary-based solutions",
        "Use sets for data deduplication",
        "Convert between data structures",
      ],
      assessments: [
        "Data structure implementation project",
        "Code review focusing on appropriate data structure selection",
      ],
    },
    {
      week: 6,
      title: "File I/O and Exception Handling",
      topics: ["Reading files", "Writing files", "Working with CSV and JSON", "Try/except blocks"],
      resources: [
        "Python.org documentation on file handling",
        "Automate the Boring Stuff (Ch. 8-9)",
        "Sample data files",
      ],
      activities: ["Read and write text files", "Process CSV data", "Implement robust error handling"],
      assessments: ["File processing mini-project", "Error handling scenarios quiz"],
    },
    {
      week: 7,
      title: "Introduction to Object-Oriented Programming",
      topics: ["Classes and objects", "Attributes and methods", "Constructors", "Object instantiation"],
      resources: ["Python.org documentation on classes", "Real Python OOP tutorial", "Practice exercises"],
      activities: ["Create simple classes", "Instantiate and use objects", "Model real-world concepts as classes"],
      assessments: ["OOP concept quiz", "Class implementation project"],
    },
    {
      week: 8,
      title: "Advanced OOP Concepts",
      topics: ["Inheritance", "Polymorphism", "Encapsulation", "Method overriding"],
      resources: ["Python.org documentation on inheritance", "Advanced OOP tutorials", "Practice exercises"],
      activities: [
        "Implement class hierarchies",
        "Use inheritance to solve problems",
        "Refactor code using OOP principles",
      ],
      assessments: ["Advanced OOP implementation project", "Code review focusing on OOP design"],
    },
    {
      week: 9,
      title: "Working with External Libraries",
      topics: [
        "pip and package management",
        "Virtual environments",
        "Common libraries overview",
        "Reading documentation",
      ],
      resources: ["Python Package Index", "Library-specific documentation", "Sample projects"],
      activities: [
        "Set up virtual environments",
        "Install and use external packages",
        "Explore popular Python libraries",
      ],
      assessments: ["Library usage mini-project", "Documentation reading exercise"],
    },
    {
      week: 10,
      title: "Introduction to Data Analysis",
      topics: ["NumPy basics", "Pandas introduction", "Data manipulation", "Simple visualizations"],
      resources: ["NumPy and Pandas documentation", "Data analysis tutorials", "Sample datasets"],
      activities: ["Perform basic data operations", "Clean and transform data", "Create simple visualizations"],
      assessments: ["Data analysis mini-project", "Data manipulation exercises"],
    },
    {
      week: 11,
      title: "Web Scraping and APIs",
      topics: ["HTML basics", "Using requests and BeautifulSoup", "API concepts", "JSON parsing"],
      resources: ["Web scraping tutorials", "API documentation examples", "Practice exercises"],
      activities: ["Scrape simple websites", "Make API calls", "Process and store retrieved data"],
      assessments: ["Web scraping project", "API integration exercise"],
    },
    {
      week: 12,
      title: "Final Project and Review",
      topics: ["Project planning", "Implementation", "Testing", "Documentation", "Course review"],
      resources: ["Project requirements document", "Python best practices guide", "Course materials for review"],
      activities: [
        "Design and implement final project",
        "Document code and functionality",
        "Review key course concepts",
      ],
      assessments: ["Final project submission", "Code review", "Comprehensive knowledge assessment"],
    },
  ],
}

export default function StrategiesPage() {
  const [activeStrategy, setActiveStrategy] = useState(mockStrategy)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingWeek, setEditingWeek] = useState<number | null>(null)

  const handleGenerateStrategy = (formData: any) => {
    setIsGenerating(true)

    // Simulate API call to LearnLM and Sonar
    setTimeout(() => {
      // In a real implementation, this would be the response from the API
      setActiveStrategy({
        ...mockStrategy,
        studentName: formData.student,
        subject: formData.subject,
        duration: `${formData.duration} weeks`,
        objective: formData.objective,
      })
      setIsGenerating(false)
    }, 2000)
  }

  const handleEditWeek = (weekNumber: number) => {
    setEditingWeek(weekNumber)
    setIsEditDialogOpen(true)
  }

  const handleSaveWeekEdit = (weekData: any) => {
    if (editingWeek === null) return

    const updatedWeeks = [...activeStrategy.weeks]
    updatedWeeks[editingWeek - 1] = {
      ...updatedWeeks[editingWeek - 1],
      ...weekData,
    }

    setActiveStrategy({
      ...activeStrategy,
      weeks: updatedWeeks,
    })

    setIsEditDialogOpen(false)
    setEditingWeek(null)
  }

  return (
    <TutorDashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Learning Strategies</h1>
          <p className="text-muted-foreground">Create and manage long-term learning strategies for your students</p>
        </div>

        <Tabs defaultValue="current" className="space-y-4">
          <TabsList>
            <TabsTrigger value="current">Current Strategy</TabsTrigger>
            <TabsTrigger value="generate">Generate New Strategy</TabsTrigger>
            <TabsTrigger value="library">Strategy Library</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-4">
            {activeStrategy ? (
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>
                          {activeStrategy.studentName}: {activeStrategy.subject}
                        </CardTitle>
                        <CardDescription>{activeStrategy.duration} learning strategy</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <CalendarRange className="mr-2 h-4 w-4" />
                          Schedule All
                        </Button>
                        <Button size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Strategy
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <h3 className="font-medium">Learning Objective</h3>
                        <p className="text-sm text-muted-foreground">{activeStrategy.objective}</p>
                      </div>
                      <div>
                        <h3 className="font-medium">Strategy Overview</h3>
                        <p className="text-sm text-muted-foreground">
                          This {activeStrategy.duration} strategy is designed to progressively build{" "}
                          {activeStrategy.studentName}'s skills in {activeStrategy.subject}, starting with fundamentals
                          and advancing to more complex topics.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <WeeklyStrategyTabs weeks={activeStrategy.weeks} onEditWeek={handleEditWeek} />
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <GraduationCap className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No Active Strategy</h3>
                  <p className="text-center text-muted-foreground mb-6">
                    You don't have an active learning strategy. Generate a new one or select from your library.
                  </p>
                  <Button>Generate New Strategy</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="generate">
            <StrategyGenerationForm onGenerate={handleGenerateStrategy} isGenerating={isGenerating} />
          </TabsContent>

          <TabsContent value="library">
            <Card>
              <CardHeader>
                <CardTitle>Strategy Library</CardTitle>
                <CardDescription>Browse and manage your saved learning strategies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                      type="search"
                      placeholder="Search strategies..."
                      className="w-full rounded-md border border-input bg-background py-2 pl-8 pr-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </div>
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    New Strategy
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="cursor-pointer hover:bg-accent/50 transition-colors">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Python Programming: Advanced</CardTitle>
                        <CardDescription>12-week strategy for Jin Hyun Park</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Created on April 10, 2023 • Last modified 2 weeks ago
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {editingWeek !== null && (
        <StrategyEditDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          weekData={activeStrategy.weeks[editingWeek - 1]}
          onSave={handleSaveWeekEdit}
        />
      )}
    </TutorDashboardLayout>
  )
}
