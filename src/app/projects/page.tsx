import { Container } from "@/components/Container";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";

export default function ProjectsPage() {
  return (
    <Container className="space-y-8">
      <h1 className="text-2xl font-semibold">Projects</h1>
      <p className="text-zinc-700 leading-7 max-w-2xl">
        課題→施策→成果（数値）を中心に、再現性のある形でまとめています。
      </p>
      <div className="grid gap-5">
        {projects.map((p) => <ProjectCard key={p.slug} p={p} />)}
      </div>
    </Container>
  );
}