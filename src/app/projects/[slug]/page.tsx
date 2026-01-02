// Begin Patch
// Add File: src/app/projects/[slug]/page.tsx
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

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = projects.find((x) => x.slug === params.slug);
  if (!p) return {};
  return {
    title: `${p.title} | 実績`,
    description: p.summary,
  };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const p = projects.find((x) => x.slug === params.slug);
  if (!p) notFound();

  return (
    <Container className="space-y-10">
      <div className="space-y-2">
        <div className="text-sm text-zinc-500">{CATEGORY_LABEL[p.category]}</div>
        <h1 className="text-2xl font-semibold">{p.title}</h1>
        <p className="max-w-2xl text-zinc-700 leading-7">{p.summary}</p>
      </div>

      <section className="rounded-2xl border border-zinc-200 p-6 space-y-2">
        <div className="text-sm font-medium">課題</div>
        <p className="text-sm text-zinc-700 leading-7">{p.problem}</p>
      </section>

      <section className="rounded-2xl border border-zinc-200 p-6 space-y-2">
        <div className="text-sm font-medium">アプローチ</div>
        <ul className="list-disc pl-5 text-sm text-zinc-700 space-y-1">
          {p.approach.map((a) => <li key={a}>{a}</li>)}
        </ul>
      </section>

      <section className="rounded-2xl border border-zinc-200 p-6 space-y-2">
        <div className="text-sm font-medium">成果</div>
        <ul className="list-disc pl-5 text-sm text-zinc-700 space-y-1">
          {p.results.map((r) => <li key={r}>{r}</li>)}
        </ul>
      </section>

      <section className="rounded-2xl border border-zinc-200 p-6 space-y-2">
        <div className="text-sm font-medium">技術</div>
        <div className="text-sm text-zinc-700">{p.stack.join(" / ")}</div>
      </section>

      <section className="rounded-2xl border border-zinc-200 p-6">
        <div className="font-medium">同じ状況なら、こう進めます</div>
        <p className="mt-2 text-sm text-zinc-700 leading-7">
          現状（手順/頻度/例外）と目的を共有いただければ、優先順位→試作→運用の順で最短ルートを提案します。
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
    </Container>
  );
}

// End Patch
