import type { ReactNode } from 'react';

import { Icon } from '@ds-12/ui/icon';
import { MenuItemCheckbox, MenuItemText, menuItemVariants, type MenuVariant } from '@ds-12/ui/menu';

import { StoryCaption } from '../../lib/story-presentation.tsx';

export const VARIANTS = ['single', 'multiple'] as const;

export const DEFAULT_MENU_OPTIONS = [
  { value: 'item-1', label: 'Item One' },
  { value: 'item-2', label: 'Item Two' },
  { value: 'item-3', label: 'Item Three' },
  { value: 'item-4', label: 'Item Four' },
] as const;

const listStyle = {
  width: 343,
} as const;

const showcaseStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
} as const;

type MenuOption = (typeof DEFAULT_MENU_OPTIONS)[number];

type MenuItemRowProps = {
  label: string;
  variant: MenuVariant;
  selected?: boolean;
  disabled?: boolean;
  highlighted?: boolean;
};

function MenuItemRow({ label, variant, selected = false, disabled = false, highlighted = false }: MenuItemRowProps) {
  return (
    <div
      role="option"
      aria-selected={selected}
      aria-disabled={disabled || undefined}
      className={menuItemVariants({ variant })}
      data-slot="menu-item"
      data-selected={selected ? '' : undefined}
      data-disabled={disabled ? '' : undefined}
      data-highlighted={highlighted ? '' : undefined}
    >
      <MenuItemText>{label}</MenuItemText>
      {variant === 'multiple' ? (
        <MenuItemCheckbox>
          {selected ? (
            <span className="menu-item-checkbox-indicator">
              <Icon name="check" size={12} />
            </span>
          ) : null}
        </MenuItemCheckbox>
      ) : null}
    </div>
  );
}

function MenuList({ 'aria-label': ariaLabel = 'Menu', children }: { 'aria-label'?: string; children: ReactNode }) {
  return (
    <div role="listbox" aria-label={ariaLabel} className="menu-list" data-slot="menu-list" style={listStyle}>
      {children}
    </div>
  );
}

/** Args accepted by the Storybook wrapper for Controls. */
export type MenuItemStoryArgs = {
  variant?: MenuVariant;
  label?: string;
  selected?: boolean;
  disabled?: boolean;
  highlighted?: boolean;
};

export function MenuItemStory({
  variant = 'single',
  label = 'Item One',
  selected = false,
  disabled = false,
  highlighted = false,
}: MenuItemStoryArgs) {
  return (
    <MenuList>
      <MenuItemRow label={label} variant={variant} selected={selected} disabled={disabled} highlighted={highlighted} />
    </MenuList>
  );
}

function MenuListDemo({
  variant,
  options = DEFAULT_MENU_OPTIONS,
  selectedValue,
  disabledValue,
  highlightedValue,
}: {
  variant: MenuVariant;
  options?: readonly MenuOption[];
  selectedValue?: string;
  disabledValue?: string;
  highlightedValue?: string;
}) {
  return (
    <MenuList>
      {options.map((option) => (
        <MenuItemRow
          key={option.value}
          label={option.label}
          variant={variant}
          selected={option.value === selectedValue}
          disabled={option.value === disabledValue}
          highlighted={option.value === highlightedValue}
        />
      ))}
    </MenuList>
  );
}

export function MenuStatesShowcase({ variant }: { variant: MenuVariant }) {
  return (
    <div style={showcaseStyle}>
      <div>
        <StoryCaption>default</StoryCaption>
        <MenuListDemo variant={variant} />
      </div>
      <div>
        <StoryCaption>selected</StoryCaption>
        <MenuListDemo variant={variant} selectedValue="item-2" />
      </div>
      <div>
        <StoryCaption>disabled</StoryCaption>
        <MenuListDemo variant={variant} disabledValue="item-3" />
      </div>
      <div>
        <StoryCaption>highlighted</StoryCaption>
        <MenuListDemo variant={variant} highlightedValue="item-1" />
      </div>
    </div>
  );
}

export function MenuVariantsShowcase() {
  return (
    <div style={showcaseStyle}>
      <div>
        <StoryCaption>single</StoryCaption>
        <MenuListDemo variant="single" selectedValue="item-2" disabledValue="item-4" />
      </div>
      <div>
        <StoryCaption>multiple</StoryCaption>
        <MenuListDemo variant="multiple" selectedValue="item-2" disabledValue="item-4" />
      </div>
    </div>
  );
}
