/** Shared argTypes documentation for Storybook Controls tables. */

export function selectArgType<T extends string>(options: readonly (T | undefined)[], description: string) {
  return {
    control: 'select' as const,
    options: [...options],
    description,
  };
}

export function booleanArgType(description: string) {
  return {
    control: 'boolean' as const,
    description,
  };
}

export function textArgType(description: string) {
  return {
    control: 'text' as const,
    description,
  };
}

export function numberArgType(description: string, min?: number) {
  return {
    control: { type: 'number' as const, ...(min !== undefined ? { min } : {}) },
    description,
  };
}

export const hiddenArgType = { control: false as const };
