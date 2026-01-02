// src/components/ProjectCard.tsx

import Link from "next/link";
import { Project } from "@/content/projects";

const CATEGORY_LABEL: Record<Project["category"], string> = {
  Automation: "業務自動化",
  Workflow: "業務フロー",
  CAD: "機械・図面",
};

export function ProjectCard({ p }: { p: Project }) {
  const categoryJa = CATEGORY_LABEL[p.category];

  return (
    <Link
      href={`/projects/${p.slug}`}
      // まだ詳細ページが無い場合は次行に戻してください:
      // href="/projects"
      aria-label={`実績詳細：${p.title}（カテゴリ：${categoryJa}）`}
      className={[
        "group block rounded-2xl border border-zinc-200 p-6 transition-colors",
        "hover:bg-zinc-50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2",
      ].join(" ")}
    >
      <article>
        <div className="text-sm text-zinc-500">{categoryJa}</div>
        <h3 className="mt-1 text-lg font-semibold">{p.title}</h3>
        <p className="mt-2 text-sm text-zinc-700">{p.summary}</p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <div className="text-sm font-medium">課題</div>
            <p className="mt-1 text-sm text-zinc-600 leading-6">{p.problem}</p>
          </div>
          <div>
            <div className="text-sm font-medium">成果</div>
            <ul className="mt-1 list-disc pl-5 text-sm text-zinc-600 space-y-1">
              {p.results.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-5">
          <div className="text-sm font-medium">アプローチ</div>
          <ul className="mt-1 list-disc pl-5 text-sm text-zinc-600 space-y-1">
            {p.approach.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>

        <div className="mt-5 text-sm text-zinc-600">
          <span className="font-medium text-zinc-800">技術：</span>
          {p.stack.join(" / ")}
        </div>

        <div className="mt-5 text-sm text-zinc-700 underline underline-offset-4 group-hover:text-zinc-900">
          詳細を見る <span aria-hidden="true">→</span>
        </div>
      </article>
    </Link>
  );
}
