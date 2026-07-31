import { portfolio } from '@/data';
import { BrandByName } from '@/components/ui/icons';

/**
 * Infinite CSS marquee. The list is duplicated once and translated -50%, which
 * gives a seamless loop without JavaScript. Pauses on hover.
 */
export function TechMarquee() {
  const items = [...portfolio.techStack, ...portfolio.techStack];

  return (
    <section aria-label="Technology stack" className="relative py-4">
      <div className="container-page">
        <p className="mb-7 text-center text-[0.6875rem] font-semibold tracking-[0.24em] text-subtle uppercase">
          Technology Stack
        </p>
      </div>

      <div className="marquee-wrapper marquee-mask overflow-hidden">
        <ul className="marquee-track gap-3">
          {items.map((tech, index) => (
            <li
              key={`${tech.name}-${index}`}
              aria-hidden={index >= portfolio.techStack.length}
              className="group flex shrink-0 items-center gap-2.5 rounded-2xl border border-line bg-[var(--panel)] px-5 py-3.5 transition-colors duration-300 hover:border-brand/35 hover:bg-[var(--panel-2)]"
            >
              <BrandByName
                name={tech.icon}
                className="size-5 text-muted transition-colors duration-300 group-hover:text-brand-accent"
              />
              <span className="text-[0.8125rem] font-medium whitespace-nowrap text-muted transition-colors duration-300 group-hover:text-ink">
                {tech.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
