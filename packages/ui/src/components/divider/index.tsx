import { Separator } from "@base-ui/react/separator";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import "@ds-12/design-tokens/tokens.css";
import { cn } from "../../lib/utils.ts";
import "./divider.css";

const dividerVariants = cva("ds-divider", {
  variants: {
    orientation: {
      horizontal: "ds-divider--horizontal",
      vertical: "ds-divider--vertical",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export type DividerProps = ComponentProps<typeof Separator> &
  VariantProps<typeof dividerVariants> & {
    className?: string;
  };

export function Divider({ className, orientation = "horizontal", ...props }: DividerProps) {
  return (
    <Separator
      className={cn(dividerVariants({ orientation, className }))}
      orientation={orientation ?? "horizontal"}
      {...props}
    />
  );
}

export { dividerVariants };
