import { describe, expect, it } from 'vitest';
import {
  cn,
  durationBetween,
  formatDate,
  formatDateRange,
  formatMonth,
  initialsOf,
  slugify,
  truncate,
} from '@/lib/utils';
import { extractHeadings } from '@/lib/mdx';

describe('cn', () => {
  it('merges conflicting Tailwind classes, last one winning', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });

  it('drops falsy values', () => {
    expect(cn('flex', false, undefined, 'gap-2')).toBe('flex gap-2');
  });
});

describe('date helpers', () => {
  it('formats a YYYY-MM marker', () => {
    expect(formatMonth('2026-05')).toBe('May 2026');
  });

  it('falls back to Present for null', () => {
    expect(formatMonth(null)).toBe('Present');
  });

  it('handles a bare year', () => {
    expect(formatMonth('2022')).toBe('2022');
  });

  it('formats a range', () => {
    expect(formatDateRange('2025-11', '2026-02')).toBe('Nov 2025 — Feb 2026');
  });

  it('computes an inclusive duration', () => {
    expect(durationBetween('2025-11', '2026-02')).toBe('4 mos');
    expect(durationBetween('2025-01', '2026-02')).toBe('1 yr 2 mos');
  });

  it('formats an ISO date', () => {
    expect(formatDate('2026-07-12')).toBe('12 Jul 2026');
  });
});

describe('string helpers', () => {
  it('slugifies', () => {
    expect(slugify('Self-Healing RAG!')).toBe('self-healing-rag');
  });

  it('truncates with an ellipsis', () => {
    expect(truncate('abcdefghij', 5)).toBe('abcd…');
    expect(truncate('abc', 5)).toBe('abc');
  });

  it('derives initials', () => {
    expect(initialsOf('Mohit Barse')).toBe('MB');
  });
});

describe('extractHeadings', () => {
  it('collects h2 and h3 headings with slugified ids', () => {
    const headings = extractHeadings('# Title\n\n## First Section\n\ntext\n\n### Nested Bit\n');
    expect(headings).toEqual([
      { id: 'first-section', text: 'First Section', level: 2 },
      { id: 'nested-bit', text: 'Nested Bit', level: 3 },
    ]);
  });

  it('ignores headings inside fenced code blocks', () => {
    const headings = extractHeadings('## Real\n\n```md\n## Fake\n```\n\n## Also Real\n');
    expect(headings.map((h) => h.text)).toEqual(['Real', 'Also Real']);
  });
});
