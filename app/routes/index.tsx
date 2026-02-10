import { createRoute } from 'honox/factory'
import EventCreateForm from '../islands/EventCreateForm'
import HeroSection from '../islands/lp/HeroSection'
import FeaturesSection from '../islands/lp/FeaturesSection'
import HowItWorksSection from '../islands/lp/HowItWorksSection'
import UseCasesSection from '../islands/lp/UseCasesSection'

export default createRoute((c) => {
  return c.render(
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-24 mb-24">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <UseCasesSection />
      </div>

      <div id="create-form" className="pt-16 border-t scroll-mt-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">さあ、イベントを作ろう</h2>
          <p className="text-muted-foreground mt-4">タイトルと日程を入れるだけ。30秒で完了します。</p>
        </div>
        <EventCreateForm />
      </div>
    </div>
  )
})

export const POST = createRoute(async (c) => {
  const body = await c.req.json<{
    title: string
    memo: string
    options: string[]
    poll_config?: {
      enabled: boolean
      title: string
      description?: string
      type: 'single' | 'multiple'
      options: string[]
    }
  }>()

  if (!body.title) {
    return c.json({ error: 'Title is required' }, 400)
  }

  const id = crypto.randomUUID()
  const now = new Date().toISOString()

  let pollConfigStr = null
  if (body.poll_config && body.poll_config.enabled) {
    pollConfigStr = JSON.stringify(body.poll_config)
  }

  // D1 Insert
  try {
    await c.env.DB.prepare(
      'INSERT INTO events (id, title, memo, options, poll_config, created_at) VALUES (?, ?, ?, ?, ?, ?)'
    )
      .bind(id, body.title, body.memo || '', JSON.stringify(body.options), pollConfigStr, now)
      .run()

    return c.json({ id })
  } catch (e) {
    console.error(e)
    return c.json({ error: 'Database error' }, 500)
  }
})
