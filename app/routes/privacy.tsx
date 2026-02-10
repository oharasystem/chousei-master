/** @jsxImportSource react */
import { createRoute } from 'honox/factory'

export default createRoute((c) => {
  return c.render(
    <div className="container max-w-3xl mx-auto py-12 px-4 space-y-8">
      <h1 className="text-3xl font-bold">プライバシーポリシー</h1>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">1. 収集する情報</h2>
        <p className="leading-relaxed text-slate-700">
          当サービス「調整マスター」（以下、「本サービス」といいます。）では、サービスの提供にあたり、以下の情報を収集・利用します。
        </p>
        <ul className="list-disc list-inside ml-4 text-slate-700 space-y-1">
          <li>イベント作成時および回答時に入力されたお名前（ニックネーム可）</li>
          <li>日程調整に関する回答データ、コメント、投票内容</li>
          <li>IPアドレス、アクセスログ、Cookie、LocalStorageなどの利用状況データ</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">2. 情報の利用目的</h2>
        <p className="leading-relaxed text-slate-700">
          収集した情報は、以下の目的で利用します。
        </p>
        <ul className="list-disc list-inside ml-4 text-slate-700 space-y-1">
          <li>日程調整サービスの提供・維持・改善のため</li>
          <li>再編集機能（本人確認）の提供のため</li>
          <li>不正アクセスの防止およびセキュリティ対策のため</li>
          <li>利用状況の分析および広告配信のため</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">3. データの保存期間について</h2>
        <p className="leading-relaxed text-slate-700">
          本サービスは、サーバーリソースの適正化およびプライバシー保護の観点から、最終更新から一定期間（目安として90日〜180日程度）が経過したイベントおよび回答データをシステムから自動的に削除する場合があります。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">4. 広告について</h2>
        <p className="leading-relaxed text-slate-700">
          当サイトでは、第三者配信の広告サービス（Google AdSenseなど）を利用しています。
          このような広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、当サイトや他サイトへのアクセスに関する情報「Cookie」（氏名、住所、メール アドレス、電話番号は含まれません）を使用することがあります。
          Google AdSenseに関して、このプロセスの詳細やこのような情報が広告配信事業者に使用されないようにする方法については、<a href="https://policies.google.com/technologies/ads?hl=ja" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Googleのポリシーと規約</a>をご覧ください。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">5. アクセス解析ツールについて</h2>
        <p className="leading-relaxed text-slate-700">
          当サイトでは、Googleによるアクセス解析ツール「Google Analytics」を利用しています。
          このGoogle Analyticsはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
          この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">6. 外部リンクに関する免責</h2>
        <p className="leading-relaxed text-slate-700">
          当サイトは、アフィリエイトプログラムや広告配信を通じて第三者のサイトへリンクしていますが、リンク先サイトにおける個人情報の保護や掲載内容に関しては、当サイトは一切の責任を負いません。リンク先のプライバシーポリシーをご確認ください。
          なお、本サービス自体の利用に関する免責事項については、別途定める「利用規約」に準拠します。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">7. お問い合わせ</h2>
        <p className="leading-relaxed text-slate-700">
          本ポリシーに関するお問い合わせは、以下の窓口までお願いいたします。
        </p>
        <p className="mt-2">
          {/* TODO: Replace with actual Google Form URL */}
          <a href="#" className="text-blue-600 hover:underline">
            お問い合わせフォームへのリンク
          </a>
        </p>
      </section>

      <div className="pt-8 text-sm text-slate-500">
        <p>制定日：2026年2月1日</p>
      </div>
    </div>,
    { title: 'プライバシーポリシー' }
  )
})
