import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { cva } from "class-variance-authority";
import { createContext, type ReactNode } from "react";

import { cn } from "../../lib/utils.ts";
import { Icon } from "../icon/index.tsx";
import {
  MenuItemCheckbox,
  MenuItemText,
  menuItemVariants,
  type MenuVariant,
} from "../menu/index.tsx";
import "./combobox.css";

const COMBOBOX_ICON_SIZES = {
  sm: 20,
  lg: 24,
} as const;

const COMBOBOX_CHIP_REMOVE_ICON_SIZES = {
  sm: 16,
  lg: 16,
} as const;

const DEFAULT_LEADING_ICON = "person";

export const ComboboxIconSizeContext = createContext<number | undefined>(undefined);

const comboboxVariants = cva("ds-combobox", {
  variants: {
    size: {
      sm: "ds-combobox--sm",
      lg: "ds-combobox--lg",
    },
    disabled: {
      true: "ds-combobox--disabled",
      false: null,
    },
    invalid: {
      true: "ds-combobox--error",
      false: null,
    },
  },
  defaultVariants: {
    size: "sm",
    disabled: false,
    invalid: false,
  },
});

export type ComboboxOption = {
  /** Visible label for the option. */
  label: string;
  /** Unique value submitted with the form. */
  value: string;
  /** Prevents selecting this option. */
  disabled?: boolean;
};

type ComboboxSharedProps = {
  className?: string;
  size?: "sm" | "lg";
  invalid?: boolean;
  disabled?: boolean;
  placeholder?: string;
  options: readonly ComboboxOption[];
  leadingIcon?: ReactNode;
  showLeadingIcon?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  id?: string;
  name?: string;
  required?: boolean;
  "aria-describedby"?: string;
  "aria-label"?: string;
  inputValue?: string;
  defaultInputValue?: string;
  onInputValueChange?: (value: string) => void;
};

export type ComboboxProps = ComboboxSharedProps & {
  /**
   * Allows selecting multiple options.
   * @default false
   */
  multiple?: boolean;
  /** Controlled selected value or values. */
  value?: string | string[] | null;
  /** Initial selected value or values for uncontrolled usage. */
  defaultValue?: string | string[] | null;
  /** Called when the selected value or values change. */
  onValueChange?: (value: string | string[] | null) => void;
};

function getOptionLabel(options: readonly ComboboxOption[], value: string): string {
  return options.find((option) => option.value === value)?.label ?? value;
}

function ComboboxTrailingIcons({ iconSize }: { iconSize: number }) {
  return (
    <>
      <BaseCombobox.Clear
        className="ds-combobox__clear"
        aria-label="Clear search"
        render={(props) => (
          <button {...props} type="button" className={cn("ds-combobox__clear", props.className)}>
            <Icon name="backspace" size={iconSize} />
          </button>
        )}
      />
      <BaseCombobox.Icon
        className="ds-combobox__trailing"
        render={(props) => (
          <span {...props} className={cn("ds-combobox__trailing", props.className)}>
            <Icon name="search" size={iconSize} />
          </span>
        )}
      />
    </>
  );
}

function ComboboxListItems({
  options,
  variant,
}: {
  options: readonly ComboboxOption[];
  variant: MenuVariant;
}) {
  const itemClassName = menuItemVariants({ variant });

  return (
    <BaseCombobox.List className="ds-menu__list">
      {options.map((option) => (
        <BaseCombobox.Item
          key={option.value}
          value={option.value}
          disabled={option.disabled}
          className={itemClassName}
        >
          <MenuItemText>{option.label}</MenuItemText>
          {variant === "multiple" ? (
            <MenuItemCheckbox>
              <BaseCombobox.ItemIndicator className="ds-menu__item-checkbox-indicator">
                <Icon name="check" size={12} />
              </BaseCombobox.ItemIndicator>
            </MenuItemCheckbox>
          ) : null}
        </BaseCombobox.Item>
      ))}
    </BaseCombobox.List>
  );
}

