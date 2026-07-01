export const getByPath = (obj: unknown, pathSegments: string[]) =>
  pathSegments.reduce<unknown>((current, segment) => {
    if (typeof current !== 'object' || current === null) return undefined;
    return (current as Record<string, unknown>)[segment];
  }, obj);

export const sortNumericKeys = (a: string, b: string) => Number(a) - Number(b);
