import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Formats an ISO `YYYY-MM` (or `YYYY`) marker as `Mon YYYY`. */
export function formatMonth(value: string | null, fallback = 'Present'): string {
  if (!value) return fallback;
  const [year, month] = value.split('-');
  if (!month) return year ?? fallback;
  return `${MONTHS[Number(month) - 1] ?? ''} ${year}`.trim();
}

export function formatDateRange(start: string, end: string | null): string {
  return `${formatMonth(start)} — ${formatMonth(end)}`;
}

/** Human duration between two `YYYY-MM` markers, e.g. "8 mos" or "1 yr 2 mos". */
export function durationBetween(start: string, end: string | null): string {
  const toDate = (v: string) => {
    const [y, m] = v.split('-').map(Number);
    return new Date(y ?? 1970, (m ?? 1) - 1, 1);
  };
  const from = toDate(start);
  const to = end ? toDate(end) : new Date();
  let months = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth()) + 1;
  if (months < 1) months = 1;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts: string[] = [];
  if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (rest) parts.push(`${rest} mo${rest > 1 ? 's' : ''}`);
  return parts.join(' ');
}

export function formatDate(input: string | Date): string {
  const date = typeof input === 'string' ? new Date(input) : input;
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function absoluteUrl(path = ''): string {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mohitbarse.vercel.app').replace(
    /\/$/,
    '',
  );
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function truncate(value: string, length: number): string {
  return value.length <= length ? value : `${value.slice(0, length - 1).trimEnd()}…`;
}

/** Deterministic pseudo-random in [0,1) — keeps SSR and client markup identical. */
export function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}
