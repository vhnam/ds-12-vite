export type PaginationItem = { type: "page"; page: number } | { type: "ellipsis" };

export function getPaginationItems(currentPage: number, totalPages: number): PaginationItem[] {
  if (totalPages <= 0) {
    return [];
  }

  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => ({
      type: "page" as const,
      page: index + 1,
    }));
  }

  if (currentPage <= 4) {
    return [
      ...Array.from({ length: 5 }, (_, index) => ({
        type: "page" as const,
        page: index + 1,
      })),
      { type: "ellipsis" as const },
      { type: "page" as const, page: totalPages },
    ];
  }

  if (currentPage >= totalPages - 3) {
    return [
      { type: "page" as const, page: 1 },
      { type: "ellipsis" as const },
      ...Array.from({ length: 5 }, (_, index) => ({
        type: "page" as const,
        page: totalPages - 4 + index,
      })),
    ];
  }

  return [
    { type: "page" as const, page: 1 },
    { type: "ellipsis" as const },
    { type: "page" as const, page: currentPage - 1 },
    { type: "page" as const, page: currentPage },
    { type: "page" as const, page: currentPage + 1 },
    { type: "ellipsis" as const },
    { type: "page" as const, page: totalPages },
  ];
}
