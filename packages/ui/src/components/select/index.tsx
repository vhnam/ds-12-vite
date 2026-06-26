import { Select as BaseSelect } from "@base-ui/react/select";
import { cva } from "class-variance-authority";
import { createContext, type ReactNode } from "react";

import { cn } from "../../lib/utils.ts";
import { Icon } from "../icon/index.tsx";
import "./select.css";

const SELECT_ICON_SIZES = {
  sm: 20,
  lg: 24,
} as const;

const DEFAULT_LEADING_ICON = "person";

export const SelectIconSizeContext = createContext<number | undefined>(undefined);

const selectVariants = cva("ds-select", {
  variants: {
    size: {
      sm: "ds-select--sm",
      lg: "ds-select--lg",
    },
    disabled: {
      true: "ds-select--disabled",
      false: null,
    },
    invalid: {
      true: "ds-select--error",
      false: null,
    },
  },
  defaultVariants: {
    size: "sm",
    disabled: false,
    invalid: false,
  },
});

export type SelectOption = {
  /** Visible label for the option. */
  label: string;
  /** Unique value submitted with the form. */
  value: string;
  /** Prevents selecting this option. */
  disabled?: boolean;
};

export type SelectProps = {
  /** Additional CSS class names applied to the trigger wrapper. */
  className?: string;
  /**
   * Visual size of the select control.
   * @default "sm"
   */
  size?: "sm" | "lg";
  /**
   * Marks the control as invalid and sets validation styling.
   * @default false
   */
  invalid?: boolean;
  /** Prevents interaction with the control. */
  disabled?: boolean;
  /** Placeholder text shown when no value is selected. */
  placeholder?: string;
  /** Options rendered in the dropdown list. */
  options: readonly SelectOption[];
  /** Custom leading icon element. */
  leadingIcon?: ReactNode;
  /**
   * Renders a leading icon inside the trigger.
   * @default false
   */
  showLeadingIcon?: boolean;
  /** Controlled selected value. */
  value?: string | null;
  /** Initial selected value for uncontrolled usage. */
  defaultValue?: string | null;
  /** Called when the selected value changes. */
  onValueChange?: (value: string | null) => void;
  /** Whether the popup is initially open. */
  defaultOpen?: boolean;
  /** Controlled open state. */
  open?: boolean;
  /** Called when the popup opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /** ID applied to the trigger button. */
  id?: string;
  /** Form field name for the hidden input. */
  name?: string;
  /** Marks the field as required in forms. */
  required?: boolean;
  /** ID of the element that describes the select, typically helper text. */
  "aria-describedby"?: string;
  /**
   * Accessible name when no visible label is provided — use SelectField for labelled forms.
   */
  "aria-label"?: string;
};

/** Single-select dropdown with size variants, optional leading icon, and error and disabled states. */
export function Select({
  className,
  size = "sm",
  invalid = false,
  disabled,
  placeholder = "Option",
  options,
  leadingIcon,
  showLeadingIcon = false,
  value,
  defaultValue,
  onValueChange,
  defaultOpen,
  open,
  onOpenChange,
  id,
  name,
  required,
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
}: SelectProps) {
  const resolvedSize = size ?? "sm";
  const isDisabled = Boolean(disabled);
  const isInvalid = Boolean(invalid);
  const iconSize = SELECT_ICON_SIZES[resolvedSize];
  const hasLeading = showLeadingIcon;
  const resolvedLeading = hasLeading
    ? (leadingIcon ?? <Icon name={DEFAULT_LEADING_ICON} size={iconSize} />)
    : null;

  return (
    <SelectIconSizeContext.Provider value={iconSize}>
      <BaseSelect.Root
        items={options}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={isDisabled}
        modal={false}
        defaultOpen={defaultOpen}
        open={open}
        onOpenChange={onOpenChange}
        name={name}
        required={required}
      >
        <div
          className={cn(
            selectVariants({
              size: resolvedSize,
              disabled: isDisabled,
              invalid: isInvalid,
              className,
            }),
          )}
        >
          <BaseSelect.Trigger
            id={id}
            className="ds-select__trigger"
            disabled={isDisabled}
            aria-invalid={isInvalid || undefined}
            aria-describedby={ariaDescribedBy}
            aria-disabled={isDisabled || undefined}
            aria-label={ariaLabel}
          >
            {resolvedLeading ? <span className="ds-select__leading">{resolvedLeading}</span> : null}
            <BaseSelect.Value placeholder={placeholder} className="ds-select__value" />
            <BaseSelect.Icon
              className="ds-select__trailing"
              render={(props, { open }) => (
                <span {...props} className={cn("ds-select__trailing", props.className)}>
                  <Icon name={open ? "arrow_drop_up" : "arrow_drop_down"} size={iconSize} />
                </span>
              )}
            />
          </BaseSelect.Trigger>
        </div>
        <BaseSelect.Portal>
          <BaseSelect.Positioner
            className="ds-select__positioner"
            sideOffset={4}
            align="start"
            alignItemWithTrigger={false}
          >
            <BaseSelect.Popup className="ds-select__popup">
              <BaseSelect.List className="ds-select__list">
                {options.map((option) => (
                  <BaseSelect.Item
                    key={option.value}
                    value={option.value}
                    label={option.label}
                    disabled={option.disabled}
                    className="ds-select__item"
                  >
                    <BaseSelect.ItemText className="ds-select__item-text">
                      {option.label}
                    </BaseSelect.ItemText>
                  </BaseSelect.Item>
                ))}
              </BaseSelect.List>
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      </BaseSelect.Root>
    </SelectIconSizeContext.Provider>
  );
}

export { selectVariants };
