import portfolioJson from './portfolio.json';
import projectsJson from './projects.json';
import { portfolioSchema, projectsSchema, type Portfolio, type Project } from './schema';

/** Parses content at module evaluation so bad data fails `next build`. */
function parseOrThrow<T>(
  label: string,
  result: { success: boolean; data?: T; error?: unknown },
): T {
  if (!result.success) {
    console.error(`[content] ${label} failed validation\n`, result.error);
    throw new Error(`Invalid ${label} — see the validation error above.`);
  }
  return result.data as T;
}

export const portfolio: Portfolio = parseOrThrow(
  'portfolio.json',
  portfolioSchema.safeParse(portfolioJson),
);

export const projects: Project[] = parseOrThrow(
  'projects.json',
  projectsSchema.safeParse(projectsJson),
).projects;

export const featuredProjects: Project[] = projects.filter((p) => p.featured);

export const projectCategories: string[] = Array.from(
  new Set(projects.map((p) => p.category)),
).sort();

export const aiStackCategories: string[] = Array.from(
  new Set(portfolio.aiStack.map((i) => i.category)),
);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getRelatedProjects(slug: string, limit = 3): Project[] {
  const current = getProjectBySlug(slug);
  if (!current) return projects.slice(0, limit);
  const sameCategory = projects.filter((p) => p.slug !== slug && p.category === current.category);
  const rest = projects.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

export * from './schema';
