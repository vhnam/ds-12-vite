import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";

import "@ds-12/design-tokens/tokens.css";
import { cn } from "../../lib/utils.ts";
import { Icon } from "../icon/index.tsx";
import "./avatar.css";

const AVATAR_ICON_SIZES = {
  sm: 14,
  md: 16,
  lg: 20,
} as const;

const DEFAULT_ICONS = {
  user: "person",
  organisation: "apartment",
} as const;

const avatarVariants = cva("ds-avatar", {
  variants: {
    size: {
      sm: "ds-avatar--sm",
      md: "ds-avatar--md",
      lg: "ds-avatar--lg",
    },
    shape: {
      user: "ds-avatar--user",
      organisation: "ds-avatar--organisation",
    },
    variant: {
      initial: "ds-avatar--initial",
      image: "ds-avatar--image",
      icon: "ds-avatar--icon",
    },
  },
  defaultVariants: {
    size: "md",
    shape: "user",
    variant: "initial",
  },
});

export type AvatarProps = Omit<ComponentProps<typeof BaseAvatar.Root>, "className"> &
  VariantProps<typeof avatarVariants> & {
    className?: string;
    initials?: string;
    src?: string;
    alt?: string;
    icon?: ReactNode;
  };

function AvatarInitials({ children }: { children: string }) {
  return <span className="ds-avatar__initials">{children}</span>;
}

function AvatarIconContent({
  shape,
  size,
  icon,
}: {
  shape: NonNullable<AvatarProps["shape"]>;
  size: NonNullable<AvatarProps["size"]>;
  icon?: ReactNode;
}) {
  const iconSize = AVATAR_ICON_SIZES[size];

  return (
    <span className="ds-avatar__icon">
      {icon ?? <Icon name={DEFAULT_ICONS[shape]} size={iconSize} />}
    </span>
  );
}

export function Avatar({
  className,
  size = "md",
  shape = "user",
  variant = "initial",
  initials,
  src,
  alt = "",
  icon,
  ...props
}: AvatarProps) {
  const resolvedSize = size ?? "md";
  const resolvedShape = shape ?? "user";
  const resolvedVariant = variant ?? "initial";
  const avatarClassName = cn(avatarVariants({ size, shape, variant, className }));

  if (resolvedVariant === "image") {
    return (
      <BaseAvatar.Root className={avatarClassName} {...props}>
        {src ? <BaseAvatar.Image className="ds-avatar__image" src={src} alt={alt} /> : null}
        <BaseAvatar.Fallback className="ds-avatar__fallback" delay={0}>
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
    <BaseAvatar.Root className={avatarClassName} {...props}>
      {resolvedVariant === "initial" ? (
        <AvatarInitials>{initials ?? ""}</AvatarInitials>
      ) : (
        <AvatarIconContent shape={resolvedShape} size={resolvedSize} icon={icon} />
      )}
    </BaseAvatar.Root>
  );
}

export { avatarVariants };
