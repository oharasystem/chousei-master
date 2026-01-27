import { createRoute } from 'honox/factory'
import EventCreateForm from '../islands/EventCreateForm'

export default createRoute((c) => {
  return c.render(
    <div className="container py-8">
      <EventCreateForm />
    </div>
  )
})

export const POST = createRoute(async (c) => {
  const body = await c.req.json<{ title: string; memo: string; options: string[] }>()

  if (!body.title) {
    return c.json({ error: 'Title is required' }, 400)
  }

  const id = crypto.randomUUID()
  const now = new Date().toISOString()

  // D1 Insert
  try {
    await c.env.DB.prepare(
      'INSERT INTO events (id, title, memo, options, created_at) VALUES (?, ?, ?, ?, ?)'
    )
    .bind(id, body.title, body.memo || '', JSON.stringify(body.options), now)
    .run()

    return c.json({ id })
  } catch (e) {
    console.error(e)
    return c.json({ error: 'Database error' }, 500)
  }
})
