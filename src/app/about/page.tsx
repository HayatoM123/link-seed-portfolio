import { Container } from "@/components/Container";
import { site } from "@/content/site";

export default function AboutPage() {
  return (
    <Container className="space-y-10">
      <h1 className="text-2xl font-semibold">About</h1>

      <section className="space-y-3">
        <p className="text-zinc-700 leading-7">
          {site.brand}（{site.nameEn}）は、現場の繰り返し作業を「標準化→自動化」して、
          人が本来やるべき業務に時間を使える状態をつくることを重視しています。
        </p>
        <ul className="list-disc pl-5 text-zinc-700 space-y-2">
          <li>適材適所でツール選定（VBA / RPA / Power Automate / Python）</li>
          <li>例外対応・チェック・ログなど“運用できる品質”まで含めて実装</li>
          <li>引き継ぎや改善前提の設計（属人化を減らす）</li>
        </ul>
      </section>

      <section className="rounded-2xl border border-zinc-200 p-6">
        <div className="text-sm text-zinc-500">対応</div>
        <div className="mt-1 font-medium">{site.location}</div>
        <div className="mt-2 text-sm text-zinc-600">{site.pricing}</div>
      </section>
    </Container>
  );
}