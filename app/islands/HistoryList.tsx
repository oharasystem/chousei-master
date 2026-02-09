import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/islands/ui/card'

type EventSummary = {
  id: string
  title: string
  memo: string
  created_at: string
}

export default function HistoryList() {
  const [createdEvents, setCreatedEvents] = useState<EventSummary[]>([])
  const [answeredEvents, setAnsweredEvents] = useState<EventSummary[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      const createdIds = JSON.parse(localStorage.getItem('chousei_created_events') || '[]') as string[]
      const answeredIds = JSON.parse(localStorage.getItem('chousei_answered_events') || '[]') as string[]

      const uniqueIds = Array.from(new Set([...createdIds, ...answeredIds]))

      if (uniqueIds.length === 0) {
        setLoading(false)
        return
      }

      try {
        const res = await fetch('/api/events/batch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: uniqueIds })
        })

        if (res.ok) {
          const data = await res.json() as { events: EventSummary[] }
          const eventMap = new Map(data.events.map(e => [e.id, e]))

          const created = createdIds
            .map(id => eventMap.get(id))
            .filter((e): e is EventSummary => !!e)

          const answered = answeredIds
            .map(id => eventMap.get(id))
            .filter((e): e is EventSummary => !!e)

          setCreatedEvents(created)
          setAnsweredEvents(answered)
        }
      } catch (error) {
        console.error('Failed to fetch history', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
  }

  const EventList = ({ events }: { events: EventSummary[] }) => {
    if (events.length === 0) return <p className="text-gray-500">履歴はありません</p>
    return (
      <div className="space-y-4">
        {events.map(event => (
          <a key={event.id} href={`/events/${event.id}`} className="block">
            <Card className="hover:bg-slate-50 transition-colors">
              <CardHeader>
                <CardTitle className="text-lg">{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {event.memo && <p className="text-sm text-gray-500 truncate mb-2">{event.memo}</p>}
                <p className="text-xs text-gray-400">作成日: {new Date(event.created_at).toLocaleDateString()}</p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-bold mb-4">作成したイベント</h2>
        <EventList events={createdEvents} />
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">回答したイベント</h2>
        <EventList events={answeredEvents} />
      </section>
    </div>
  )
}
