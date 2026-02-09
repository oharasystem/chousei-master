/** @jsxImportSource react */
import { Progress } from '@/islands/ui/progress'
import { Badge } from '@/islands/ui/badge'
import { Card, CardHeader, CardTitle, CardContent } from '@/islands/ui/card'

type PollConfig = {
  enabled: boolean
  title: string
  description?: string
  type: 'single' | 'multiple'
  options: string[]
}

type Attendee = {
  id: number
  name: string
  poll_answers: string | null // stringified JSON
}

type Props = {
  pollConfig: PollConfig
  attendees: Attendee[]
}

export default function PollResults({ pollConfig, attendees }: Props) {
  if (!pollConfig || !pollConfig.enabled) return null

  // Calculate results
  const results = pollConfig.options.map(option => {
    const voters = attendees.filter(a => {
      try {
        const answers = JSON.parse(a.poll_answers || '[]') as string[]
        // Check if answers is array
        if (Array.isArray(answers)) {
          return answers.includes(option)
        }
        return false
      } catch {
        return false
      }
    })
    return {
      option,
      count: voters.length,
      voters: voters.map(v => v.name)
    }
  })

  // Sort by count descending
  results.sort((a, b) => b.count - a.count)

  const totalAttendees = attendees.length
  const denominator = totalAttendees > 0 ? totalAttendees : 1

  return (
    <Card>
      <CardHeader>
        <CardTitle>{pollConfig.title}</CardTitle>
        {pollConfig.description && (
          <p className="text-sm text-muted-foreground">{pollConfig.description}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {results.map((result, i) => {
          const percentage = (result.count / denominator) * 100
          return (
            <div key={i} className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>{result.option}</span>
                <span>{result.count}票</span>
              </div>
              <Progress value={percentage} className="h-2" />
              {result.voters.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {result.voters.map((voter, j) => (
                    <Badge key={j} variant="outline" className="text-xs font-normal">
                      {voter}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
