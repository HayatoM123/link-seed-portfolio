import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Tag } from "@/components/Tag";

export const metadata: Metadata = {
  title: "帳票作成など繰り返し業務の自動化（RPA + VBA） | 実績",
  description:
    "RPA（UI操作）とVBA（集計・整形）の役割分担で、収集→転記→整形→帳票作成を仕組み化。月次工数と確認コストを削減。",
};

export default function Page() {
  const stack = ["RPA", "VBA", "Excel"];
  const results = [
    "出勤時入力情報の自動データ整理：5h/月短縮",
    "CADソフトの自動操作：3h/月短縮",
    "Webサイトからデータ自動DL：10h/月短縮",
    "帳票データの複数FMT自動入力：1h/月短縮",
  ];

  return (
    <Container className="space-y-10">
      <Breadcrumb current="帳票作成など繰り返し業務の自動化（RPA + VBA）" />

      <header className="space-y-4">
        <div className="text-sm text-zinc-500">業務自動化</div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          帳票作成など繰り返し業務の自動化（RPA + VBA）
        </h1>
        <p className="max-w-3xl text-zinc-700 leading-7">
          手作業で発生していた「収集→転記→整形→帳票作成」を、RPA（アプリ操作）とVBA（データ処理）で役割分担して自動化しました。
          <br />
          <span className="text-zinc-500 text-sm">
            ※守秘のため、具体的な社名・画面名・帳票名は抽象化しています。
          </span>
        </p>

        <div className="flex flex-wrap gap-2">
          {stack.map((t) => (
            <Tag key={t} text={t} />
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <InfoCard title="役割" value="要件整理 / 実装 / 運用設計（1人）" />
          <InfoCard title="期間" value="数週間〜（段階導入・改善）" />
          <InfoCard title="対象" value="定型作業（収集・転記・帳票）" />
          <InfoCard title="狙い" value="工数削減 / 抜け漏れ防止" />
        </div>
      </header>

      <Section title="課題">
        <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700">
          <li>繰り返し作業が多く、人の時間が拘束される</li>
          <li>入力の表記ゆれ・空欄・例外があり、転記ミスや確認コストが増える</li>
          <li>帳票フォーマットが複数あり、毎回の整形が手作業で属人化しやすい</li>
        </ul>
      </Section>

      <Section title="対応方針（設計の考え方）">
        <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700">
          <li>最初に「ゴール」「例外」「品質要件（何をミス扱いにするか）」を整理</li>
          <li>UI操作が必要な工程はRPA、データ処理はVBAに寄せて安定化</li>
          <li>“止まらない”より“復旧できる”を優先し、ログと再実行を前提に設計</li>
        </ul>
      </Section>

      <Section title="実装の工夫（ポイント）">
        <div className="space-y-4">
          <Card title="1) 再実行できる工程分割（復旧設計）">
            <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700">
              <li>工程を「収集」「整形」「転記」「出力」に分割し、途中停止でも再開しやすく</li>
              <li>ログに「工程名 / 対象 / 結果」を残し、原因特定を短縮</li>
            </ul>
          </Card>

          <Card title="2) 入力チェックと表記ゆれ吸収（品質担保）">
            <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700">
              <li>必須項目・型・桁・許容値チェックを実装</li>
              <li>全角/半角・余計な空白・表現違いを正規化して後工程を安定化</li>
            </ul>
          </Card>

          <Card title="3) ツールの役割分担（運用の安定性）">
            <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700">
              <li>RPA：アプリ間の定型操作（クリック・入力・DL）</li>
              <li>VBA：集計・変換・帳票転記（高速＆バージョン差分に強い）</li>
            </ul>
          </Card>
        </div>
      </Section>

      <Section title="成果">
        <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700">
          {results.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </Section>

      <Section title="納品物・運用">
        <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700">
          <li>RPAシナリオ一式（実行手順・前提条件）</li>
          <li>Excel/VBAツール（ログ出力・例外処理・チェック込み）</li>
          <li>運用手順（失敗時の見方 / 再実行手順 / 例外時の対応）</li>
        </ul>
      </Section>

      <CTA />

      <RelatedLinks
        links={[
          { href: "/projects/python-drawing-automation", label: "図面作成の業務自動化（Python）" },
          { href: "/projects/vba-powerautomate-approval", label: "情報収集と提出の自動化（VBA / Power Automate）" },
        ]}
      />
    </Container>
  );
}

function Breadcrumb({ current }: { current: string }) {
  return (
    <div className="text-sm text-zinc-500">
      <Link href="/projects" className="underline underline-offset-4 hover:text-zinc-800">
        実績
      </Link>
      <span className="mx-2">/</span>
      <span>{current}</span>
    </div>
  );
}

function Section({ title, children }: React.PropsWithChildren<{ title: string }>) {
  return (
    <section className="rounded-2xl border border-zinc-200 p-6 space-y-3">
      <h2 className="text-sm font-medium">{title}</h2>
      {children}
    </section>
  );
}

function Card({ title, children }: React.PropsWithChildren<{ title: string }>) {
  return (
    <div className="rounded-2xl border border-zinc-200 p-5">
      <div className="font-medium">{title}</div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200 p-4">
      <div className="text-xs text-zinc-500">{title}</div>
      <div className="mt-1 text-sm text-zinc-800">{value}</div>
    </div>
  );
}

function CTA() {
  return (
    <section className="rounded-2xl border border-zinc-200 p-6">
      <div className="font-medium">同じ状況なら、こう進めます</div>
      <p className="mt-2 text-sm text-zinc-700 leading-7">
        現状（手順/頻度/例外）と目的を共有いただければ、優先順位→試作→運用の順で最短ルートを提案します。
        「どこまで自動化するのが得か」から一緒に整理できます。
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link href="/contact" className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm text-white hover:bg-zinc-800">
          お問い合わせ
        </Link>
        <Link href="/projects" className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm hover:bg-zinc-50">
          実績一覧へ戻る
        </Link>
      </div>
    </section>
  );
}

function RelatedLinks({ links }: { links: { href: string; label: string }[] }) {
  return (
    <section className="rounded-2xl border border-zinc-200 p-6 space-y-3">
      <div className="text-sm font-medium">関連する実績</div>
      <ul className="list-disc pl-5 text-sm text-zinc-700 space-y-1">
        {links.map((l) => (
          <li key={l.href}>
            <Link className="underline underline-offset-4 hover:text-zinc-900" href={l.href}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
