import { useState } from 'react'
import { Plus, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'

export default function EventCreateForm() {
  const [title, setTitle] = useState('')
  const [memo, setMemo] = useState('')
  const [candidates, setCandidates] = useState<string[]>([''])
  const [loading, setLoading] = useState(false)

  const addCandidate = () => {
    setCandidates([...candidates, ''])
  }

  const removeCandidate = (index: number) => {
    setCandidates(candidates.filter((_, i) => i !== index))
  }

  const updateCandidate = (index: number, value: string) => {
    const newCandidates = [...candidates]
    newCandidates[index] = value
    setCandidates(newCandidates)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Filter empty candidates
    const validCandidates = candidates.filter(c => c.trim() !== '')

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          memo,
          options: validCandidates,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        if (data.id) {
            // Save to history
            const created = JSON.parse(localStorage.getItem('chousei_created_events') || '[]')
            if (!created.includes(data.id)) {
                created.push(data.id)
                localStorage.setItem('chousei_created_events', JSON.stringify(created))
            }

            window.location.href = `/events/${data.id}`
        } else {
            alert('Event created!')
        }
      } else {
        alert('Failed to create event')
      }
    } catch (error) {
      console.error(error)
      alert('Error creating event')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>新規イベント作成</CardTitle>
        <CardDescription>イベント名と候補を入力して作成してください。</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">イベント名</Label>
            <Input
              id="title"
              placeholder="飲み会、打ち合わせなど"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="memo">メモ (任意)</Label>
            <Input
              id="memo"
              placeholder="詳細や場所など"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>候補</Label>
            {candidates.map((candidate, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={candidate}
                  onChange={(e) => updateCandidate(index, e.target.value)}
                  placeholder={`候補 ${index + 1}`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCandidate(index)}
                  disabled={candidates.length === 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addCandidate} className="w-full">
              <Plus className="mr-2 h-4 w-4" /> 候補を追加
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            イベントを作成
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
