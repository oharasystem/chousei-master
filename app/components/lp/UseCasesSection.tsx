/** @jsxImportSource react */
import { Badge } from "@/islands/ui/badge"

export default function UseCasesSection() {
  const cases = [
    "飲み会", "ランチ", "会議", "ゲーム募集", "旅行の計画", "同窓会", "サークル活動", "オンライン飲み会"
  ]

  return (
    <section className="py-12 text-center">
      <h3 className="text-xl font-semibold mb-6 text-muted-foreground">こんなシーンで使われています</h3>
      <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
        {cases.map((c, i) => (
          <Badge key={i} variant="secondary" className="text-sm px-4 py-1">
            {c}
          </Badge>
        ))}
      </div>
    </section>
  )
}
