import type { ComponentProps, CSSProperties } from 'react';
import { useContext } from 'react';

import { cn } from '../../lib/utils.ts';
import { BadgeIconSizeContext } from '../badge/index.tsx';

type IconVariant = 'outlined' | 'filled';
type IconAlign = 'inline-start' | 'inline-end';

const DEFAULT_ICON_SIZE = 20;

function iconVariationSettings(variant: IconVariant, size: number): CSSProperties['fontVariationSettings'] {
  const fill = variant === 'filled' ? 1 : 0;
  return `"FILL" ${fill}, "wght" 400, "GRAD" 0, "opsz" ${size}`;
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
   * Icon size in pixels. Inherits from parent Badge when nested inside one.
   * @default 20
   */
  size?: number;
};

/** Material Symbols icon with outlined or filled style and a configurable pixel size. */
function Icon({ name, variant = 'outlined', align, size, className, style, ...props }: IconProps) {
  const badgeIconSize = useContext(BadgeIconSizeContext);
  const resolvedSize = size ?? badgeIconSize ?? DEFAULT_ICON_SIZE;

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
