import { createRoute } from 'honox/factory'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import AnswerForm from '../../islands/AnswerForm'

type Attendee = {
  id: number
  name: string
  answers: string // JSON string
  comment: string
}

export default createRoute(async (c) => {
  const id = c.req.param('id')
  const event = await c.env.DB.prepare('SELECT * FROM events WHERE id = ?').bind(id).first<{
    id: string
    title: string
    memo: string
    options: string
    created_at: string
  }>()

  if (!event) {
    return c.notFound()
  }

  const options = JSON.parse(event.options) as string[]

  // Fetch attendees
  const attendees = await c.env.DB.prepare('SELECT * FROM attendees WHERE event_id = ?').bind(id).all<Attendee>()
  const attendeeList = attendees.results || []

  // Helper to format answer
  const formatAnswer = (val: number) => {
    if (val === 2) return '◯'
    if (val === 1) return '△'
    if (val === 0) return '×'
    return '-'
  }

  return c.render(
    <div className="container max-w-4xl mx-auto py-8 space-y-8">
       <div>
         <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
         {event.memo && <p className="text-gray-500">{event.memo}</p>}
       </div>

       <div className="bg-card border rounded-lg p-6">
         <h2 className="text-xl font-semibold mb-4">現在の参加状況</h2>
         <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[150px]">名前</TableHead>
                    {options.map((opt, i) => (
                        <TableHead key={i} className="text-center">{opt}</TableHead>
                    ))}
                    <TableHead>コメント</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {attendeeList.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={options.length + 2} className="text-center h-24 text-muted-foreground">
                            まだ回答がありません
                        </TableCell>
                    </TableRow>
                )}
                {attendeeList.map((attendee) => {
                    const answers = JSON.parse(attendee.answers) as Record<string, number>
                    return (
                        <TableRow key={attendee.id}>
                            <TableCell className="font-medium">{attendee.name}</TableCell>
                            {options.map((_, i) => (
                                <TableCell key={i} className="text-center">
                                    {formatAnswer(answers[String(i)])}
                                </TableCell>
                            ))}
                            <TableCell>{attendee.comment}</TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
         </Table>
       </div>

       <div className="max-w-xl mx-auto">
         <AnswerForm eventId={event.id} options={options} />
       </div>

       <div className="mt-8 text-center">
         <a href="/" className="text-blue-500 hover:underline">新しいイベントを作成</a>
       </div>
    </div>
  )
})
