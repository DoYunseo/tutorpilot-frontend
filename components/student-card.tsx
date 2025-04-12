import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface StudentCardProps {
  name: string
  subject: string
  progress: number
  interests: string[]
  avatarSrc: string
  href: string
}

export function StudentCard({ name, subject, progress, interests, avatarSrc, href }: StudentCardProps) {
  // Generate initials from name
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")

  return (
    <Link href={href}>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardHeader className="p-4 pb-2">
          <div className="flex flex-col items-center">
            <Avatar className="h-16 w-16 border-2 border-muted mb-2">
              <AvatarImage src={avatarSrc || "/placeholder.svg"} alt={name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="font-semibold">{name}</h3>
              <div className="mt-1 px-2 py-1 bg-primary/10 rounded-md text-xs text-center max-w-full">{subject}</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Curriculum Completion</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" indicatorClassName="bg-green-500" />
          </div>
        </CardContent>
        <CardFooter className="border-t bg-muted/50 p-3">
          <div className="flex flex-wrap gap-1">
            {interests.slice(0, 3).map((interest, i) => (
              <span
                key={i}
                className="inline-flex items-center rounded-full bg-background px-2 py-0.5 text-xs font-medium"
              >
                {interest}
              </span>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
