/** @jsxImportSource react */
import { ArrowRight, CalendarDays, Share2, UserCheck } from "lucide-react"

export default function HowItWorksSection() {
  const steps = [
    {
      title: "イベント作成",
      description: "日程候補とアンケートを入力。",
      icon: CalendarDays,
    },
    {
      title: "URLを共有",
      description: "発行されたURLをLINEやDiscordで送る。",
      icon: Share2,
    },
    {
      title: "みんなで回答",
      description: "登録不要でサクサク回答。集計も自動。",
      icon: UserCheck,
    },
  ]

  return (
    <section className="py-16 bg-secondary/30 rounded-3xl my-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight">かんたん3ステップ</h2>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 px-4">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col md:flex-row items-center w-full md:w-auto">
            <div className="flex flex-col items-center text-center max-w-xs relative z-10">
              <div className="bg-background p-6 rounded-full shadow-sm mb-4 border border-border">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.description}</p>
            </div>

            {index < steps.length - 1 && (
              <div className="hidden md:flex items-center justify-center px-4 text-muted-foreground/50">
                <ArrowRight className="w-8 h-8" />
              </div>
            )}
             {/* Mobile arrow */}
            {index < steps.length - 1 && (
               <div className="md:hidden py-4 text-muted-foreground/50 rotate-90">
                 <ArrowRight className="w-6 h-6" />
               </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
