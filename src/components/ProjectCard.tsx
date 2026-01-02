import { Project } from "@/content/projects";

export function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="rounded-2xl border border-zinc-200 p-6">
      <div className="text-sm text-zinc-500">{p.category}</div>
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
            {p.results.map((r) => <li key={r}>{r}</li>)}
          </ul>
        </div>
      </div>

      <div className="mt-5">
        <div className="text-sm font-medium">アプローチ</div>
        <ul className="mt-1 list-disc pl-5 text-sm text-zinc-600 space-y-1">
          {p.approach.map((a) => <li key={a}>{a}</li>)}
        </ul>
      </div>

      <div className="mt-5 text-sm text-zinc-600">
        <span className="font-medium text-zinc-800">技術：</span>
        {p.stack.join(" / ")}
      </div>
    </article>
  );
}