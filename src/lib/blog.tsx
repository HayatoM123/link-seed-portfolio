import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string; // ISO
  tags: string[];
  draft?: boolean;
};

export type Post = PostFrontmatter & { slug: string };

function fileToSlug(filename: string) {
  return filename.replace(/\.mdx$/, "");
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const fullPath = path.join(POSTS_DIR, filename);
    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data } = matter(raw);
    const fm = data as PostFrontmatter;

    return {
      slug: fileToSlug(filename),
      title: fm.title,
      description: fm.description,
      date: fm.date,
      tags: fm.tags ?? [],
      draft: fm.draft ?? false,
    };
  });

  return posts.filter((p) => !p.draft).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string) {
  const fullPath = path.join(POSTS_DIR, ${slug}.mdx);
  const raw = fs.readFileSync(fullPath, "utf-8");
  const { content, data } = matter(raw);
  const frontmatter = data as PostFrontmatter;

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