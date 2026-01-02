/// Begin Patch
/// Add File: src/components/ProjectsClient.tsx
"use client";

import { useMemo, useState } from "react";
import { projects, Project } from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";

type Filter = "all" | Project["category"];

const LABEL: Record<Project["category"], string> = {
  Automation: "業務自動化",
  Workflow: "業務フロー",
  CAD: "機械・図面",
};

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "すべて" },
  { key: "Automation", label: LABEL.Automation },
  { key: "Workflow", label: LABEL.Workflow },
  { key: "CAD", label: LABEL.CAD },
];

export function ProjectsClient() {
  const [filter, setFilter] = useState<Filter>("all");

  const items = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            aria-pressed={filter === f.key}
            onClick={() => setFilter(f.key)}
            className={[
              "rounded-full border px-4 py-2 text-sm transition-colors",
              filter === f.key
                ? "border-zinc-900 bg-zinc-900 text-white"
                : "border-zinc-300 hover:bg-zinc-50",
            ].join(" ")}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid gap-5">
        {items.map((p) => (
          <ProjectCard key={p.slug} p={p} />
        ))}
      </div>
    </div>
  );
}

/// End Patch
