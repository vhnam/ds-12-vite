import { Avatar as BaseAvatar } from '@base-ui/react/avatar';
import { cva } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';

import { cn } from '../../lib/utils.ts';
import { Icon } from '../icon/index.tsx';

const AVATAR_ICON_SIZES = {
  sm: 14,
  md: 16,
  lg: 20,
} as const;

const DEFAULT_ICONS = {
  circle: 'person',
  square: 'apartment',
} as const;

type AvatarSize = 'sm' | 'md' | 'lg';
type AvatarShape = 'circle' | 'square';
type AvatarVariant = 'initial' | 'image' | 'icon';

const avatarVariants = cva('avatar', {
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
    },
    shape: {
      circle: '',
      square: '',
    },
    variant: {
      initial: '',
      image: '',
      icon: '',
    },
  },
  compoundVariants: [
    { size: 'sm', class: 'avatar-preset-size-sm' },
    { size: 'md', class: 'avatar-preset-size-md' },
    { size: 'lg', class: 'avatar-preset-size-lg' },
    { shape: 'circle', class: 'avatar-circle' },
    { shape: 'square', class: 'avatar-square' },
    { variant: 'image', shape: 'circle', class: 'avatar-image-circle' },
    { variant: 'image', shape: 'square', class: 'avatar-image-square' },
  ],
  defaultVariants: {
    size: 'md',
    shape: 'circle',
    variant: 'initial',
  },
});

const avatarIconVariants = cva('avatar-icon', {
  variants: {
    size: {
      sm: 'avatar-preset-icon-sm',
      md: 'avatar-preset-icon-md',
      lg: 'avatar-preset-icon-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type AvatarProps = Omit<ComponentProps<typeof BaseAvatar.Root>, 'className'> & {
  /** Additional CSS class names applied to the root element. */
  className?: string;
  /**
   * Avatar dimensions — `sm` for compact layouts (e.g. table rows),
   * `lg` for profile headers.
   * @default "md"
   */
  size?: AvatarSize;
  /**
   * `circle` for round avatars; `square` for rounded-square avatars.
   * @default "circle"
   */
  shape?: AvatarShape;
  /**
   * Content type — `initial` for initials, `image` for a photo with fallback,
   * `icon` for a generic placeholder.
   * @default "initial"
   */
  variant?: AvatarVariant;
  /**
   * One or two characters displayed when `variant` is `"initial"` or as an image fallback.
   * Ignored when `variant` is `"icon"`.
   */
  initials?: string;
  /**
   * Image URL used when `variant` is `"image"`.
   */
  src?: string;
  /**
   * Accessible alternative text for the profile image when `variant` is `"image"`.
   */
  alt?: string;
  /**
   * Accessible name for the avatar. Defaults from `initials`, `alt`, or a generic label.
   */
  'aria-label'?: string;
  /**
   * Custom icon element used when `variant` is `"icon"` or as an image fallback
   * when no initials are provided.
   */
  icon?: ReactNode;
};

function AvatarInitials({ children }: { children: string }) {
  return <span className="avatar-initials">{children}</span>;
}

function AvatarIconContent({ shape, size, icon }: { shape: AvatarShape; size: AvatarSize; icon?: ReactNode }) {
  const iconSize = AVATAR_ICON_SIZES[size];

  return (
    <span className={avatarIconVariants({ size })}>{icon ?? <Icon name={DEFAULT_ICONS[shape]} size={iconSize} />}</span>
  );
}

function getAvatarAriaProps(
  resolvedVariant: AvatarVariant,
  accessibleLabel: string | undefined,
  src?: string,
  alt?: string,
): { role?: 'img'; 'aria-label'?: string } {
  if (resolvedVariant === 'image' && src && alt) {
    return {};
  }

  if (!accessibleLabel) {
    return {};
  }

  return {
    role: 'img',
    'aria-label': accessibleLabel,
  };
}

/** Displays a profile image with initials, photo, or fallback icon. Available in circle and square shapes with small, medium, and large sizes. */
export function Avatar({
  className,
  size = 'md',
  shape = 'circle',
  variant = 'initial',
  initials,
  src,
  alt = '',
  icon,
  'aria-label': ariaLabel,
  ...props
}: AvatarProps) {
  const resolvedSize = size ?? 'md';
  const resolvedShape = shape ?? 'circle';
  const resolvedVariant = variant ?? 'initial';
  const avatarClassName = cn(avatarVariants({ size, shape, variant, className }));
  const accessibleLabel = ariaLabel ?? (initials ? initials : resolvedVariant === 'image' && alt ? alt : 'User avatar');
  const avatarAriaProps = getAvatarAriaProps(resolvedVariant, accessibleLabel, src, alt);

  if (resolvedVariant === 'image') {
    return (
      <BaseAvatar.Root
        className={avatarClassName}
        data-slot="avatar"
        data-variant={resolvedVariant}
        {...avatarAriaProps}
        {...props}
      >
        {src ? <BaseAvatar.Image className="avatar-image" src={src} alt={alt} /> : null}
        <BaseAvatar.Fallback className="avatar-fallback" delay={0}>
          {initials ? (
            <AvatarInitials>{initials}</AvatarInitials>
          ) : (
            <AvatarIconContent shape={resolvedShape} size={resolvedSize} icon={icon} />
          )}
        </BaseAvatar.Fallback>
      </BaseAvatar.Root>
    );
  }

  return (
    <BaseAvatar.Root
      className={avatarClassName}
      data-slot="avatar"
      data-variant={resolvedVariant}
      {...avatarAriaProps}
      {...props}
    >
      {resolvedVariant === 'initial' ? (
        initials ? (
          <AvatarInitials>{initials}</AvatarInitials>
        ) : (
          <AvatarIconContent shape={resolvedShape} size={resolvedSize} icon={icon} />
        )
      ) : (
        <AvatarIconContent shape={resolvedShape} size={resolvedSize} icon={icon} />
      )}
    </BaseAvatar.Root>
  );
}

export { avatarVariants, type AvatarShape, type AvatarSize, type AvatarVariant };
