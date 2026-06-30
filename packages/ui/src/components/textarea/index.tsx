import { cva } from 'class-variance-authority';
import { createContext, type ComponentProps, type ReactNode } from 'react';

import { cn } from '../../lib/utils.ts';
import { Icon } from '../icon/index.tsx';

const TEXTAREA_ICON_SIZES = {
  sm: 20,
  lg: 24,
} as const;

const DEFAULT_LEADING_ICON = 'person';

export const TextareaIconSizeContext = createContext<number | undefined>(undefined);

const textareaVariants = cva('textarea', {
  variants: {
    size: {
      sm: '',
      lg: '',
    },
    variant: {
      default: '',
      suffix: '',
    },
    disabled: {
      true: 'textarea-disabled',
      false: '',
    },
    invalid: {
      true: 'textarea-error',
      false: '',
    },
  },
  compoundVariants: [
    { size: 'sm', variant: 'default', class: 'textarea-preset-sm-default' },
    { size: 'sm', variant: 'suffix', class: 'textarea-preset-sm-suffix' },
    { size: 'lg', variant: 'default', class: 'textarea-preset-lg-default' },
    { size: 'lg', variant: 'suffix', class: 'textarea-preset-lg-suffix' },
  ],
  defaultVariants: {
    size: 'sm',
    variant: 'default',
    disabled: false,
    invalid: false,
  },
});

export type TextareaProps = Omit<ComponentProps<'textarea'>, 'className' | 'size'> & {
  /** Additional CSS class names applied to the textarea wrapper. */
  className?: string;
  /**
   * Visual size of the textarea control.
   * @default "sm"
   */
  size?: 'sm' | 'lg';
  /**
   * Layout variant — use `"suffix"` to show inline text after the value (e.g. character count).
   * @default "default"
   */
  variant?: 'default' | 'suffix';
  /**
   * Marks the field as invalid and sets `aria-invalid`.
   * @default false
   */
  invalid?: boolean;
  /** Custom leading icon element. */
  leadingIcon?: ReactNode;
  /**
   * Renders a leading icon inside the textarea.
   * @default false
   */
  showLeadingIcon?: boolean;
  /** Inline suffix text displayed after the textarea value (requires `variant="suffix"`). */
  suffix?: string;
};

/** Multi-line text field with optional leading icon, character suffix, and error and disabled states. */
export function Textarea({
  className,
  size = 'sm',
  variant = 'default',
  invalid = false,
  disabled,
  leadingIcon,
  showLeadingIcon = false,
  suffix,
  placeholder = 'Input',
  ...props
}: TextareaProps) {
  const resolvedSize = size ?? 'sm';
  const resolvedVariant = variant ?? 'default';
  const isDisabled = Boolean(disabled);
  const isInvalid = Boolean(invalid);
  const iconSize = TEXTAREA_ICON_SIZES[resolvedSize];
  const hasLeading = showLeadingIcon;
  const hasSuffix = resolvedVariant === 'suffix' && suffix !== undefined;

  const resolvedLeading = hasLeading ? (leadingIcon ?? <Icon name={DEFAULT_LEADING_ICON} size={iconSize} />) : null;

  const control = (
    <textarea
      className="textarea-control"
      disabled={isDisabled}
      aria-invalid={isInvalid || undefined}
      placeholder={placeholder}
      {...props}
    />
  );

  return (
    <TextareaIconSizeContext.Provider value={iconSize}>
      <div
        className={cn(
          textareaVariants({
            size: resolvedSize,
            variant: resolvedVariant,
            disabled: isDisabled,
            invalid: isInvalid,
            className,
          }),
        )}
        data-slot="textarea"
        data-variant={resolvedVariant}
      >
        {resolvedLeading ? <span className="textarea-leading">{resolvedLeading}</span> : null}
        {resolvedVariant === 'suffix' ? (
          <div className="textarea-content">
            {control}
            {hasSuffix ? <span className="textarea-suffix">{suffix}</span> : null}
          </div>
        ) : (
          control
        )}
      </div>
    </TextareaIconSizeContext.Provider>
  );
}

export { textareaVariants };