function ComboboxPopup({
  options,
  variant,
}: {
  options: readonly ComboboxOption[];
  variant: MenuVariant;
}) {
  return (
    <BaseCombobox.Portal>
      <BaseCombobox.Positioner className="ds-combobox__positioner" sideOffset={4} align="start">
        <BaseCombobox.Popup className="ds-combobox__popup">
          <ComboboxListItems options={options} variant={variant} />
        </BaseCombobox.Popup>
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  );
}

type ResolvedComboboxProps = {
  className?: string;
  size: "sm" | "lg";
  invalid: boolean;
  disabled: boolean;
  placeholder: string;
  options: readonly ComboboxOption[];
  leadingIcon?: ReactNode;
  showLeadingIcon: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  id?: string;
  name?: string;
  required?: boolean;
  ariaDescribedBy?: string;
  ariaLabel?: string;
  inputValue?: string;
  defaultInputValue?: string;
  onInputValueChange?: (value: string) => void;
};

function useResolvedComboboxProps(
  props: ComboboxSharedProps & { placeholder?: string; showLeadingIcon?: boolean },
): ResolvedComboboxProps & {
  iconSize: number;
  chipRemoveIconSize: number;
  resolvedLeading: ReactNode;
} {
  const resolvedSize = props.size ?? "sm";
  const isDisabled = Boolean(props.disabled);
  const isInvalid = Boolean(props.invalid);
  const iconSize = COMBOBOX_ICON_SIZES[resolvedSize];
  const chipRemoveIconSize = COMBOBOX_CHIP_REMOVE_ICON_SIZES[resolvedSize];
  const hasLeading = props.showLeadingIcon ?? false;
  const resolvedLeading = hasLeading
    ? (props.leadingIcon ?? <Icon name={DEFAULT_LEADING_ICON} size={iconSize} />)
    : null;

  return {
    className: props.className,
    size: resolvedSize,
    invalid: isInvalid,
    disabled: isDisabled,
    placeholder: props.placeholder ?? "Type to search",
    options: props.options,
    leadingIcon: props.leadingIcon,
    showLeadingIcon: hasLeading,
    defaultOpen: props.defaultOpen,
    open: props.open,
    onOpenChange: props.onOpenChange,
    id: props.id,
    name: props.name,
    required: props.required,
    ariaDescribedBy: props["aria-describedby"],
    ariaLabel: props["aria-label"],
    inputValue: props.inputValue,
    defaultInputValue: props.defaultInputValue,
    onInputValueChange: props.onInputValueChange,
    iconSize,
    chipRemoveIconSize,
    resolvedLeading,
  };
}

function SingleCombobox({
  value,
  defaultValue,
  onValueChange,
  ...sharedProps
}: ComboboxSharedProps & {
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
}) {
  const resolved = useResolvedComboboxProps(sharedProps);
  const wrapperClassName = cn(
    comboboxVariants({
      size: resolved.size,
      disabled: resolved.disabled,
      invalid: resolved.invalid,
      className: resolved.className,
    }),
  );

  return (
    <ComboboxIconSizeContext.Provider value={resolved.iconSize}>
      <BaseCombobox.Root
        items={resolved.options}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={resolved.disabled}
        modal={false}
        defaultOpen={resolved.defaultOpen}
        open={resolved.open}
        onOpenChange={resolved.onOpenChange}
        name={resolved.name}
        required={resolved.required}
        inputValue={resolved.inputValue}
        defaultInputValue={resolved.defaultInputValue}
        onInputValueChange={resolved.onInputValueChange}
      >
        <div className={wrapperClassName}>
          <BaseCombobox.InputGroup className="ds-combobox__input-group">
            {resolved.resolvedLeading ? (
              <span className="ds-combobox__leading">{resolved.resolvedLeading}</span>
            ) : null}
            <BaseCombobox.Input
              id={resolved.id}
              className="ds-combobox__input"
              disabled={resolved.disabled}
              aria-invalid={resolved.invalid || undefined}
              aria-describedby={resolved.ariaDescribedBy}
              aria-label={resolved.ariaLabel}
              placeholder={resolved.placeholder}
            />
            <ComboboxTrailingIcons iconSize={resolved.iconSize} />
          </BaseCombobox.InputGroup>
        </div>
        <ComboboxPopup options={resolved.options} variant="single" />
      </BaseCombobox.Root>
    </ComboboxIconSizeContext.Provider>
  );
}

