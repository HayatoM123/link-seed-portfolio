import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { Tag } from "@/components/Tag";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug);
    return {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  try {
    const { frontmatter, content } = await getPostBySlug(params.slug);

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