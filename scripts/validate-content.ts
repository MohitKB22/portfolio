/**
 * Standalone content validation — run with `npm run validate:content`.
 * Useful in CI or a pre-commit hook to catch a bad JSON edit before a build.
 */
import { portfolioSchema, projectsSchema } from '../src/data/schema';
import portfolioJson from '../src/data/portfolio.json';
import projectsJson from '../src/data/projects.json';

const results = [
  { label: 'portfolio.json', result: portfolioSchema.safeParse(portfolioJson) },
  { label: 'projects.json', result: projectsSchema.safeParse(projectsJson) },
];

let failed = false;

for (const { label, result } of results) {
  if (result.success) {
    console.log(`✓ ${label} is valid`);
  } else {
    failed = true;
    console.error(`✗ ${label} failed validation:`);
    console.error(JSON.stringify(result.error.format(), null, 2));
  }
}

if (failed) process.exit(1);
console.log('\nAll content files validated successfully.');
