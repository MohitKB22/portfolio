export interface GitHubRepoStats {
  name: string;
  stars: number;
  forks: number;
  language: string | null;
  updatedAt: string;
  url: string;
}

export interface GitHubProfileStats {
  followers: number;
  publicRepos: number;
  totalStars: number;
  topLanguages: { name: string; count: number }[];
  repos: GitHubRepoStats[];
}

const GITHUB_USER = 'MohitKB22';
const API = 'https://api.github.com';

function headers(): HeadersInit {
  const base: Record<string, string> = { Accept: 'application/vnd.github+json' };
  if (process.env.GITHUB_TOKEN) base.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return base;
}

/**
 * Live GitHub stats, revalidated hourly. Wrapped so an API outage or a
 * rate-limit response degrades to `null` rather than failing the page.
 */
export async function getGitHubStats(): Promise<GitHubProfileStats | null> {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`${API}/users/${GITHUB_USER}`, { headers: headers(), next: { revalidate: 3600 } }),
      fetch(`${API}/users/${GITHUB_USER}/repos?per_page=100&sort=updated`, {
        headers: headers(),
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) return null;

    const user = (await userRes.json()) as { followers: number; public_repos: number };
    const repos = (await reposRes.json()) as Array<{
      name: string;
      stargazers_count: number;
      forks_count: number;
      language: string | null;
      updated_at: string;
      html_url: string;
      fork: boolean;
    }>;

    const owned = repos.filter((r) => !r.fork);
    const languageCounts = new Map<string, number>();
    for (const repo of owned) {
      if (!repo.language) continue;
      languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1);
    }

    return {
      followers: user.followers,
      publicRepos: user.public_repos,
      totalStars: owned.reduce((sum, r) => sum + r.stargazers_count, 0),
      topLanguages: [...languageCounts.entries()]
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 6),
      repos: owned.map((r) => ({
        name: r.name,
        stars: r.stargazers_count,
        forks: r.forks_count,
        language: r.language,
        updatedAt: r.updated_at,
        url: r.html_url,
      })),
    };
  } catch {
    return null;
  }
}
