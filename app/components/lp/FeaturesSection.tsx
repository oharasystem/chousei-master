import { Zap, Vote, ShieldCheck } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"

export default function FeaturesSection() {
  const features = [
    {
      title: "ログイン不要・完全無料",
      description: "面倒な登録は一切なし。PCでもスマホでも、URLを送るだけですぐに使えます。",
      icon: Zap,
    },
    {
      title: "日程 ＋ アンケート",
      description: "「いつやる？」と「どこでやる？」を同時に集計。お店選びやゲームのタイトル決めもこれひとつで完結。",
      icon: Vote,
    },
    {
      title: "安心の管理者機能",
      description: "匿名投票や結果の非公開設定が可能。パスワード保護で回答の改ざんも防げます。",
      icon: ShieldCheck,
    },
  ]

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight">調整マスターが選ばれる3つの理由</h2>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {features.map((feature, index) => (
          <Card key={index} className="bg-card/50 border-primary/10 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              {feature.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
