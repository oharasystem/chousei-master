export const Footer = () => {
  return (
    <footer className="border-t py-8 bg-gray-100 mt-auto">
      <div className="container mx-auto px-4 flex flex-col items-center gap-6">
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-600">
          <a href="/" className="hover:text-slate-900">ホーム</a>
          <a href="/history" className="hover:text-slate-900">履歴</a>
          <a href="/terms" className="hover:text-slate-900">利用規約</a>
          <a href="/privacy" className="hover:text-slate-900">プライバシーポリシー</a>
        </nav>
        <div className="text-xs text-slate-500">
          © 2026 Chousei Master / solooo.dev
        </div>
      </div>
    </footer>
  )
}
