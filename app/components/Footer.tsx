export const Footer = () => {
  return (
    <footer className="border-t py-8 bg-slate-50 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-slate-500">
          © {new Date().getFullYear()} 調整マスター
        </div>
        <div className="flex gap-6 text-sm">
          <a href="/privacy" className="text-slate-600 hover:text-slate-900">プライバシーポリシー</a>
          <a href="#" className="text-slate-600 hover:text-slate-900">利用規約</a>
          <a href="#" className="text-slate-600 hover:text-slate-900">X (Twitter)</a>
        </div>
      </div>
    </footer>
  )
}
