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

export const WithBackNext: Story = {
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

export const NumbersOnly: Story = {
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

export const ActivePagePositions: Story = {
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
