import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Tag } from "@/components/Tag";

export const metadata: Metadata = {
  title: "情報収集と提出の自動化（VBA / Power Automate） | 実績",
  description:
    "提出・記録・依頼・リマインドをフロー化し、自動化。漏れ・催促の心理負担を減らし、日次/月次の作業を軽くする。",
};

export default function Page() {
  const stack = ["VBA", "Power Automate", "Excel"];
  const results = [
    "案内図作成：30分/日短縮",
    "承認提出＋管理表記入：30分/日短縮",
    "資料収集：2h/月短縮",
  ];

  return (
    <Container className="space-y-10">
      <Breadcrumb current="情報収集と提出の自動化（VBA / Power Automate）" />

      <header className="space-y-4">
        <div className="text-sm text-zinc-500">業務フロー</div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          情報収集と提出の自動化（VBA / Power Automate）
        </h1>
        <p className="max-w-3xl text-zinc-700 leading-7">
          「提出する」「依頼する」「記録する」「リマインドする」は、手作業だと漏れやすく心理コストも高い領域です。
          ここをフロー化し、VBAとPower Automateで自動化して、日次・月次の負担を減らしました。
          <br />
          <span className="text-zinc-500 text-sm">
            ※守秘のため、提出物や帳票名などは抽象化しています。
          </span>
        </p>

        <div className="flex flex-wrap gap-2">
          {stack.map((t) => (
            <Tag key={t} text={t} />
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <InfoCard title="役割" value="業務整理 / 実装 / 運用ルール整備" />
          <InfoCard title="期間" value="数週間（導入→改善）" />
          <InfoCard title="対象" value="提出 / 記録 / 依頼 / 収集" />
          <InfoCard title="狙い" value="漏れ防止 / 工数削減" />
        </div>
      </header>

      <Section title="課題">
        <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700">
          <li>手作業の提出・記録・依頼が多く、抜け漏れが起きやすい</li>
          <li>催促や確認に時間と心理コストがかかる</li>
          <li>担当者依存になりやすく、引継ぎで品質が揺れる</li>
        </ul>
      </Section>

      <Section title="対応方針">
        <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700">
          <li>提出と記録を“ワンセット化”し、片方だけ忘れない仕組みにする</li>
          <li>依頼〜回収〜リマインドまでをフローにして、自走する運用に寄せる</li>
          <li>失敗時の対応（どこを見る/何を直す/どう再実行）を先に決める</li>
        </ul>
      </Section>

      <Section title="実装の工夫（ポイント）">
        <div className="space-y-4">
          <Card title="1) “記憶”に頼らない導線設計">
            <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700">
              <li>提出→記録→通知の順番を固定し、作業の抜けを減らす</li>
              <li>チェック欄・ステータスで「どこまで終わったか」を見える化</li>
            </ul>
          </Card>

          <Card title="2) 自動リマインドで回収を安定化">
            <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700">
              <li>期限や条件に応じて自動リマインド</li>
              <li>催促の心理負担を下げ、回収率を上げる</li>
            </ul>
          </Card>

          <Card title="3) 例外時の手順をセットで納品">
            <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700">
              <li>失敗時の確認箇所、再実行手順、手動対応が必要な条件を明文化</li>
              <li>担当者が変わっても運用できる形にする</li>
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
          <li>Excel/VBA（テンプレ生成・取り込み・チェック）</li>
          <li>Power Automate フロー（提出・記録・依頼・通知）</li>
          <li>運用手順（例外対応、担当引継ぎ）</li>
        </ul>
      </Section>

      <CTA />

      <RelatedLinks
        links={[
          { href: "/projects/rpa-vba-recurring-work", label: "帳票作成など繰り返し業務の自動化（RPA + VBA）" },
          { href: "/projects/python-drawing-automation", label: "図面作成の業務自動化（Python）" },
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
        “作業の抜け”が起きる箇所を先に特定し、フロー化（提出・記録・通知）してから実装します。
        運用ルールまで含めることで、仕組みが回り続ける状態を作ります。
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
