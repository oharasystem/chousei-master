import { createRoute } from 'honox/factory'

export default createRoute((c) => {
  return c.render(
    <div className="container max-w-3xl mx-auto py-12 px-4 space-y-8">
      <h1 className="text-3xl font-bold">利用規約</h1>

      <p className="leading-relaxed text-slate-700">
        この利用規約（以下，「本規約」といいます。）は，運営者（以下，「当方」といいます。）がこのウェブサイト上で提供する日程調整サービス「調整マスター」（以下，「本サービス」といいます。）の利用条件を定めるものです。ご利用されるユーザーの皆さま（以下，「ユーザー」といいます。）には，本規約に従って，本サービスをご利用いただきます。
      </p>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">第1条（適用）</h2>
        <p className="leading-relaxed text-slate-700">
          本規約は，ユーザーと当方との間の本サービスの利用に関わる一切の関係に適用されるものとします。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">第2条（サービスの性質とデータ保存）</h2>
        <ol className="list-decimal list-inside ml-4 text-slate-700 space-y-2">
          <li>本サービスは、会員登録不要で利用できる日程調整支援ツールです。</li>
          <li>本サービスは無料で提供されますが、当方は将来的にサービスの一部を有料化、または終了する権利を留保します。</li>
          <li>
            <strong>【重要】データの保存期間について</strong><br/>
            本サービスはデータの永続的な保存を保証するものではありません。作成されたイベントデータおよび回答データは、最終更新から一定期間（目安として90日〜180日程度）経過後、またはシステムの保守管理上必要と判断された場合に、予告なく自動的に削除されることがあります。
          </li>
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">第3条（禁止事項）</h2>
        <p className="leading-relaxed text-slate-700">ユーザーは，本サービスの利用にあたり，以下の行為をしてはなりません。</p>
        <ol className="list-decimal list-inside ml-4 text-slate-700 space-y-1">
          <li>法令または公序良俗に反する行為</li>
          <li>犯罪行為に関連する行為</li>
          <li>当方のサーバーまたはネットワークの機能を破壊したり，妨害したりする行為（DDoS攻撃やスクレイピングによる過度な負荷など）</li>
          <li>本サービスの運営を妨害するおそれのある行為</li>
          <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
          <li>アダルト、出会い系、マルチ商法、宗教勧誘などを目的としたイベント作成</li>
          <li>その他，当方が不適切と判断する行為</li>
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">第4条（利用制限およびデータ削除）</h2>
        <p className="leading-relaxed text-slate-700">
          当方は，ユーザーが以下のいずれかに該当する場合には，事前の通知なく，ユーザーに対して本サービスの全部もしくは一部の利用を制限し，またはユーザーが作成・入力したデータを削除することができるものとします。
        </p>
        <ol className="list-decimal list-inside ml-4 text-slate-700 space-y-1">
          <li>本規約のいずれかの条項に違反した場合</li>
          <li>その他，当方が本サービスの利用を適当でないと判断した場合</li>
        </ol>
        <p className="leading-relaxed text-slate-700">
          当方は，本条に基づき当方が行った行為によりユーザーに生じた損害について，一切の責任を負いません。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">第5条（免責事項）</h2>
        <ol className="list-decimal list-inside ml-4 text-slate-700 space-y-2">
          <li>当方は，本サービスに事実上または法律上の瑕疵（安全性，信頼性，正確性，完全性，有効性，特定の目的への適合性，セキュリティなどに関する欠陥，エラーやバグ，権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。</li>
          <li><strong>当方は，本サービスに起因してユーザーに生じたあらゆる損害について一切の責任を負いません。</strong></li>
          <li>本サービス内で入力されたデータ（イベント名、氏名、コメント等）の消失・漏洩・改ざん等により生じた損害について、当方は責任を負いません。重要なデータはユーザー自身の責任において管理してください。</li>
          <li>当方は，本サービスに関して，ユーザーと他のユーザーまたは第三者との間において生じた取引，連絡または紛争等について一切責任を負いません。</li>
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">第6条（広告の表示）</h2>
        <p className="leading-relaxed text-slate-700">
          ユーザーは、本サービス上に当方または第三者の広告（Google AdSense、アフィリエイトリンク等を含む）が表示されることを承諾するものとします。広告先のサービスや商品に関するトラブルについて、当方は一切の責任を負いません。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">第7条（サービス内容の変更等）</h2>
        <p className="leading-relaxed text-slate-700">
          当方は，ユーザーに通知することなく，本サービスの内容を変更し，または本サービスの提供を中止することができるものとし，これによってユーザーに生じた損害について一切の責任を負いません。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">第8条（利用規約の変更）</h2>
        <p className="leading-relaxed text-slate-700">
          当方は，必要と判断した場合には，ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお，本規約の変更後，本サービスの利用を開始した場合には，当該ユーザーは変更後の規約に同意したものとみなします。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">第9条（個人情報の取扱い）</h2>
        <p className="leading-relaxed text-slate-700">
          当方の個人情報の取扱いについては、別途定める「プライバシーポリシー」に従うものとします。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">第10条（準拠法・裁判管轄）</h2>
        <ol className="list-decimal list-inside ml-4 text-slate-700 space-y-1">
          <li>本規約の解釈にあたっては，日本法を準拠法とします。</li>
          <li>本サービスに関して紛争が生じた場合には，東京地方裁判所を第一審の専属的合意管轄裁判所とします。</li>
        </ol>
      </section>

      <div className="pt-8 text-sm text-slate-500">
        <p>制定日：2026年2月1日</p>
      </div>
    </div>,
    { title: '利用規約' }
  )
})
