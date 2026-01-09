import Link from "next/link";
import { Container } from "@/components/Container";
import { getAllPosts } from "@/lib/blog";
import { Tag } from "@/components/Tag";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Container className="space-y-8">
      {/* ✅ この見出しが出れば /blog ルートは生きています */}
      <h1 className="text-2xl font-semibold">ブログ</h1>

      <p className="text-zinc-700 leading-7 max-w-2xl">
        技術メモと日記寄りの記録です。自動化の考え方、作業の型、気づきなどを書きます。
      </p>

      {/* ✅ 0件でも 404 にしない（準備中表示を出す） */}
      {posts.length === 0 ? (
        <div className="rounded-2xl border border-zinc-200 p-6 text-sm text-zinc-600">
          まだ記事がありません（準備中）
          <div className="mt-3">
            <Link
              href="/contact"
              className="underline underline-offset-4 hover:text-zinc-900"
            >
              相談する →
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="rounded-2xl border border-zinc-200 p-6 hover:bg-zinc-50"
            >
              <div className="text-sm text-zinc-500">{p.date}</div>
              <div className="mt-1 font-medium">{p.title}</div>
              <div className="mt-2 text-sm text-zinc-600">{p.description}</div>

              {p.tags?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Tag key={t} text={t} />
                  ))}
                </div>
              ) : null}
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}
