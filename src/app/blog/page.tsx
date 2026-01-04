// src/app/blog/page.tsx
import Link from "next/link";
import { Container } from "@/components/Container";
import { getAllPosts } from "@/lib/blog";
import { Tag } from "@/components/Tag";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Container className="space-y-8">
      <h1 className="text-2xl font-semibold">ブログ</h1>
      <p className="text-zinc-700 leading-7 max-w-2xl">
        技術メモと日記寄りの記録です。自動化の考え方、作業の型、気づきなどを書きます。
      </p>

      {/* ✅ ここが一覧の描画部分です（エラーが出ているのもだいたいこの周辺） */}
      <div className="grid gap-4">
        {/* ✅ 記事が0件のときの表示（任意） */}
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-zinc-200 p-6 text-sm text-zinc-600">
            まだ記事がありません（準備中）
          </div>
        ) : (
          posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="rounded-2xl border border-zinc-200 p-6 hover:bg-zinc-50"
            >
              <div className="text-sm text-zinc-500">{p.date}</div>
              <div className="mt-1 font-medium">{p.title}</div>
              <div className="mt-2 text-sm text-zinc-600">{p.description}</div>

              {/* ✅ タグがある場合だけ表示 */}
              {p.tags?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Tag key={t} text={t} />
                  ))}
                </div>
              ) : null}
            </Link>
          ))
        )}
      </div>
    </Container>
  );
}
