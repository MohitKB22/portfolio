import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  featured?: boolean;
  draft?: boolean;
}

export interface Post extends PostFrontmatter {
  slug: string;
  content: string;
  readingTime: string;
  wordCount: number;
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

function readPostFile(fileName: string): Post | null {
  const slug = fileName.replace(/\.mdx?$/, '');
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), 'utf8');
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;

  if (!fm.title || !fm.date) return null;
  if (fm.draft && process.env.NODE_ENV === 'production') return null;

  const stats = readingTime(content);
  return {
    ...fm,
    tags: fm.tags ?? [],
    slug,
    content,
    readingTime: stats.text,
    wordCount: stats.words,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(readPostFile)
    .filter((p): p is Post => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getCategories(): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAllTags(): string[] {
  return [...new Set(getAllPosts().flatMap((p) => p.tags))].sort();
}

export function getRelatedPosts(slug: string, limit = 3): Post[] {
  const all = getAllPosts();
  const current = all.find((p) => p.slug === slug);
  if (!current) return all.slice(0, limit);

  return all
    .filter((p) => p.slug !== slug)
    .map((post) => ({
      post,
      score:
        post.tags.filter((t) => current.tags.includes(t)).length +
        (post.category === current.category ? 2 : 0),
    }))
    .sort(
      (a, b) =>
        b.score - a.score || new Date(b.post.date).getTime() - new Date(a.post.date).getTime(),
    )
    .slice(0, limit)
    .map((entry) => entry.post);
}
