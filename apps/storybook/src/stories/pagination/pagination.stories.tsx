import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, within } from "storybook/test";
import { Pagination, type PaginationProps } from "@ds-12/ui/pagination";
import { StoryCaption, StorySectionTitle } from "../../lib/story-presentation.tsx";
import {
  createButtonDisabledPlay,
  createButtonFocusVisiblePlay,
  createButtonKeyboardFocusPlay,
  createButtonMouseClickPlay,
  testStoryParams,
} from "../../lib/component-tests.ts";

function InteractivePagination({ page: initialPage = 1, ...props }: PaginationProps) {
  const [page, setPage] = useState(initialPage);

  return <Pagination {...props} page={page} onPageChange={setPage} />;
}

const meta = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "lg"],
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

export const Default: Story = {};

export const LargeFewPages: Story = {
  args: { size: "lg", showNavigation: false, page: 1, totalPages: 3 },
};

export const LargeFivePages: Story = {
  args: { size: "lg", showNavigation: false, page: 1, totalPages: 5 },
};

export const LargeManyPages: Story = {
  args: { size: "lg", showNavigation: false, page: 1, totalPages: 10 },
};

export const SmallFewPages: Story = {
  args: { size: "sm", showNavigation: true, page: 1, totalPages: 3 },
};

export const SmallFivePages: Story = {
  args: { size: "sm", showNavigation: true, page: 1, totalPages: 5 },
};

export const SmallManyPages: Story = {
  args: { size: "sm", showNavigation: true, page: 1, totalPages: 10 },
};

export const AllVariants: Story = {
  render: () => {
    const scenarios = [
      { label: "<5 pages", totalPages: 3 },
      { label: "5 pages", totalPages: 5 },
      { label: ">5 pages", totalPages: 10 },
    ] as const;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
        <div>
          <StorySectionTitle>Large (numeric only)</StorySectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {scenarios.map(({ label, totalPages }) => (
              <div key={label}>
                <StoryCaption>{label}</StoryCaption>
                <InteractivePagination
                  size="lg"
                  showNavigation={false}
                  page={1}
                  totalPages={totalPages}
                  aria-label={`Pagination large: ${label}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <StorySectionTitle>Small (with Back / Next)</StorySectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {scenarios.map(({ label, totalPages }) => (
              <div key={label}>
                <StoryCaption>{label}</StoryCaption>
                <InteractivePagination
                  size="sm"
                  showNavigation={true}
                  page={1}
                  totalPages={totalPages}
                  aria-label={`Pagination small: ${label}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

const paginationTestRender = (args: PaginationProps) => <Pagination {...args} />;

export const KeyboardFocus: Story = {
  ...testStoryParams(),
  args: { page: 1, totalPages: 3, showNavigation: false },
  render: paginationTestRender,
  play: createButtonKeyboardFocusPlay("Page 1"),
};

export const FocusVisible: Story = {
  ...testStoryParams(),
  args: { page: 1, totalPages: 3, showNavigation: false },
  render: paginationTestRender,
  play: createButtonFocusVisiblePlay("Page 1"),
};

export const MouseClick: Story = {
  ...testStoryParams(),
  args: { page: 1, totalPages: 3, showNavigation: false },
  render: paginationTestRender,
  play: createButtonMouseClickPlay("Page 1"),
};

export const Disabled: Story = {
  ...testStoryParams(),
  args: { page: 1, totalPages: 5, showNavigation: true, size: "sm" },
  render: paginationTestRender,
  play: createButtonDisabledPlay("Back"),
};

export const A11y: Story = {
  ...testStoryParams(),
  args: { page: 1, totalPages: 3, showNavigation: false },
  render: paginationTestRender,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole("navigation", { name: "Pagination" });
    expect(nav).toBeInTheDocument();
    const pageButton = canvas.getByRole("button", { name: "Page 1" });
    expect(pageButton).toHaveAccessibleName("Page 1");
    expect(pageButton).toHaveAttribute("aria-current", "page");
  },
};
