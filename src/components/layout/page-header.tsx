import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  breadcrumbs?: { name: string; href: string }[];
}

export function PageHeader({
  eyebrow,
  title,
  accent,
  description,
  breadcrumbs = [],
}: PageHeaderProps) {
  return (
    <header className="container-page pt-32 pb-4 sm:pt-36">
      {breadcrumbs.length > 0 ? (
        <nav aria-label="Breadcrumb" className="mb-7">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-subtle">
            <li>
              <Link href="/" className="transition-colors hover:text-brand-accent">
                Home
              </Link>
            </li>
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.href} className="flex items-center gap-1.5">
                <ChevronRight className="size-3" aria-hidden />
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-muted">{crumb.name}</span>
                ) : (
                  <Link href={crumb.href} className="transition-colors hover:text-brand-accent">
                    {crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      ) : null}

      <SectionHeading
        as="h1"
        eyebrow={eyebrow}
        title={title}
        accent={accent}
        description={description}
      />
    </header>
  );
}
