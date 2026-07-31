import type { Config } from 'tailwindcss';

/**
 * Tailwind CSS v4 is configured CSS-first in `src/app/globals.css` via `@theme`.
 * This file is loaded from globals.css with `@config` and exists so editor
 * IntelliSense, prettier-plugin-tailwindcss and future plugins have a target.
 */
export default {
  content: ['./src/**/*.{ts,tsx,mdx}', './content/**/*.{md,mdx}'],
  darkMode: 'class',
  theme: { extend: { screens: { '3xl': '1800px' } } },
  plugins: [],
} satisfies Config;
