/** @jsxImportSource react */
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AttendeeTable from './AttendeeTable'
import AnswerForm from './AnswerForm'

type Attendee = {
    id: number
    name: string
    answers: string // JSON string
    comment: string
}

type Props = {
    eventId: string
    options: string[]
    attendees: Attendee[]
}

export default function EventInteraction({ eventId, options, attendees }: Props) {
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

            <div id="answer-form-container" className="max-w-xl mx-auto">
                {/* Server-side default: render form invisible if js disabled? No, better to render visible for SSR/SEO, then hide client-side if token exists. */}
                {/* Current logic: initial showForm false. On mount, if no token, set true. */}
                {/* If JS disabled, form won't show. For better progressive enhancement, we might want to default true, but client request was "hide initially". */}
                {/* Let's stick to client-side logic as requested for UX. Form appears if no token or edit clicked. */}

                {showForm && <AnswerForm eventId={eventId} options={options} />}
                {!showForm && isClient && (
                    <div className="text-center text-muted-foreground p-8 bg-muted/50 rounded-lg">
                        <p>回答済みです。修正する場合は表内の編集ボタンを押してください。</p>
                    </div>
                )}
            </div>
        </div>
    )
}
