import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "../../lib/utils.ts";
import { Icon } from "../icon/index.tsx";
import "./checkbox.css";

const checkboxVariants = cva("ds-checkbox", {
  variants: {
    size: {
      sm: "ds-checkbox--sm",
      lg: "ds-checkbox--lg",
    },
    invalid: {
      true: "ds-checkbox--invalid",
      false: null,
    },
    disabled: {
      true: "ds-checkbox--disabled",
      false: null,
    },
  },
  defaultVariants: {
    size: "lg",
    invalid: false,
    disabled: false,
  },
});

export type CheckboxProps = Omit<ComponentProps<typeof BaseCheckbox.Root>, "className"> &
  VariantProps<typeof checkboxVariants> & {
    /** Additional CSS class names applied to the root element. */
    className?: string;
    /**
     * Visual size of the checkbox control.
     * @default "lg"
     */
    size?: "sm" | "lg";
    /**
     * Marks the control as invalid and sets `aria-invalid`.
     * @default false
     */
    invalid?: boolean;
  };

/** Square selection control for independent on/off choices in forms and settings. */
export function Checkbox({
  className,
  size = "lg",
  invalid = false,
  disabled = false,
  checked,
  defaultChecked,
  onCheckedChange,
  ...props
}: CheckboxProps) {
  const iconSize = size === "sm" ? 12 : 16;

  return (
    <BaseCheckbox.Root
      className={cn(
        checkboxVariants({
          size,
          invalid,
          disabled,
          className,
        }),
      )}
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      onCheckedChange={onCheckedChange}
      {...props}
    >
      <span className="ds-checkbox__control" aria-hidden>
        <BaseCheckbox.Indicator className="ds-checkbox__indicator" keepMounted>
          <Icon name="check" size={iconSize} />
        </BaseCheckbox.Indicator>
      </span>
    </BaseCheckbox.Root>
  );
}

export { checkboxVariants };
