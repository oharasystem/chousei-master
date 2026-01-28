import { createRoute } from 'honox/factory'

export const POST = createRoute(async (c) => {
  let ids: string[] = []
  try {
    const body = await c.req.json<{ ids: string[] }>()
    ids = body.ids
  } catch (e) {
    return c.json({ error: 'Invalid JSON' }, 400)
  }

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return c.json({ events: [] })
  }

  // Limit to 50 IDs to prevent abuse
  const targetIds = ids.slice(0, 50)

  const placeholders = targetIds.map(() => '?').join(',')
  const query = `SELECT id, title, memo, created_at FROM events WHERE id IN (${placeholders}) ORDER BY created_at DESC`

  try {
    const results = await c.env.DB.prepare(query).bind(...targetIds).all()
    return c.json({ events: results.results })
  } catch (e) {
    console.error(e)
    return c.json({ error: 'Database error' }, 500)
  }
})
