import { reactRenderer } from '@hono/react-renderer'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import ToastProvider from '../islands/ToastProvider'

const Asset = ({ src, async = false }: { src: string; async?: boolean }) => {
  if (import.meta.env.PROD) {
    // Manually resolve manifest to avoid Hono JSX leaks (React Error #31)
    const MANIFEST = import.meta.glob('/dist/.vite/manifest.json', { eager: true })
    const manifest = (Object.values(MANIFEST)[0] as any)?.default
    if (manifest) {
      const entryPath = src.replace(/^\//, '')
      const entry = manifest[entryPath]
      if (entry) {
        if (src.endsWith('.css')) {
          return <link href={`/${entry.file}`} rel="stylesheet" />
        }
        return <script type="module" src={`/${entry.file}`} async={async} />
      }
    }
  }

  if (src.endsWith('.css')) {
    return <link href={src} rel="stylesheet" />
  }
  return <script type="module" src={src} async={async} />
}

export default reactRenderer(({ children, title }) => {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title ? `${title} - 調整マスター` : '調整マスター'}</title>
        <meta name="description" content="面倒な日程調整を、もっとシンプルに。ログイン不要で誰でもすぐに使える調整ツールです。" />
        <meta property="og:title" content={title ? `${title} - 調整マスター` : '調整マスター'} />
        <meta property="og:description" content="面倒な日程調整を、もっとシンプルに。ログイン不要で誰でもすぐに使える調整ツールです。" />
        <meta property="og:image" content="/ogp.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/ogp.png" />

        <link rel="icon" type="image/png" href="/favicon.png" />
        <Asset src="/app/style.css" />
        <Asset src="/app/client.ts" async />
      </head>
      <body>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <ToastProvider />
      </body>
    </html>
  )
})
