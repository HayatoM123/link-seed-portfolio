// Begin Patch
// Add File: src/app/not-found.tsx
import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <Container className="space-y-6">
      <h1 className="text-2xl font-semibold">ページが見つかりません</h1>
      <p className="text-zinc-700 leading-7 max-w-2xl">
        URLが間違っているか、ページが移動した可能性があります。
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/" className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm text-white hover:bg-zinc-800">
          トップへ戻る
        </Link>
        <Link href="/projects" className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm hover:bg-zinc-50">
          実績を見る
        </Link>
      </div>
    </Container>
  );
}

// End Patch
