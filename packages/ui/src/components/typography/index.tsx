import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type { JSX } from "react";

import { cn } from "../../lib/utils.ts";
import "./typography.css";

const typographyVariants = cva("ds-typography", {
  variants: {
    variant: {
      display: "ds-typography--display",
      h1: "ds-typography--h1",
      h2: "ds-typography--h2",
      h3: "ds-typography--h3",
      h4: "ds-typography--h4",
      "paragraph-xlarge": "ds-typography--paragraph-xlarge",
      "paragraph-large": "ds-typography--paragraph-large",
      paragraph: "ds-typography--paragraph",
      "paragraph-small": "ds-typography--paragraph-small",
      "label-large": "ds-typography--label-large",
      label: "ds-typography--label",
      "label-small": "ds-typography--label-small",
    },
    fontWeight: {
      regular: "ds-typography--weight-regular",
      medium: "ds-typography--weight-medium",
      semibold: "ds-typography--weight-semibold",
      bold: "ds-typography--weight-bold",
    },
  },
  defaultVariants: {
    variant: "paragraph",
  },
});

type TypographyVariant = NonNullable<VariantProps<typeof typographyVariants>["variant"]>;
type TypographyFontWeight = NonNullable<VariantProps<typeof typographyVariants>["fontWeight"]>;

type TypographyState = {
  slot: "typography";
  variant: TypographyVariant;
  fontWeight?: TypographyFontWeight;
};

type TypographyRender = keyof JSX.IntrinsicElements | useRender.RenderProp<TypographyState>;

type TypographyProps = Omit<useRender.ComponentProps<"div">, "render"> &
  VariantProps<typeof typographyVariants> & {
    render?: TypographyRender;
  };

function Typography({
  className,
  variant = "paragraph",
  fontWeight,
  children,
  render,
  ...props
}: TypographyProps) {
  const resolvedVariant = variant ?? "paragraph";
  const state: TypographyState = {
    slot: "typography",
    variant: resolvedVariant,
    fontWeight: fontWeight ?? undefined,
  };
  const isTagName = typeof render === "string";

  return useRender({
    defaultTagName: isTagName ? render : "div",
    props: mergeProps<"div">(
      {
        className: cn(typographyVariants({ variant: resolvedVariant, fontWeight, className })),
        children,
      },
      props,
    ),
    render: isTagName ? undefined : render,
    state,
  });
}

export {
  Typography,
  type TypographyFontWeight,
  type TypographyRender,
  type TypographyVariant,
  typographyVariants,
};
