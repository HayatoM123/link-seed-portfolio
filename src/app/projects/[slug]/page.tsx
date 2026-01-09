// src/app/projects/[slug]/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { projects } from "@/content/projects";

const CATEGORY_LABEL: Record<(typeof projects)[number]["category"], string> = {
  Automation: "業務自動化",
  Workflow: "業務フロー",
  CAD: "機械・図面",
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

/**
 * ✅ Next.js 16/Turbopack 対応
 * params が Promise として渡ってくる場合があるため await してから使う
 */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params; // ← unwrap（箱を開ける）
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.title} | 実績`,
    description: p.summary,
  };
}

/**
 * ✅ Next.js 16/Turbopack 対応
 * async にして params を await してから参照する
 */
export default async function ProjectDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params; // ← unwrap
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <Container className="space-y-10">
      <header className="space-y-3">
        <div className="text-sm text-zinc-500">{CATEGORY_LABEL[p.category]}</div>
        <h1 className="text-2xl font-semibold">{p.title}</h1>
        <p className="max-w-2xl text-zinc-700 leading-7">{p.detail.overview}</p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <InfoCard title="役割" value={p.detail.role} />
          <InfoCard title="期間" value={p.detail.period} />
          <InfoCard title="技術" value={p.stack.join(" / ")} />
          <InfoCard title="成果（抜粋）" value={p.results[0] ?? ""} />
        </div>
      </header>

      <section className="rounded-2xl border border-zinc-200 p-6 space-y-2">
        <div className="text-sm font-medium">課題</div>
        <p className="text-sm text-zinc-700 leading-7">{p.problem}</p>
      </section>

      <section className="rounded-2xl border border-zinc-200 p-6 space-y-2">
        <div className="text-sm font-medium">アプローチ</div>
        <ul className="list-disc pl-5 text-sm text-zinc-700 space-y-1">
          {p.approach.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-zinc-200 p-6 space-y-2">
        <div className="text-sm font-medium">対象範囲</div>
        <ul className="list-disc pl-5 text-sm text-zinc-700 space-y-1">
          {p.detail.scope.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-zinc-200 p-6 space-y-2">
        <div className="text-sm font-medium">納品物</div>
        <ul className="list-disc pl-5 text-sm text-zinc-700 space-y-1">
          {p.detail.deliverables.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </section>

      {p.detail.constraints?.length ? (
        <section className="rounded-2xl border border-zinc-200 p-6 space-y-2">
          <div className="text-sm font-medium">制約・前提</div>
          <ul className="list-disc pl-5 text-sm text-zinc-700 space-y-1">
            {p.detail.constraints.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="space-y-3">
        <div className="text-sm font-medium">実装ポイント</div>
        <div className="space-y-4">
          {p.detail.implementationPoints.map((pt) => (
            <div key={pt.title} className="rounded-2xl border border-zinc-200 p-6">
              <div className="font-medium">{pt.title}</div>
              <ul className="mt-2 list-disc pl-5 text-sm text-zinc-700 space-y-1">
                {pt.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 p-6 space-y-2">
        <div className="text-sm font-medium">成果</div>
        <ul className="list-disc pl-5 text-sm text-zinc-700 space-y-1">
          {p.results.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 p-6 space-y-2">
          <div className="text-sm font-medium">学び</div>
          <ul className="list-disc pl-5 text-sm text-zinc-700 space-y-1">
            {p.detail.learnings.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-zinc-200 p-6 space-y-2">
          <div className="text-sm font-medium">次の改善</div>
          <ul className="list-disc pl-5 text-sm text-zinc-700 space-y-1">
            {p.detail.nextSteps.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 p-6">
        <div className="font-medium">同じ状況なら、こう進めます</div>
        <p className="mt-2 text-sm text-zinc-700 leading-7">
          現状（手順/頻度/例外）と目的を共有いただければ、優先順位→試作→運用の順で最短ルートを提案します。
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm text-white hover:bg-zinc-800"
          >
            お問い合わせ
          </Link>
          <Link
            href="/projects"
            className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm hover:bg-zinc-50"
          >
            実績一覧へ戻る
          </Link>
        </div>
      </section>
    </Container>
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
