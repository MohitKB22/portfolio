import { describe, expect, it } from 'vitest';
import { getAllPosts, getAllTags, getCategories, getPostBySlug, getRelatedPosts } from '@/lib/blog';

const posts = getAllPosts();

describe('blog', () => {
  it('loads MDX posts from content/blog', () => {
    expect(posts.length).toBeGreaterThan(0);
  });

  it('gives every post the required frontmatter', () => {
    for (const post of posts) {
      expect(post.title).toBeTruthy();
      expect(post.description).toBeTruthy();
      expect(post.category).toBeTruthy();
      expect(Number.isNaN(new Date(post.date).getTime())).toBe(false);
      expect(post.readingTime).toMatch(/read/);
      expect(post.wordCount).toBeGreaterThan(100);
    }
  });

  it('sorts posts newest first', () => {
    const dates = posts.map((post) => new Date(post.date).getTime());
    expect([...dates].sort((a, b) => b - a)).toEqual(dates);
  });

  it('looks posts up by slug', () => {
    const slug = posts[0]!.slug;
    expect(getPostBySlug(slug)?.slug).toBe(slug);
    expect(getPostBySlug('nope')).toBeUndefined();
  });

  it('aggregates categories and tags', () => {
    expect(getCategories().length).toBeGreaterThan(0);
    expect(getAllTags().length).toBeGreaterThan(0);
  });

  it('excludes the current post from related posts', () => {
    const slug = posts[0]!.slug;
    expect(getRelatedPosts(slug, 3).some((post) => post.slug === slug)).toBe(false);
  });
});
