import { createRoute } from 'honox/factory'

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

  return c.render(
    <div className="container max-w-2xl mx-auto py-8">
       <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
       {event.memo && <p className="text-gray-500 mb-6">{event.memo}</p>}

       <div className="bg-card border rounded-lg p-6">
         <h2 className="text-xl font-semibold mb-4">候補リスト</h2>
         <ul className="space-y-2">
            {options.map((opt, i) => (
                <li key={i} className="p-3 bg-muted rounded-md border">{opt}</li>
            ))}
         </ul>
       </div>
       <div className="mt-4">
         <a href="/" className="text-blue-500 hover:underline">新しいイベントを作成</a>
       </div>
    </div>
  )
})
