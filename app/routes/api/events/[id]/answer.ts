import { createRoute } from 'honox/factory'

export const GET = createRoute(async (c) => {
  const eventId = c.req.param('id')
  const token = c.req.query('token')

  if (!token) {
    return c.json({ error: 'Token is required' }, 400)
  }

  const attendee = await c.env.DB.prepare(
    'SELECT * FROM attendees WHERE event_id = ? AND token = ?'
  )
    .bind(eventId, token)
    .first<{
      id: number
      event_id: string
      token: string
      name: string
      answers: string
      comment: string
    }>()

  if (!attendee) {
    return c.json({ error: 'Attendee not found' }, 404)
  }

  return c.json({
    id: attendee.id,
    name: attendee.name,
    answers: JSON.parse(attendee.answers),
    comment: attendee.comment,
  })
})

export const POST = createRoute(async (c) => {
  const eventId = c.req.param('id')
  const body = await c.req.json<{
    token?: string
    name: string
    answers: Record<string, number>
    comment: string
  }>()

  if (!body.name) {
    return c.json({ error: 'Name is required' }, 400)
  }

  const answersStr = JSON.stringify(body.answers)

  if (body.token) {
    // Update existing
    const existing = await c.env.DB.prepare(
      'SELECT id FROM attendees WHERE event_id = ? AND token = ?'
    )
      .bind(eventId, body.token)
      .first()

    if (existing) {
      await c.env.DB.prepare(
        'UPDATE attendees SET name = ?, answers = ?, comment = ? WHERE event_id = ? AND token = ?'
      )
        .bind(body.name, answersStr, body.comment || '', eventId, body.token)
        .run()

      return c.json({ token: body.token })
    }
    return c.json({ error: 'Invalid token' }, 400)
  }

  // Create new
  const newToken = crypto.randomUUID()
  await c.env.DB.prepare(
    'INSERT INTO attendees (event_id, token, name, answers, comment) VALUES (?, ?, ?, ?, ?)'
  )
    .bind(eventId, newToken, body.name, answersStr, body.comment || '')
    .run()

  return c.json({ token: newToken })
})
