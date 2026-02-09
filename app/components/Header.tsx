import { Button } from '@/islands/ui/button'

export const Header = () => {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="text-xl font-bold text-slate-900">
          調整マスター
        </a>
        <nav className="flex items-center gap-4">
          <a href="/history" className="text-sm text-slate-600 hover:text-slate-900">
            履歴を見る
          </a>
          <Button asChild>
            <a href="/">イベントを作る</a>
          </Button>
        </nav>
      </div>
    </header>
  )
}
