import { reactRenderer } from '@hono/react-renderer'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import ToastProvider from '../islands/ToastProvider'

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
        {/* Avoid honox/server components temporarily for debugging */}
        <link href="/app/style.css" rel="stylesheet" />
        <script src="/app/client.ts" async />
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
