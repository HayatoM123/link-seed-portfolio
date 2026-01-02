// src/lib/blog.tsx

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { z } from "zod";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

const PostFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().min(1), // ISO想定
  tags: z.array(z.string()).default([]),
  draft: z.boolean().optional(),
});

export type PostFrontmatter = z.infer<typeof PostFrontmatterSchema>;
export type Post = PostFrontmatter & { slug: string };

function fileToSlug(filename: string) {
  return filename.replace(/\.mdx$/, "");
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.flatMap((filename) => {
    const fullPath = path.join(POSTS_DIR, filename);
    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data } = matter(raw);

    const parsed = PostFrontmatterSchema.safeParse(data);
    if (!parsed.success) return []; // frontmatter不正は一覧から除外

    const fm = parsed.data;

    return [
      {
        slug: fileToSlug(filename),
        title: fm.title,
        description: fm.description,
        date: fm.date,
        tags: fm.tags,
        draft: fm.draft ?? false,
      },
    ];
  });

  return posts.filter((p) => !p.draft).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string) {
  const fullPath = path.join(POSTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(fullPath, "utf-8");
  const { content, data } = matter(raw);

  // 不正なら例外（ページ側で notFound() などに繋げる）
  const frontmatter = PostFrontmatterSchema.parse(data);

  const mdx = await compileMDX({
    source: content,
    options: { mdxOptions: { remarkPlugins: [remarkGfm] } },
    components: {
      a: (props: any) => <a {...props} className="underline underline-offset-4" />,
      code: (props: any) => (
        <code {...props} className="rounded bg-zinc-100 px-1 py-0.5 text-sm" />
      ),
    },
  });

  return { frontmatter, content: mdx.content };
}
