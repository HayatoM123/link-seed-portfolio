// src/app/page.tsx

import Link from "next/link";
import { Container } from "@/components/Container";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { services } from "@/content/services";

const CATEGORY_LABEL: Record<(typeof projects)[number]["category"], string> = {
  Automation: "業務自動化",
  Workflow: "業務フロー",
  CAD: "機械・図面",
};

export default function HomePage() {
  const featured = projects.slice(0, 3);
  const highlights = [
    projects[0]?.results?.[0],
    projects[0]?.results?.[1],
    projects[2]?.results?.[0],
  ].filter(Boolean) as string[];

  return (
    <Container className="space-y-14">
      {/* Hero */}
      <section className="space-y-6">
        <p className="text-sm text-zinc-600">
          {site.nameJa} / {site.brand}
        </p>

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
          <Link
            href="/contact"
            className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm text-white hover:bg-zinc-800"
          >
            まず相談する
          </Link>
          <Link
            href="/projects"
            className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm hover:bg-zinc-50"
          >
            実績を見る
          </Link>
        </div>

        <div className="text-sm text-zinc-600">
          対応：{site.location} / {site.pricing}
        </div>
      </section>

      {/* Proof */}
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 p-6">
          <div className="text-sm font-medium">削減の例</div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-700">
            {highlights.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <div className="mt-3 text-xs text-zinc-500">
            ※効果は課題・運用条件により変わります。まずは現状を共有ください。
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 p-6">
          <div className="text-sm font-medium">品質</div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-700">
            <li>例外条件・入力揺れを前提に設計</li>
            <li>チェック・判定ロジック・ログまで実装</li>
            <li>再現性のある手順に落とし込み</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-zinc-200 p-6">
          <div className="text-sm font-medium">引き継ぎ</div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-700">
            <li>運用手順（例外時の対応）を整備</li>
            <li>属人化を減らす構成・命名</li>
            <li>改善前提で拡張しやすく</li>
          </ul>
        </div>
      </section>

      {/* Services */}
      <section className="space-y-6">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-xl font-semibold">できること</h2>
          <Link
            href="/services"
            className="text-sm text-zinc-700 underline underline-offset-4 hover:text-zinc-900"
          >
            詳細を見る →
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="rounded-2xl border border-zinc-200 p-6">
              <div className="font-medium">{s.title}</div>
              <p className="mt-2 text-sm text-zinc-700 leading-6">{s.summary}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-600">
                {s.bullets.slice(0, 3).map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Focus areas */}
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

      {/* Featured Projects */}
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
              // 詳細ページを作る想定ならこちらがおすすめ
              href={`/projects/${p.slug}`}
              // まだ詳細ページが無い場合は次行に戻してください:
              // href="/projects"
              className="rounded-2xl border border-zinc-200 p-5 hover:bg-zinc-50"
            >
              <div className="text-sm text-zinc-500">{CATEGORY_LABEL[p.category]}</div>
              <div className="mt-1 font-medium">{p.title}</div>
              <div className="mt-2 text-sm text-zinc-600">{p.summary}</div>
              <div className="mt-3 text-sm text-zinc-700 underline underline-offset-4">
                詳細を見る →
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Container>
  );
}
