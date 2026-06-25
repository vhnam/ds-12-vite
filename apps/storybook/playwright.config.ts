import { defineConfig, devices } from "@playwright/test";

const STORYBOOK_URL = process.env.STORYBOOK_URL ?? "http://localhost:6006";
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: "./playwright",
  snapshotDir: "./__snapshots__",
  snapshotPathTemplate: "{snapshotDir}/{arg}-{projectName}{ext}",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: STORYBOOK_URL,
    trace: "on-first-retry",
  },
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01,
    },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: isCI ? "pnpm dlx http-server storybook-static -p 6006 -s -c-1" : "pnpm run storybook",
    url: STORYBOOK_URL,
    reuseExistingServer: !isCI,
    timeout: 120_000,
  },
});
