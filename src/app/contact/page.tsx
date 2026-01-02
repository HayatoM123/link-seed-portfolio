import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/content/site";

export default function ContactPage() {
  const subject = encodeURIComponent("【LINK SEED】お問い合わせ");
  const body = encodeURIComponent(
    "お名前：\n目的（何ができるようになりたいか）：\n現状（今の手順/ツール）：\n頻度（毎日/週次/月次）：\n例外（イレギュラー）：\n期限（いつまでに）：\n共有可能な資料（画面/サンプル/Excel）：\n"
  );  
  const mailto = `mailto:${site.contactEmail}?subject=${subject}&body=${body}`;

  return (
    <Container className="space-y-8">
      <h1 className="text-2xl font-semibold">お問い合わせ</h1>
      <p className="text-zinc-700 leading-7 max-w-2xl">
        相談内容が固まっていなくても大丈夫です。現状と目的を共有いただければ、進め方を整理して提案します。
      </p>
      <a
        href={mailto}
        className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-5 py-2.5 text-sm hover:bg-zinc-50 transition-colors"
      >
        メールで相談する
      </a>

      <div className="grid gap-6 rounded-2xl border border-zinc-200 p-6 md:grid-cols-2">
        <div className="space-y-2 text-sm text-zinc-700">
          <div className="font-medium">{site.brand}</div>
          <div>{site.nameJa} / {site.nameEn}</div>
          <div className="text-zinc-600">対応：{site.location}</div>
          <div className="text-zinc-600">価格：{site.pricing}</div>
        </div>
        <ContactForm />
      </div>
    </Container>
  );
}