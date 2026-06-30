import { AxeBuilder } from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

type StoryEntry = {
  id: string;
  name: string;
  title: string;
  type: string;
  tags?: string[];
};

async function fetchStories(baseURL: string): Promise<StoryEntry[]> {
  const res = await fetch(`${baseURL}/index.json`);
  const data = (await res.json()) as { entries: Record<string, StoryEntry> };
  return Object.values(data.entries).filter((entry) => entry.type === 'story');
}

function isA11yTestedStory(story: StoryEntry) {
  return (story.tags?.includes('manifest') ?? false) && !story.tags?.includes('a11y-debt');
}

test('a11y and visual snapshots', async ({ page, baseURL }) => {
  test.setTimeout(10 * 60 * 1000);

  const stories = await fetchStories(baseURL ?? 'http://localhost:6006');

  for (const story of stories) {
    await test.step(`${story.title} / ${story.name}`, async () => {
      await page.goto(`/iframe.html?id=${story.id}&viewMode=story`);
      await page.locator('#storybook-root').waitFor({ state: 'visible' });
      await page.evaluate(() => document.fonts.ready);

      if (isA11yTestedStory(story)) {
        const results = await new AxeBuilder({ page })
          .include('#storybook-root')
          // Base UI focus guards are intentionally focusable while aria-hidden.
          .exclude('[data-base-ui-focus-guard]')
          .analyze();
        expect
          .soft(
            results.violations,
            `a11y violations in "${story.title} / ${story.name}":\n${results.violations.map((v) => `  [${v.impact}] ${v.id}: ${v.description}`).join('\n')}`,
          )
          .toEqual([]);
      }

      await expect.soft(page).toHaveScreenshot(`${story.id}.png`);
    });
  }
});
