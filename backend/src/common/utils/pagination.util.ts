export interface PageOptions {
  limit?: number;
  offset?: number;
}

export function normalizePage(options: PageOptions = {}): Required<PageOptions> {
  const page = Math.max(Number((options as any).page ?? 1), 1);
  const limit = Math.min(Math.max(Number(options.limit ?? 50), 1), 200);
  return {
    limit,
    offset: Math.max(Number(options.offset ?? (page - 1) * limit), 0),
  };
}

export function paginate<T>(items: T[], options: PageOptions & { page?: number } = {}) {
  const page = Math.max(Number(options.page ?? 1), 1);
  const limit = Math.min(Math.max(Number(options.limit ?? 25), 1), 100);
  const offset = (page - 1) * limit;
  const total = items.length;
  return {
    total,
    page,
    limit,
    totalPages: Math.max(Math.ceil(total / limit), 1),
    data: items.slice(offset, offset + limit),
  };
}
