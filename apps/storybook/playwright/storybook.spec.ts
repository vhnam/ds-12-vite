import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

type StoryEntry = { id: string; name: string; title: string; type: string };

async function fetchStories(baseURL: string): Promise<StoryEntry[]> {
  const res = await fetch(`${baseURL}/index.json`);
  const data = (await res.json()) as { entries: Record<string, StoryEntry> };
  return Object.values(data.entries).filter((e) => e.type === "story");
}

test("a11y and visual snapshots", async ({ page, baseURL }) => {
  const stories = await fetchStories(baseURL ?? "http://localhost:6006");

  for (const story of stories) {
    await test.step(`${story.title} / ${story.name}`, async () => {
      await page.goto(`/iframe.html?id=${story.id}&viewMode=story`);
      await page.waitForLoadState("networkidle");

      // Accessibility
      const results = await new AxeBuilder({ page }).include("#storybook-root").analyze();
      expect
        .soft(
          results.violations,
          `a11y violations in "${story.title} / ${story.name}":\n${results.violations.map((v) => `  [${v.impact}] ${v.id}: ${v.description}`).join("\n")}`,
        )
        .toEqual([]);

      // Visual snapshot
      await expect.soft(page).toHaveScreenshot(`${story.id}.png`);
    });
  }
});
