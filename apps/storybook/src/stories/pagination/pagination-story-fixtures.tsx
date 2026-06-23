import { Pagination, type PaginationProps } from "@ds-12/ui/pagination";
import { useState } from "react";
import { StoryCaption } from "../../lib/story-presentation.tsx";

export const SIZES = ["sm", "lg"] as const;

export const PAGE_SCENARIOS = [
  { key: "few", label: "<5 pages", totalPages: 3 },
  { key: "five", label: "5 pages", totalPages: 5 },
  { key: "many", label: ">5 pages", totalPages: 10 },
] as const;

export const ACTIVE_PAGE_POSITIONS = [1, 2, 5, 9, 10] as const;

const showcaseStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 24,
} as const;

const sizeRowStyle = {
  display: "flex",
  gap: 24,
  alignItems: "center",
  flexWrap: "wrap",
} as const;

export function InteractivePagination({ page: initialPage, ...props }: PaginationProps) {
  const [page, setPage] = useState(initialPage);

  return <Pagination {...props} page={page} onPageChange={setPage} />;
}

function SizePairRow({
  showNavigation,
  totalPages,
  scenarioLabel,
}: {
  showNavigation: boolean;
  totalPages: number;
  scenarioLabel: string;
}) {
  return (
    <div style={sizeRowStyle}>
      {SIZES.map((size) => (
        <InteractivePagination
          key={size}
          size={size}
          showNavigation={showNavigation}
          page={1}
          totalPages={totalPages}
          aria-label={`Pagination ${scenarioLabel} ${size}`}
        />
      ))}
    </div>
  );
}

export function WithBackNextShowcase() {
  return (
    <div style={showcaseStyle}>
      {PAGE_SCENARIOS.map(({ key, label, totalPages }) => (
        <div key={key}>
          <StoryCaption>{label}</StoryCaption>
          <SizePairRow showNavigation totalPages={totalPages} scenarioLabel={label} />
        </div>
      ))}
    </div>
  );
}

export function NumbersOnlyShowcase() {
  return (
    <div style={showcaseStyle}>
      {PAGE_SCENARIOS.map(({ key, label, totalPages }) => (
        <div key={key}>
          <StoryCaption>{label}</StoryCaption>
          <SizePairRow showNavigation={false} totalPages={totalPages} scenarioLabel={label} />
        </div>
      ))}
    </div>
  );
}

export function ActivePagePositionsShowcase() {
  return (
    <div style={showcaseStyle}>
      {ACTIVE_PAGE_POSITIONS.map((page) => (
        <div key={page}>
          <StoryCaption>page {page}</StoryCaption>
          <div style={sizeRowStyle}>
            {SIZES.map((size) => (
              <Pagination
                key={size}
                size={size}
                showNavigation={false}
                page={page}
                totalPages={10}
                aria-label={`Pagination page ${page} ${size}`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
