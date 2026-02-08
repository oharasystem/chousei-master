import { createRoute } from 'honox/factory'
import EventInteraction from '../../islands/EventInteraction'
import AdSpace from '../../components/AdSpace'

type Attendee = {
  id: number
  name: string
  answers: string // JSON string
  poll_answers: string | null // NEW
  comment: string
}

export default createRoute(async (c) => {
  const id = c.req.param('id')
  const event = await c.env.DB.prepare('SELECT * FROM events WHERE id = ?').bind(id).first<{
    id: string
    title: string
    memo: string
    options: string
    poll_config: string | null
    created_at: string
  }>()

  if (!event) {
    return c.notFound()
  }

  const options = JSON.parse(event.options) as string[]
  const pollConfig = event.poll_config ? JSON.parse(event.poll_config) : null

  // Fetch attendees
  const attendees = await c.env.DB.prepare('SELECT * FROM attendees WHERE event_id = ?').bind(id).all<Attendee>()
  const attendeeList = attendees.results || []

  return c.render(
    <div className="container max-w-4xl mx-auto py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
        {event.memo && <p className="text-gray-500">{event.memo}</p>}
      </div>

      <EventInteraction eventId={event.id} options={options} attendees={attendeeList} pollConfig={pollConfig} />

      <div className="mt-8 text-center">
        <a href="/" className="text-blue-500 hover:underline">新しいイベントを作成</a>
      </div>

      <AdSpace />
    </div>,
    { title: event.title }
  )
})
