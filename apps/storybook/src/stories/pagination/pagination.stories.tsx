import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Pagination } from "@ds-12/ui/pagination";
import {
  createButtonFocusVisiblePlay,
  createButtonKeyboardFocusPlay,
  createButtonMouseClickPlay,
} from "../../lib/component-tests.ts";
import {
  ACTIVE_PAGE_POSITIONS,
  InteractivePagination,
  NumbersOnlyShowcase,
  PAGE_SCENARIOS,
  SIZES,
  WithBackNextShowcase,
  ActivePagePositionsShowcase,
} from "./pagination-story-fixtures.tsx";

/** Page navigation control with numbered pages, ellipsis for long ranges, and optional previous and next actions. */
const meta = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: SIZES,
    },
    showNavigation: { control: "boolean" },
    page: { control: { type: "number", min: 1 } },
    totalPages: { control: { type: "number", min: 1 } },
  },
  args: {
    page: 1,
    totalPages: 3,
    size: "lg",
    showNavigation: false,
  },
  render: (args) => <InteractivePagination {...args} />,
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Use the default (numbers-only) pagination for short page ranges where all pages fit without truncation — it keeps the UI minimal and scannable. */
export const Default: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const pageButton = canvas.getByRole("button", { name: "Page 1" });

    await expect(canvas.getByRole("navigation", { name: "Pagination" })).toBeInTheDocument();
    await expect(pageButton).toHaveAccessibleName("Page 1");
    await expect(pageButton).toHaveAttribute("aria-current", "page");
    await createButtonKeyboardFocusPlay("Page 1")(context);
    await createButtonFocusVisiblePlay("Page 1")(context);
    await createButtonMouseClickPlay("Page 1")(context);
  },
};

/** Enable navigation buttons when users benefit from a "Back / Next" affordance — useful for sequential flows like multi-step wizards or reading articles in series. */
export const WithNavigation: Story = {
  args: {
    showNavigation: true,
    totalPages: 10,
    page: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("button", { name: "Back" })).toBeInTheDocument();
    await expect(canvas.getByRole("button", { name: "Next" })).toBeInTheDocument();
    await expect(canvas.getByRole("button", { name: "Page 5" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  },
};

/** Showcase of Back/Next navigation across page scenarios and sizes — for human reference only. */
export const WithBackNext: Story = {
  tags: ["!manifest"],
  render: () => <WithBackNextShowcase />,
  decorators: [(Story) => <Story />],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const navigations = canvas.getAllByRole("navigation");
    const backButtons = canvas.getAllByRole("button", { name: "Back" });
    const nextButtons = canvas.getAllByRole("button", { name: "Next" });

    await expect(navigations).toHaveLength(PAGE_SCENARIOS.length * SIZES.length);
    await expect(backButtons).toHaveLength(PAGE_SCENARIOS.length * SIZES.length);
    await expect(nextButtons).toHaveLength(PAGE_SCENARIOS.length * SIZES.length);
    await expect(backButtons[0]).toHaveAttribute("aria-disabled", "true");
    await expect(nextButtons[0]).not.toHaveAttribute("aria-disabled", "true");
  },
};

/** Showcase of numbers-only pagination across page scenarios and sizes — for human reference only. */
export const NumbersOnly: Story = {
  tags: ["!manifest"],
  render: () => <NumbersOnlyShowcase />,
  decorators: [(Story) => <Story />],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getAllByRole("navigation")).toHaveLength(
      PAGE_SCENARIOS.length * SIZES.length,
    );
    await expect(canvas.queryByRole("button", { name: "Back" })).not.toBeInTheDocument();
    await expect(canvas.queryByRole("button", { name: "Next" })).not.toBeInTheDocument();
    await expect(canvas.getAllByRole("button", { name: "Page 1" })).toHaveLength(
      PAGE_SCENARIOS.length * SIZES.length,
    );
  },
};

/** Showcase of ellipsis behaviour as the active page moves through a long range — for human reference only. */
export const ActivePagePositions: Story = {
  tags: ["!manifest"],
  render: () => <ActivePagePositionsShowcase />,
  decorators: [(Story) => <Story />],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getAllByRole("navigation")).toHaveLength(
      ACTIVE_PAGE_POSITIONS.length * SIZES.length,
    );

    for (const page of ACTIVE_PAGE_POSITIONS) {
      const activeButtons = canvas
        .getAllByRole("button", { name: `Page ${page}` })
        .filter((button) => button.getAttribute("aria-current") === "page");

      await expect(activeButtons).toHaveLength(SIZES.length);
    }

    await expect(canvas.getAllByRole("button", { name: "More pages" }).length).toBeGreaterThan(0);
  },
};
