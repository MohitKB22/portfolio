'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkillBarProps {
  name: string;
  level: number;
  delay?: number;
  className?: string;
}

/** Accessible progress bar that fills when scrolled into view. */
export function SkillBar({ name, level, delay = 0, className }: SkillBarProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[0.8125rem] font-medium text-ink">{name}</span>
        <span className="font-mono text-[0.6875rem] text-muted tabular-nums">{level}%</span>
      </div>
      <div
        role="progressbar"
        aria-label={`${name} proficiency`}
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--panel-3)]"
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand to-brand-accent"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}
