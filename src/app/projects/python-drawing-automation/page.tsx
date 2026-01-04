import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Tag } from "@/components/Tag";

export const metadata: Metadata = {
  title: "図面作成の業務自動化（Python） | 実績",
  description:
    "地点情報の取得→整形→Excel出力→VectorWorks配置までを繋げ、転記作業を削減。列・書式の固定で後工程を安定化。",
};

export default function Page() {
  const stack = ["Python", "Excel", "VectorWorks"];
  const results = ["地点情報取得〜配置まで：8h/月短縮", "VectorWorks自動パネル配置：1h/月短縮"];

  return (
    <Container className="space-y-10">
      <Breadcrumb current="図面作成の業務自動化（Python）" />

      <header className="space-y-4">
        <div className="text-sm text-zinc-500">機械・図面</div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          図面作成の業務自動化（Python）
        </h1>
        <p className="max-w-3xl text-zinc-700 leading-7">
          地点情報を複数ソースから取得して整形し、Excelテンプレへ出力。さらにCAD（VectorWorks）側の定型配置まで自動化して、
          “転記”と“定型配置”にかかる負担を減らしました。
          <br />
          <span className="text-zinc-500 text-sm">
            ※守秘のため、取得元の詳細や図面仕様は抽象化しています。
          </span>
        </p>

        <div className="flex flex-wrap gap-2">
          {stack.map((t) => (
            <Tag key={t} text={t} />
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <InfoCard title="役割" value="業務整理 / 実装 / 検証" />
          <InfoCard title="期間" value="数週間（初期版→改善）" />
          <InfoCard title="対象" value="情報収集 / 整形 / CAD配置" />
          <InfoCard title="狙い" value="転記削減 / 品質安定化" />
        </div>
      </header>

      <Section title="課題">
        <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700">
          <li>情報収集と転記が手作業で時間がかかり、ミスも入りやすい</li>
          <li>列・書式が毎回ぶれると、後工程（図面側）が不安定になる</li>
          <li>CAD配置は定型ルールがあるのに、人が同じ操作を繰り返している</li>
        </ul>
      </Section>

      <Section title="対応方針">
        <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700">
          <li>必要項目（データ定義）を先に固定して、取得元が変わっても出力を保つ</li>
          <li>整形ルール（表記ゆれ/空欄/型）を集約して、Excel出力を安定化</li>
          <li>CAD側は“ルール化できる範囲”を自動化し、判断が必要な部分だけ人が見る</li>
        </ul>
      </Section>

      <Section title="実装の工夫（ポイント）">
        <div className="space-y-4">
          <Card title="1) データ定義を先に固定（列・書式の統一）">
            <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700">
              <li>必要項目を表で定義し、出力テンプレの列順・書式を固定</li>
              <li>取得元の変更が起きても、後工程へ影響が出にくい構成</li>
            </ul>
          </Card>

          <Card title="2) 失敗しやすい箇所を先に潰す（整形・バリデーション）">
            <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700">
              <li>空欄・型違い・表記ゆれを正規化してから出力</li>
              <li>“どこが不足か”が分かるようにチェックを入れる</li>
            </ul>
          </Card>

          <Card title="3) CAD配置は“ルール”に落として自動化">
            <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700">
              <li>配置基準点・ピッチ・例外時の扱いを明文化し、定型は自動</li>
              <li>人が判断するケースだけ残して、作業全体を軽くする</li>
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
          <li>Pythonスクリプト一式（取得 / 整形 / 出力）</li>
          <li>Excelテンプレ（列・書式固定）</li>
          <li>CAD配置の前提ルール、実行手順（例外時の扱い含む）</li>
        </ul>
      </Section>

      <CTA />

      <RelatedLinks
        links={[
          { href: "/projects/rpa-vba-recurring-work", label: "帳票作成など繰り返し業務の自動化（RPA + VBA）" },
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
        「項目定義 → 出力形式の固定 → 例外整理 → 自動化」の順で、後工程が壊れない形に整えてから実装します。
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