function MultipleCombobox({
  value,
  defaultValue,
  onValueChange,
  ...sharedProps
}: ComboboxSharedProps & {
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}) {
  const resolved = useResolvedComboboxProps(sharedProps);
  const wrapperClassName = cn(
    comboboxVariants({
      size: resolved.size,
      disabled: resolved.disabled,
      invalid: resolved.invalid,
      className: resolved.className,
    }),
  );

  return (
    <ComboboxIconSizeContext.Provider value={resolved.iconSize}>
      <BaseCombobox.Root
        items={resolved.options}
        multiple
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={resolved.disabled}
        modal={false}
        defaultOpen={resolved.defaultOpen}
        open={resolved.open}
        onOpenChange={resolved.onOpenChange}
        name={resolved.name}
        required={resolved.required}
        inputValue={resolved.inputValue}
        defaultInputValue={resolved.defaultInputValue}
        onInputValueChange={resolved.onInputValueChange}
      >
        <div className={wrapperClassName}>
          <BaseCombobox.InputGroup className="ds-combobox__input-group">
            {resolved.resolvedLeading ? (
              <span className="ds-combobox__leading">{resolved.resolvedLeading}</span>
            ) : null}
            <BaseCombobox.Chips className="ds-combobox__chips">
              <BaseCombobox.Value>
                {(selectedValue: string[]) => (
                  <>
                    {selectedValue.map((selected) => (
                      <BaseCombobox.Chip key={selected} className="ds-combobox__chip">
                        <span className="ds-combobox__chip-label">
                          {getOptionLabel(resolved.options, selected)}
                        </span>
                        <BaseCombobox.ChipRemove
                          className="ds-combobox__chip-remove"
                          aria-label={`Remove ${getOptionLabel(resolved.options, selected)}`}
                        >
                          <Icon name="close" size={resolved.chipRemoveIconSize} />
                        </BaseCombobox.ChipRemove>
                      </BaseCombobox.Chip>
                    ))}
                    <BaseCombobox.Input
                      id={resolved.id}
                      className="ds-combobox__input"
                      disabled={resolved.disabled}
                      aria-invalid={resolved.invalid || undefined}
                      aria-describedby={resolved.ariaDescribedBy}
                      aria-label={resolved.ariaLabel}
                      placeholder={selectedValue.length === 0 ? resolved.placeholder : undefined}
                    />
                  </>
                )}
              </BaseCombobox.Value>
            </BaseCombobox.Chips>
            <ComboboxTrailingIcons iconSize={resolved.iconSize} />
          </BaseCombobox.InputGroup>
        </div>
        <ComboboxPopup options={resolved.options} variant="multiple" />
      </BaseCombobox.Root>
    </ComboboxIconSizeContext.Provider>
  );
}

/** Filterable text input with a dropdown list, optional leading icon, multi-select chips, and error and disabled states. */
export function Combobox({
  multiple = false,
  value,
  defaultValue,
  onValueChange,
  ...sharedProps
}: ComboboxProps) {
  if (multiple) {
    const multipleValue = Array.isArray(value) ? value : value ? [value] : undefined;
    const multipleDefaultValue = Array.isArray(defaultValue)
      ? defaultValue
      : defaultValue
        ? [defaultValue]
        : undefined;

    return (
      <MultipleCombobox
        {...sharedProps}
        value={multipleValue}
        defaultValue={multipleDefaultValue}
        onValueChange={onValueChange ? (nextValue) => onValueChange(nextValue) : undefined}
      />
    );
  }

  return (
    <SingleCombobox
      {...sharedProps}
      value={Array.isArray(value) ? (value[0] ?? null) : value}
      defaultValue={Array.isArray(defaultValue) ? (defaultValue[0] ?? null) : defaultValue}
      onValueChange={onValueChange ? (nextValue) => onValueChange(nextValue) : undefined}
    />
  );
}

export { comboboxVariants };
