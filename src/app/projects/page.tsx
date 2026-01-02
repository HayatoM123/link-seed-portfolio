import { Container } from "@/components/Container";
import { ProjectsClient } from "@/components/ProjectsClient";

export default function ProjectsPage() {
  return (
    <Container className="space-y-8">
      <h1 className="text-2xl font-semibold">実績</h1>
      <p className="text-zinc-700 leading-7 max-w-2xl">
        課題→施策→成果（数値）を中心に、再現性のある形でまとめています。
      </p>
      <ProjectsClient />
    </Container>
  );
}