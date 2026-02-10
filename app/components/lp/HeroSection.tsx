/** @jsxImportSource react */
import { Button } from "@/islands/ui/button"

export default function HeroSection() {
  return (
    <section className="py-20 text-center space-y-8">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary leading-tight">
        日程も、場所も、これひとつ。<br className="md:hidden" />
        次世代の調整ツール。
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        会員登録不要。30秒でイベント作成。<br className="md:hidden" />
        飲み会から会議、ゲーム募集まで。
      </p>
      <div className="pt-4">
        <Button asChild size="lg" className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer">
          <a href="#create-form">今すぐイベントを作る</a>
        </Button>
      </div>
    </section>
  )
}
