import Link from "next/link";
import { Container } from "@/components/Container";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

export default function HomePage() {
  const featured = projects.slice(0, 2);

  return (
    <Container className="space-y-14">
      <section className="space-y-6">
        <p className="text-sm text-zinc-600">{site.nameJa} / {site.brand}</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
          繰り返し業務を標準化し、
          <span className="block bg-gradient-to-r from-zinc-900 to-zinc-500 bg-clip-text text-transparent">
            自動化で“使える時間”を増やす
          </span>
        </h1>
        <p className="max-w-2xl text-base leading-7 text-zinc-700">
          VBA / RPA / Power Automate / Python を適材適所で使い分け、運用しやすい形で自動化します。
          機械設計・Web制作も含め、要件整理から実装・引き継ぎまで対応します。
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm text-white hover:bg-zinc-800">
            まず相談する
          </Link>
          <Link href="/projects" className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm hover:bg-zinc-50">
            実績を見る
          </Link>
        </div>
        <div className="text-sm text-zinc-600">
          対応：{site.location} / {site.pricing}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">注力領域</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { t: "業務自動化", d: "現状ヒアリング→標準化→自動化→運用" },
            { t: "機械設計", d: "要件整理・構想・図面作成・改善提案" },
            { t: "Web制作", d: "シンプルで信頼感のあるサイトを実装" },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl border border-zinc-200 p-5">
              <div className="font-medium">{x.t}</div>
              <div className="mt-2 text-sm text-zinc-600">{x.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <h2 className="text-lg font-semibold">選抜プロジェクト</h2>
          <Link href="/projects" className="text-sm text-zinc-700 hover:text-zinc-900">
            すべて見る →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {featured.map((p) => (
            <Link
              key={p.slug}
              href="/projects"
              className="rounded-2xl border border-zinc-200 p-5 hover:bg-zinc-50"
            >
              <div className="text-sm text-zinc-500">{p.category}</div>
              <div className="mt-1 font-medium">{p.title}</div>
              <div className="mt-2 text-sm text-zinc-600">{p.summary}</div>
            </Link>
          ))}
        </div>
      </section>
    </Container>
  );
}