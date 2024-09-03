import { test, expect } from '@playwright/test';

// smoke tests ->
// test critical paths for both deterministic and non-deterministic pipelines.
// covers the happy path of the flow
test('Deterministic Pipeline Smoke test - should change pipeline state', async ({
  page,
}) => {
  await page.goto('/');

  // Expect clicking on success on each job to change the state to the next one.
  await page.click('div[data-testid="current"] button');
  await page.click('div[data-testid="current"] button');
  await page.click('div[data-testid="current"] button');
  await page.click('div[data-testid="current"] button');
  await page.click('div[data-testid="current"] button');
  expect(page.locator(':has-text("Pipeline is DONE!")')).toBeDefined();
});

test('Non Deterministic Pipeline Smoke test - should change state', async ({
  // TODO:: implement non deterministic pipeline test
  page,
}) => {
  await page.goto('/');
});
