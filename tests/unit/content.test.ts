import { describe, expect, it } from 'vitest';
import {
  featuredProjects,
  getProjectBySlug,
  getRelatedProjects,
  portfolio,
  projectCategories,
  projects,
} from '@/data';
import { contactFormSchema, portfolioSchema, projectSchema } from '@/data/schema';

describe('portfolio content', () => {
  it('validates against the schema', () => {
    expect(() => portfolioSchema.parse(portfolio)).not.toThrow();
  });

  it('exposes a complete profile', () => {
    expect(portfolio.profile.name).toBe('Mohit Barse');
    expect(portfolio.profile.email).toMatch(/@/);
    expect(portfolio.profile.titles.length).toBeGreaterThan(1);
  });

  it('orders experience newest first', () => {
    const starts = portfolio.experience.map((role) => role.start);
    expect([...starts].sort().reverse()).toEqual(starts);
  });

  it('marks exactly one role as current', () => {
    expect(portfolio.experience.filter((role) => role.current)).toHaveLength(1);
  });

  it('keeps every skill level within range', () => {
    for (const group of portfolio.skillGroups) {
      for (const skill of group.skills) {
        expect(skill.level).toBeGreaterThan(0);
        expect(skill.level).toBeLessThanOrEqual(100);
      }
    }
  });
});

describe('projects', () => {
  it('validates every project', () => {
    for (const project of projects) {
      expect(() => projectSchema.parse(project)).not.toThrow();
    }
  });

  it('has unique slugs', () => {
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
  });

  it('features at least three projects', () => {
    expect(featuredProjects.length).toBeGreaterThanOrEqual(3);
  });

  it('derives categories without duplicates', () => {
    expect(new Set(projectCategories).size).toBe(projectCategories.length);
  });

  it('looks projects up by slug', () => {
    const first = projects[0]!;
    expect(getProjectBySlug(first.slug)?.title).toBe(first.title);
    expect(getProjectBySlug('does-not-exist')).toBeUndefined();
  });

  it('returns related projects excluding the current one', () => {
    const slug = projects[0]!.slug;
    const related = getRelatedProjects(slug, 3);
    expect(related).toHaveLength(3);
    expect(related.some((p) => p.slug === slug)).toBe(false);
  });

  it('points every project at a GitHub URL', () => {
    for (const project of projects) {
      expect(project.github).toMatch(/^https:\/\/github\.com\//);
    }
  });
});

describe('contact form schema', () => {
  const valid = {
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    subject: 'Role enquiry',
    message: 'I would like to talk about an AI engineering role on our platform team.',
  };

  it('accepts a valid submission', () => {
    expect(contactFormSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects a malformed email', () => {
    expect(contactFormSchema.safeParse({ ...valid, email: 'nope' }).success).toBe(false);
  });

  it('rejects a short message', () => {
    expect(contactFormSchema.safeParse({ ...valid, message: 'hi' }).success).toBe(false);
  });

  it('rejects a filled honeypot', () => {
    expect(contactFormSchema.safeParse({ ...valid, honeypot: 'bot' }).success).toBe(false);
  });
});
