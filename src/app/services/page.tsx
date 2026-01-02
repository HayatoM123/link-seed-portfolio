import { Container } from "@/components/Container";
import { services } from "@/content/services";

export default function ServicesPage() {
  return (
    <Container className="space-y-8">
      <h1 className="text-2xl font-semibold">Services</h1>

      <div className="grid gap-5">
        {services.map((s) => (
          <section key={s.title} className="rounded-2xl border border-zinc-200 p-6">
            <h2 className="text-lg font-semibold">{s.title}</h2>
            <p className="mt-2 text-sm text-zinc-700">{s.summary}</p>
            <ul className="mt-4 list-disc pl-5 text-sm text-zinc-600 space-y-1">
              {s.bullets.map((b) => <li key={b}>{b}</li>)}
            </ul>
          </section>
        ))}
      </div>
    </Container>
  );
}