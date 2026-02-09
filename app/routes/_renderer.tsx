import { reactRenderer } from '@hono/react-renderer'
import { Link, Script } from 'honox/server'
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
        <link rel="icon" href="/favicon.ico" />
        <Link href="/app/style.css" rel="stylesheet" />
        <Script src="/app/client.ts" async />
      </head>
      <body>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        {/* <ToastProvider /> */}
      </body>
    </html>
  )
})
