import { createRoute } from 'honox/factory'

export default createRoute((c) => {
  return c.render(
    <div className="container max-w-3xl mx-auto py-12 px-4 space-y-8">
      <h1 className="text-3xl font-bold">プライバシーポリシー</h1>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">1. 収集する情報</h2>
        <p className="leading-relaxed text-slate-700">
          当サービス「調整マスター」では、サービスの提供にあたり、以下の情報を収集・利用します。
        </p>
        <ul className="list-disc list-inside ml-4 text-slate-700 space-y-1">
            <li>イベント作成時および回答時に入力されたお名前</li>
            <li>日程調整に関する回答データ</li>
            <li>IPアドレス、アクセスログ、Cookieなどの利用状況データ</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">2. 情報の利用目的</h2>
        <p className="leading-relaxed text-slate-700">
          収集した情報は、以下の目的で利用します。
        </p>
        <ul className="list-disc list-inside ml-4 text-slate-700 space-y-1">
            <li>日程調整サービスの提供・維持・改善のため</li>
            <li>不正アクセスの防止およびセキュリティ対策のため</li>
            <li>利用状況の分析および広告配信のため</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">3. 広告について</h2>
        <p className="leading-relaxed text-slate-700">
          当サイトでは、第三者配信の広告サービス（Google AdSenseなど）を利用しています。
          このような広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、当サイトや他サイトへのアクセスに関する情報（氏名、住所、メール アドレス、電話番号は含まれません）を使用することがあります。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">4. アクセス解析ツールについて</h2>
        <p className="leading-relaxed text-slate-700">
          当サイトでは、Googleによるアクセス解析ツール「Google Analytics」を利用しています。
          このGoogle Analyticsはトラフィックデータの収集のためにCookieを使用しています。
          このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
          この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">5. 免責事項</h2>
        <p className="leading-relaxed text-slate-700">
          当サイトからのリンクやバナーなどで移動したサイトで提供される情報、サービス等について一切の責任を負いません。
          また、当サイトのコンテンツ・情報について、できる限り正確な情報を掲載するよう努めておりますが、正確性や安全性を保証するものではありません。
        </p>
      </section>

      <div className="pt-8 text-sm text-slate-500">
        <p>制定日: 2025年2月23日</p>
      </div>
    </div>,
    { title: 'プライバシーポリシー' }
  )
})
