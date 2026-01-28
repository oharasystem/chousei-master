/** @jsxImportSource react */
import { useEffect, useState } from 'react'
import { Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

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
    onEdit: () => void
}

const formatAnswer = (val: number) => {
    if (val === 2) return '◯'
    if (val === 1) return '△'
    if (val === 0) return '×'
    return '-'
}

export default function AttendeeTable({ eventId, options, attendees, onEdit }: Props) {
    const [currentUserId, setCurrentUserId] = useState<number | null>(null)

    useEffect(() => {
        const token = localStorage.getItem(`chousei_token_${eventId}`)
        if (token) {
            fetch(`/api/events/${eventId}/answer?token=${token}`)
                .then((res) => {
                    if (res.ok) return res.json()
                    throw new Error('Failed to fetch')
                })
                .then((data: any) => {
                    if (data.id) {
                        setCurrentUserId(data.id)
                    }
                })
                .catch((err) => {
                    console.error('Failed to identify user', err)
                })
        }
    }, [eventId])

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[150px]">名前</TableHead>
                    {options.map((opt, i) => (
                        <TableHead key={i} className="text-center">
                            {opt}
                        </TableHead>
                    ))}
                    <TableHead>コメント</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {attendees.length === 0 && (
                    <TableRow>
                        <TableCell
                            colSpan={options.length + 3}
                            className="text-center h-24 text-muted-foreground"
                        >
                            まだ回答がありません
                        </TableCell>
                    </TableRow>
                )}
                {attendees.map((attendee) => {
                    const answers = JSON.parse(attendee.answers) as Record<string, number>
                    const isCurrentUser = currentUserId === attendee.id
                    return (
                        <TableRow
                            key={attendee.id}
                            className={isCurrentUser ? 'bg-orange-100 hover:bg-orange-200 dark:bg-orange-900/20 dark:hover:bg-orange-900/40' : ''}
                        >
                            <TableCell className="font-medium">{attendee.name}</TableCell>
                            {options.map((_, i) => (
                                <TableCell key={i} className="text-center">
                                    {formatAnswer(answers[String(i)])}
                                </TableCell>
                            ))}
                            <TableCell>{attendee.comment}</TableCell>
                            <TableCell>
                                {isCurrentUser && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={onEdit}
                                        className="h-8 w-8 cursor-pointer transition-all hover:bg-orange-200 hover:text-orange-900 active:scale-95 active:bg-orange-300 dark:hover:bg-orange-800 dark:hover:text-orange-50 dark:active:bg-orange-700"
                                        title="回答を編集する"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}
