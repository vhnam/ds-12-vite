import type { ComponentProps, CSSProperties } from 'react';
import { useContext } from 'react';

import { cn } from '../../lib/utils.ts';
import { BadgeIconSizeContext } from '../badge/index.tsx';
import { BreadcrumbIconSizeContext } from '../breadcrumb/index.tsx';
import { ComboboxIconSizeContext } from '../combobox/index.tsx';
import { DatePickerIconSizeContext } from '../date-picker/index.tsx';
import { InputIconSizeContext } from '../input/index.tsx';
import { ProgressIconSizeContext } from '../progress/index.tsx';
import { SelectIconSizeContext } from '../select/index.tsx';
import { TextareaIconSizeContext } from '../textarea/index.tsx';

type IconVariant = 'outlined' | 'filled';
type IconAlign = 'inline-start' | 'inline-end';

const DEFAULT_ICON_SIZE = 20;

function iconVariationSettings(variant: IconVariant, size: number): CSSProperties['fontVariationSettings'] {
  const fill = variant === 'filled' ? 1 : 0;
  return `"FILL" ${fill}, "wght" 400, "GRAD" 0, "opsz" ${size}`;
}

function useInheritedIconSize(explicitSize?: number): number {
  const badgeIconSize = useContext(BadgeIconSizeContext);
  const breadcrumbIconSize = useContext(BreadcrumbIconSizeContext);
  const comboboxIconSize = useContext(ComboboxIconSizeContext);
  const datePickerIconSize = useContext(DatePickerIconSizeContext);
  const inputIconSize = useContext(InputIconSizeContext);
  const progressIconSize = useContext(ProgressIconSizeContext);
  const selectIconSize = useContext(SelectIconSizeContext);
  const textareaIconSize = useContext(TextareaIconSizeContext);

  return (
    explicitSize ??
    badgeIconSize ??
    breadcrumbIconSize ??
    comboboxIconSize ??
    datePickerIconSize ??
    inputIconSize ??
    progressIconSize ??
    selectIconSize ??
    textareaIconSize ??
    DEFAULT_ICON_SIZE
  );
}

export type IconProps = ComponentProps<'span'> & {
  /** Material Symbols icon name (e.g. `"check_circle"`, `"download"`). */
  name: string;
  /**
   * Visual style — use `"filled"` for active or selected states.
   * @default "outlined"
   */
  variant?: IconVariant;
  /**
   * Nudges the icon flush with adjacent inline text.
   */
  align?: IconAlign;
  /**
   * Icon size in pixels. Inherits from the nearest parent component context when nested inside one.
   * @default 20
   */
  size?: number;
};

/** Material Symbols icon with outlined or filled style and a configurable pixel size. */
function Icon({ name, variant = 'outlined', align, size, className, style, ...props }: IconProps) {
  const resolvedSize = useInheritedIconSize(size);

  return (
    <span
      className={cn('material-symbols-outlined', 'icon', className)}
      data-slot="icon"
      data-align={align}
      style={{
        fontSize: resolvedSize,
        fontVariationSettings: iconVariationSettings(variant, resolvedSize),
        ...style,
      }}
      aria-hidden
      {...props}
    >
      {name}
    </span>
  );
}

export { DEFAULT_ICON_SIZE, Icon, type IconAlign, type IconVariant };
