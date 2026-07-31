import { expect, test } from '@playwright/test';

test.describe('portfolio', () => {
  test('renders the hero and primary calls to action', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Mohit');
    await expect(page.getByRole('link', { name: /view my work/i })).toBeVisible();
  });

  test('navigates to the projects page and filters', async ({ page }) => {
    await page.goto('/projects');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await page.getByRole('searchbox', { name: /search projects/i }).fill('langgraph');
    await expect(page.getByText(/of 22 projects/i)).toBeVisible();
  });

  test('opens a project case study', async ({ page }) => {
    await page.goto('/projects/self-healing-rag');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Self-Healing RAG');
    await expect(page.getByRole('heading', { name: 'Architecture' })).toBeVisible();
  });

  test('renders a blog post with a table of contents', async ({ page }) => {
    await page.goto('/blog');
    await page
      .getByRole('link', { name: /RAG That Knows When It's Wrong/i })
      .first()
      .click();
    await expect(page.getByRole('navigation', { name: /table of contents/i })).toBeVisible();
  });

  test('validates the contact form', async ({ page }) => {
    await page.goto('/contact');
    await page.getByRole('button', { name: /send message/i }).click();
    await expect(page.getByRole('alert').first()).toBeVisible();
  });

  test('serves SEO endpoints', async ({ request }) => {
    for (const path of ['/sitemap.xml', '/robots.txt', '/rss.xml']) {
      expect((await request.get(path)).status()).toBe(200);
    }
  });

  test('has no obvious accessibility blockers on the home page', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('main#main')).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible();
    expect(await page.locator('h1').count()).toBe(1);
  });
});
