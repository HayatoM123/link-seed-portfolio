import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { Tag } from "@/components/Tag";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

// ✅ Next.js 16/Turbopack 対応：params が Promise の場合があるため await してから使う
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  try {
    const { slug } = await params; // ←ここがポイント
    const post = await getPostBySlug(slug);
    return {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
    };
  } catch {
    return {};
  }
}

// ✅ Next.js 16/Turbopack 対応：params を await してから slug を取り出す
export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params; // ←ここがポイント
    const { frontmatter, content } = await getPostBySlug(slug);

    return (
      <Container className="space-y-6">
        <div className="text-sm text-zinc-500">{frontmatter.date}</div>
        <h1 className="text-2xl font-semibold">{frontmatter.title}</h1>
        <p className="text-zinc-700">{frontmatter.description}</p>

        <div className="flex flex-wrap gap-2">
          {frontmatter.tags?.map((t) => <Tag key={t} text={t} />)}
        </div>

        <article className="prose prose-zinc max-w-none">
          {content}
        </article>
      </Container>
    );
  } catch {
    notFound();
  }
}
