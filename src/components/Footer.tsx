import { Container } from "./Container";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200/60 py-10">
      <Container className="flex flex-col gap-3 text-sm text-zinc-600">
        <div className="font-medium text-zinc-800">{site.brand}</div>
        <div>{site.location} / {site.pricing}</div>
        <div className="text-zinc-500">© {new Date().getFullYear()} {site.brand}</div>
      </Container>
    </footer>
  );
}