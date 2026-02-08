/** @jsxImportSource react */
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AttendeeTable from './AttendeeTable'
import AnswerForm from './AnswerForm'
import PollResults from '../components/PollResults'

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
    answers: string // JSON string
    poll_answers: string | null
    comment: string
}

type Props = {
    eventId: string
    options: string[]
    attendees: Attendee[]
    pollConfig: PollConfig | null
}

export default function EventInteraction({ eventId, options, attendees, pollConfig }: Props) {
    const [showForm, setShowForm] = useState(false)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        const token = localStorage.getItem(`chousei_token_${eventId}`)
        if (!token) {
            setShowForm(true)
        }
    }, [eventId])

    const handleEdit = () => {
        setShowForm(true)
        // Smooth scroll to form
        setTimeout(() => {
            document.getElementById('answer-form-container')?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href)
        toast.success('URLをコピーしました')
    }

    return (
        <div className="space-y-8">
            <div className="bg-card border rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">現在の参加状況</h2>
                    <Button variant="outline" size="sm" onClick={handleCopy}>
                        <Copy className="mr-2 h-4 w-4" />
                        URLをコピー
                    </Button>
                </div>
                <AttendeeTable
                    eventId={eventId}
                    options={options}
                    attendees={attendees}
                    onEdit={handleEdit}
                />
            </div>

            {pollConfig && pollConfig.enabled && (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">アンケート集計</h2>
                    <PollResults pollConfig={pollConfig} attendees={attendees} />
                </div>
            )}

            <div id="answer-form-container" className="max-w-xl mx-auto">
                {showForm && <AnswerForm eventId={eventId} options={options} pollConfig={pollConfig || undefined} />}
                {!showForm && isClient && (
                    <div className="text-center text-muted-foreground p-8 bg-muted/50 rounded-lg">
                        <p>回答済みです。修正する場合は表内の編集ボタンを押してください。</p>
                    </div>
                )}
            </div>
        </div>
    )
}
