export interface PageOptions {
  limit?: number;
  offset?: number;
}

export function normalizePage(options: PageOptions = {}): Required<PageOptions> {
  return {
    limit: Math.min(Math.max(Number(options.limit ?? 50), 1), 200),
    offset: Math.max(Number(options.offset ?? 0), 0),
  };
}
