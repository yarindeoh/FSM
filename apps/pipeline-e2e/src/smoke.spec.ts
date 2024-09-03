import { test, expect } from '@playwright/test';

// smoke tests ->
// test critical paths for both deterministic and non-deterministic pipelines.
// covers the happy path of the flow
test('Deterministic Pipeline Smoke test - should change pipeline state', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.getByTestId('Deterministic')).toBeVisible();
  await page.click('div[data-testid="current"] button');
  await page.click('div[data-testid="current"] button');
  await page.click('div[data-testid="current"] button');
  await page.click('div[data-testid="current"] button');
  await page.click('div[data-testid="current"] button');
  await expect(page.getByTestId('done')).toBeVisible();
});

test('Non Deterministic Pipeline Smoke test - should change state', async ({
  // TODO:: implement non deterministic pipeline test
  page,
}) => {
  await page.goto('/');
});
