/** @jsxImportSource react */
import { useState, useEffect } from 'react'
import { Button } from '@/islands/ui/button'
import { Input } from '@/islands/ui/input'
import { Label } from '@/islands/ui/label'
import { RadioGroup, RadioGroupItem } from '@/islands/ui/radio-group'
import { Checkbox } from '@/islands/ui/checkbox'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/islands/ui/card'

type PollConfig = {
  enabled: boolean
  title: string
  description?: string
  type: 'single' | 'multiple'
  options: string[]
}

type Props = {
  eventId: string
  options: string[]
  pollConfig?: PollConfig
}

type AnswerResponse = {
  name: string
  answers: Record<string, number>
  poll_answers?: string[]
  comment: string
}

type SubmitResponse = {
  token?: string
  error?: string
}

export default function AnswerForm({ eventId, options, pollConfig }: Props) {
  const [token, setToken] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [answers, setAnswers] = useState<Record<string, number>>(() => {
    const defaults: Record<string, number> = {}
    options.forEach((_, i) => defaults[String(i)] = 2)
    return defaults
  })
  const [pollAnswers, setPollAnswers] = useState<string[]>([])
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const storedToken = localStorage.getItem(`chousei_token_${eventId}`)
    if (storedToken) {
      setToken(storedToken)
      setLoading(true)
      fetch(`/api/events/${eventId}/answer?token=${storedToken}`)
        .then(res => {
          if (res.ok) return res.json()
          throw new Error('Failed to fetch')
        })
        .then((data: unknown) => {
          const d = data as AnswerResponse
          setName(d.name)
          setAnswers(d.answers)
          setPollAnswers(d.poll_answers || [])
          setComment(d.comment || '')
        })
        .catch(err => {
          console.error(err)
          // Invalid token? remove it?
          localStorage.removeItem(`chousei_token_${eventId}`)
          setToken(null)

          // Re-initialize defaults
          const defaults: Record<string, number> = {}
          options.forEach((_, i) => defaults[String(i)] = 2)
          setAnswers(defaults)
        })
        .finally(() => setLoading(false))
    }
  }, [eventId, options])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await fetch(`/api/events/${eventId}/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          name,
          answers,
          poll_answers: pollAnswers,
          comment
        })
      })

      if (!res.ok) throw new Error('Failed to submit')

      const data = (await res.json()) as SubmitResponse
      if (data.token) {
        localStorage.setItem(`chousei_token_${eventId}`, data.token)
        setToken(data.token)
      }

      // Save to history
      const answered = JSON.parse(localStorage.getItem('chousei_answered_events') || '[]')
      if (!answered.includes(eventId)) {
        answered.push(eventId)
        localStorage.setItem('chousei_answered_events', JSON.stringify(answered))
      }

      // Reload to reflect changes in the table
      window.location.reload()
    } catch (err) {
      console.error(err)
      alert('エラーが発生しました')
    } finally {
      setSubmitting(false)
    }
  }

  const setAnswer = (index: number, value: number) => {
    setAnswers(prev => ({ ...prev, [String(index)]: value }))
  }

  if (loading) return <div>Loading...</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>{token ? '回答を編集する' : '出欠を入力する'}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">お名前</Label>
            <Input
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              placeholder="山田 太郎"
            />
          </div>

          <div className="space-y-2">
            <Label>日程候補</Label>
            <div className="space-y-2">
              {options.map((opt, i) => (
                <div key={i} className="flex items-center justify-between border p-2 rounded-md">
                  <span className="text-sm">{opt}</span>
                  <div className="flex gap-1">
                    <Button
                      type="button"
                      variant={answers[String(i)] === 2 ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setAnswer(i, 2)}
                      className="w-10 h-10 p-0"
                    >
                      ◯
                    </Button>
                    <Button
                      type="button"
                      variant={answers[String(i)] === 1 ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setAnswer(i, 1)}
                      className="w-10 h-10 p-0"
                    >
                      △
                    </Button>
                    <Button
                      type="button"
                      variant={answers[String(i)] === 0 ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setAnswer(i, 0)}
                      className="w-10 h-10 p-0"
                    >
                      ×
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {pollConfig && pollConfig.enabled && (
            <div className="space-y-4 pt-4 border-t">
              <div className="space-y-1">
                <Label className="text-base">{pollConfig.title}</Label>
                {pollConfig.description && (
                  <p className="text-sm text-muted-foreground">{pollConfig.description}</p>
                )}
              </div>

              {pollConfig.type === 'single' ? (
                <RadioGroup
                  value={pollAnswers[0] || ''}
                  onValueChange={(val) => setPollAnswers([val])}
                  className="space-y-2"
                >
                  {pollConfig.options.map((opt, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <RadioGroupItem value={opt} id={`poll-opt-${i}`} />
                      <Label htmlFor={`poll-opt-${i}`} className="font-normal cursor-pointer">{opt}</Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <div className="space-y-2">
                  {pollConfig.options.map((opt, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <Checkbox
                        id={`poll-opt-${i}`}
                        checked={pollAnswers.includes(opt)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setPollAnswers([...pollAnswers, opt])
                          } else {
                            setPollAnswers(pollAnswers.filter(a => a !== opt))
                          }
                        }}
                      />
                      <Label htmlFor={`poll-opt-${i}`} className="font-normal cursor-pointer">{opt}</Label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="space-y-2 pt-4 border-t">
            <Label htmlFor="comment">コメント</Label>
            <Input
              id="comment"
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="遅れるかもしれません"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? '送信中...' : '回答を送信する'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
