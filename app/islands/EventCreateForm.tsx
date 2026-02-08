import { useState } from 'react'
import { Plus, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'

export default function EventCreateForm() {
  const [title, setTitle] = useState('')
  const [memo, setMemo] = useState('')
  const [candidates, setCandidates] = useState<string[]>([''])

  // Poll State
  const [pollEnabled, setPollEnabled] = useState(false)
  const [pollTitle, setPollTitle] = useState('')
  const [pollDescription, setPollDescription] = useState('')
  const [pollType, setPollType] = useState<'single' | 'multiple'>('single')
  const [pollOptions, setPollOptions] = useState<string[]>([''])

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

  // Poll Helpers
  const addPollOption = () => {
    setPollOptions([...pollOptions, ''])
  }

  const removePollOption = (index: number) => {
    setPollOptions(pollOptions.filter((_, i) => i !== index))
  }

  const updatePollOption = (index: number, value: string) => {
    const newOptions = [...pollOptions]
    newOptions[index] = value
    setPollOptions(newOptions)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Filter empty candidates
    const validCandidates = candidates.filter(c => c.trim() !== '')
    const validPollOptions = pollOptions.filter(o => o.trim() !== '')

    const payload: any = {
      title,
      memo,
      options: validCandidates,
    }

    if (pollEnabled) {
      if (!pollTitle) {
        alert('アンケートの質問タイトルを入力してください')
        setLoading(false)
        return
      }
      if (validPollOptions.length === 0) {
        alert('アンケートの選択肢を少なくとも1つ入力してください')
        setLoading(false)
        return
      }
      payload.poll_config = {
        enabled: true,
        title: pollTitle,
        description: pollDescription,
        type: pollType,
        options: validPollOptions
      }
    }

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
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

          {/* Poll Section */}
          <div className="space-y-4 pt-6 border-t">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">アンケート機能を利用する</Label>
                <p className="text-sm text-muted-foreground">
                  日程調整と同時に、場所や内容などのアンケートを実施できます。
                </p>
              </div>
              <Switch
                checked={pollEnabled}
                onCheckedChange={setPollEnabled}
              />
            </div>

            {pollEnabled && (
              <div className="space-y-4 pl-4 border-l-2 border-muted animate-in fade-in slide-in-from-top-4">
                <div className="space-y-2">
                  <Label htmlFor="pollTitle">質問タイトル <span className="text-red-500">*</span></Label>
                  <Input
                    id="pollTitle"
                    value={pollTitle}
                    onChange={(e) => setPollTitle(e.target.value)}
                    placeholder="例: ランチの場所は？"
                    required={pollEnabled}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pollDescription">補足説明 (任意)</Label>
                  <Textarea
                    id="pollDescription"
                    value={pollDescription}
                    onChange={(e) => setPollDescription(e.target.value)}
                    placeholder="例: アレルギー等あればコメントに。"
                  />
                </div>

                <div className="space-y-2">
                  <Label>回答形式</Label>
                  <RadioGroup
                    value={pollType}
                    onValueChange={(val) => setPollType(val as 'single' | 'multiple')}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="single" id="r-single" />
                      <Label htmlFor="r-single">単一選択 (ラジオボタン)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="multiple" id="r-multiple" />
                      <Label htmlFor="r-multiple">複数選択 (チェックボックス)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>選択肢</Label>
                  {pollOptions.map((option, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={option}
                        onChange={(e) => updatePollOption(index, e.target.value)}
                        placeholder={`選択肢 ${index + 1}`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removePollOption(index)}
                        disabled={pollOptions.length === 1}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addPollOption} className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> 選択肢を追加
                  </Button>
                </div>
              </div>
            )}
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
