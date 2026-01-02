import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/content/site";

export default function ContactPage() {
  return (
    <Container className="space-y-8">
      <h1 className="text-2xl font-semibold">Contact</h1>
      <p className="text-zinc-700 leading-7 max-w-2xl">
        相談内容が固まっていなくても大丈夫です。現状と目的を共有いただければ、進め方を整理して提案します。
      </p>

      <div className="grid gap-6 rounded-2xl border border-zinc-200 p-6 md:grid-cols-2">
        <div className="space-y-2 text-sm text-zinc-700">
          <div className="font-medium">{site.brand}</div>
          <div>{site.nameJa} / {site.nameEn}</div>
          <div className="text-zinc-600">対応：{site.location}</div>
          <div className="text-zinc-600">価格：{site.pricing}</div>
          <div className="text-zinc-500">
            ※メール直送にしたい場合は site.ts の contactEmail を差し替えてください。
          </div>
        </div>
        <ContactForm />
      </div>
    </Container>
  );
}