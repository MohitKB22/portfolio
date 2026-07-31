import { Github, GitFork, Star, Users } from 'lucide-react';
import { getGitHubStats } from '@/lib/github';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/motion/reveal';

/**
 * Live GitHub numbers, revalidated hourly on the server. Renders nothing if the
 * API is unreachable or rate-limited — the page never depends on it.
 */
export async function GitHubStats() {
  const stats = await getGitHubStats();
  if (!stats) return null;

  const tiles = [
    { label: 'Public repositories', value: stats.publicRepos, icon: Github },
    { label: 'Total stars', value: stats.totalStars, icon: Star },
    { label: 'Followers', value: stats.followers, icon: Users },
    { label: 'Languages used', value: stats.topLanguages.length, icon: GitFork },
  ];

  return (
    <Reveal>
      <div className="card-surface p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-display text-base font-semibold text-ink">Live from GitHub</h3>
          <a
            href="https://github.com/MohitKB22"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-accent hover:underline"
          >
            <Github className="size-3.5" aria-hidden /> @MohitKB22
          </a>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {tiles.map((tile) => (
            <div key={tile.label} className="rounded-xl border border-line bg-[var(--panel)] p-4">
              <tile.icon className="size-4 text-brand-accent" aria-hidden />
              <dd className="mt-3 font-display text-2xl leading-none font-semibold text-ink">
                {tile.value}
              </dd>
              <dt className="mt-1.5 text-[0.6875rem] text-subtle">{tile.label}</dt>
            </div>
          ))}
        </dl>

        {stats.topLanguages.length > 0 ? (
          <div className="mt-6 border-t border-line pt-5">
            <p className="text-[0.6875rem] font-semibold tracking-[0.2em] text-subtle uppercase">
              Most used languages
            </p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {stats.topLanguages.map((language) => (
                <li key={language.name}>
                  <Badge variant="brand">
                    {language.name} · {language.count}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}

/** Placeholder shown while the GitHub fetch resolves, so it never blocks the page. */
export function GitHubStatsSkeleton() {
  return (
    <div className="card-surface p-6 sm:p-8" aria-hidden>
      <div className="h-5 w-40 rounded bg-[var(--panel-3)]" />
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-xl border border-line bg-[var(--panel)] p-4">
            <div className="size-4 rounded bg-[var(--panel-3)]" />
            <div className="mt-3 h-7 w-12 rounded bg-[var(--panel-3)]" />
            <div className="mt-2 h-3 w-20 rounded bg-[var(--panel-2)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
