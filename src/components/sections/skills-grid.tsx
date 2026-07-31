'use client';

import { useState } from 'react';
import { portfolio } from '@/data';
import { LucideByName } from '@/components/ui/icons';
import { SkillBar } from '@/components/ui/skill-bar';
import { cn } from '@/lib/utils';

/**
 * Skills grouped by domain. On desktop the groups act as a tab set with a
 * detail panel; on small screens every group is expanded as a stacked list.
 */
export function SkillsGrid() {
  const groups = portfolio.skillGroups;
  const [active, setActive] = useState(groups[0]?.id ?? '');
  const activeGroup = groups.find((group) => group.id === active) ?? groups[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,20rem)_1fr]">
      {/* Group selector */}
      <ul role="tablist" aria-label="Skill categories" className="flex flex-col gap-2">
        {groups.map((group) => {
          const isActive = group.id === activeGroup?.id;
          return (
            <li key={group.id} className="reveal reveal-right">
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(group.id)}
                className={cn(
                  'group relative flex w-full items-center gap-3.5 rounded-2xl border p-4 text-left transition-all duration-300',
                  isActive
                    ? 'border-brand/40 bg-brand/10'
                    : 'border-line bg-[var(--panel)] hover:border-line-strong hover:bg-[var(--panel-2)]',
                )}
              >
                <span
                  className={cn(
                    'grid size-10 shrink-0 place-items-center rounded-xl border transition-colors duration-300',
                    isActive
                      ? 'border-brand/40 bg-brand/15 text-brand-accent'
                      : 'border-line text-muted group-hover:text-ink',
                  )}
                >
                  <LucideByName name={group.icon} className="size-[18px]" />
                </span>
                <span className="min-w-0">
                  <span
                    className={cn(
                      'block text-[0.875rem] font-semibold transition-colors',
                      isActive ? 'text-ink' : 'text-muted group-hover:text-ink',
                    )}
                  >
                    {group.name}
                  </span>
                  <span className="mt-0.5 block font-mono text-[0.625rem] text-subtle">
                    {group.skills.length} skills
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Detail panel */}
      {activeGroup ? (
        <div key={activeGroup.id} role="tabpanel" className="card-surface enter p-7 sm:p-8">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-brand/30 bg-brand/12 text-brand-accent">
              <LucideByName name={activeGroup.icon} className="size-5" />
            </span>
            <div>
              <h3 className="font-display text-xl font-semibold text-ink">{activeGroup.name}</h3>
              <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted">
                {activeGroup.description}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 sm:gap-x-10">
            {activeGroup.skills.map((skill, index) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                delay={index * 0.06}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
