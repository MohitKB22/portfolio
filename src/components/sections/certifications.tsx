import { Award, ExternalLink } from 'lucide-react';
import { portfolio } from '@/data';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/motion/reveal';

export function Certifications() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {portfolio.certifications.map((certification, index) => (
        <Reveal key={certification.name} delay={index * 0.07}>
          <a
            href={certification.url}
            target="_blank"
            rel="noreferrer noopener"
            className="card-surface glow-ring group flex h-full flex-col p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="grid size-11 place-items-center rounded-xl border border-amber/25 bg-amber/10 text-amber">
                <Award className="size-5" aria-hidden />
              </span>
              <span className="font-mono text-[0.6875rem] text-subtle">{certification.year}</span>
            </div>

            <h3 className="mt-5 text-[0.9375rem] leading-snug font-semibold text-ink transition-colors group-hover:text-brand-accent">
              {certification.name}
            </h3>
            <p className="mt-2 text-[0.8125rem] text-muted">{certification.issuer}</p>

            <ul className="mt-4 flex flex-wrap gap-1.5">
              {certification.skills.map((skill) => (
                <li key={skill}>
                  <Badge>{skill}</Badge>
                </li>
              ))}
            </ul>

            <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-xs font-medium text-brand-accent">
              {certification.platform} <ExternalLink className="size-3" aria-hidden />
            </span>
          </a>
        </Reveal>
      ))}
    </div>
  );
}
