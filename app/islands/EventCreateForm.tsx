import { useState } from 'react'
import { Plus, X, Loader2, Calendar as CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Calendar } from '@/components/ui/calendar'

export default function EventCreateForm() {
  const [title, setTitle] = useState('')
  const [memo, setMemo] = useState('')
  const [candidates, setCandidates] = useState<string[]>([])

  // Poll State
  const [pollEnabled, setPollEnabled] = useState(false)
  const [pollTitle, setPollTitle] = useState('')
  const [pollDescription, setPollDescription] = useState('')
  const [pollType, setPollType] = useState<'single' | 'multiple'>('single')
  const [pollOptions, setPollOptions] = useState<string[]>([''])

  const [loading, setLoading] = useState(false)

  // Calendar & Time state
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [timeEnabled, setTimeEnabled] = useState(true)
  const [timeValue, setTimeValue] = useState('19:00')

  // Bulk input state
  const [bulkText, setBulkText] = useState('')

  const handleDateClick = (day: Date) => {
    if (!day) return
    // Format: YYYY/MM/DD(aaa)
    const dateStr = format(day, 'yyyy/MM/dd(eee)', { locale: ja })
    const candidate = timeEnabled ? `${dateStr} ${timeValue}` : dateStr

    setCandidates(prev => [...prev, candidate])
    setDate(day)
  }

  const addCandidate = () => {
    setCandidates(prev => [...prev, ''])
  }

  const removeCandidate = (index: number) => {
    setCandidates(prev => prev.filter((_, i) => i !== index))
  }

  const updateCandidate = (index: number, value: string) => {
    setCandidates(prev => {
      const newCandidates = [...prev]
      newCandidates[index] = value
      return newCandidates
    })
  }

  const handleBulkAdd = () => {
    if (!bulkText.trim()) return
    const lines = bulkText.split(/[\n,]/)
      .map(s => s.trim())
      .filter(s => s !== '')

    if (lines.length > 0) {
      setCandidates(prev => [...prev, ...lines])
      setBulkText('')
    }
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
    <Card className="w-full max-w-4xl mx-auto mt-10">
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
            <Label>候補日程</Label>

            <div className="grid md:grid-cols-2 gap-8 border rounded-lg p-6 bg-slate-50/50">
              {/* Left/Top Column: Calendar */}
              <div className="flex flex-col gap-6">
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs font-normal">
                    カレンダーから追加
                  </Label>
                  <div className="border rounded-md bg-white w-fit mx-auto md:mx-0 p-4">
                    <Calendar
                      mode="single"
                      selected={date}
                      onDayClick={handleDateClick}
                      locale={ja}
                      className="rounded-md border-none"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4 bg-white p-3 rounded-md border w-fit">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="time-mode"
                      checked={timeEnabled}
                      onCheckedChange={setTimeEnabled}
                    />
                    <Label htmlFor="time-mode" className="cursor-pointer text-sm font-medium">時間を追加</Label>
                  </div>
                  {timeEnabled && (
                    <Input
                      type="time"
                      value={timeValue}
                      onChange={(e) => setTimeValue(e.target.value)}
                      className="w-28 h-8"
                    />
                  )}
                </div>
              </div>

              {/* Right/Bottom Column: List & Bulk Input */}
              <div className="flex flex-col gap-6">
                {/* Bulk Input */}
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs font-normal">
                    テキストで一括追加 (改行またはカンマ区切り)
                  </Label>
                  <div className="flex flex-col gap-2">
                    <Textarea
                      placeholder="例: 候補A, 候補B..."
                      value={bulkText}
                      onChange={(e) => setBulkText(e.target.value)}
                      className="bg-white"
                      rows={3}
                    />
                    <Button type="button" variant="secondary" onClick={handleBulkAdd} size="sm" className="w-full">
                      リストに追加
                    </Button>
                  </div>
                </div>

                {/* Candidate List */}
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex justify-between items-center border-b pb-2">
                    <Label className="text-sm font-medium">候補リスト ({candidates.length})</Label>
                    {candidates.length > 0 && (
                      <Button type="button" variant="ghost" size="sm" onClick={() => setCandidates([])} className="h-6 text-xs text-muted-foreground hover:text-destructive px-2">
                        <X className="h-3 w-3 mr-1" />全てクリア
                      </Button>
                    )}
                  </div>

                  <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 min-h-[100px]">
                    {candidates.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-sm border-2 border-dashed rounded-lg p-6 bg-slate-50">
                        <CalendarIcon className="h-8 w-8 mb-2 opacity-20" />
                        <p>カレンダーの日付をクリックするか</p>
                        <p>テキストを入力して追加してください</p>
                      </div>
                    ) : (
                      candidates.map((candidate, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={candidate}
                            onChange={(e) => updateCandidate(index, e.target.value)}
                            placeholder={`候補 ${index + 1}`}
                            className="bg-white flex-1"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeCandidate(index)}
                            className="shrink-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))
                    )}
                  </div>

                  <Button type="button" variant="outline" onClick={addCandidate} className="w-full bg-white mt-2">
                    <Plus className="mr-2 h-4 w-4" /> 自由入力枠を追加
                  </Button>
                </div>
              </div>
            </div>
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
          <Button type="submit" className="w-full" disabled={loading || candidates.length === 0}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            イベントを作成
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
