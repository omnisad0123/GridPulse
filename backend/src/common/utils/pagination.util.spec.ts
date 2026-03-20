import { normalizePage, paginate } from './pagination.util';

describe('pagination.util', () => {
  it('normalizes defaults', () => {
    expect(normalizePage()).toEqual({ limit: 50, offset: 0 });
  });

  it('normalizes page and limit into offsets', () => {
    expect(normalizePage({ page: 3, limit: 10 } as any)).toEqual({ limit: 10, offset: 20 });
  });

  it('clamps invalid limits and offsets', () => {
    expect(normalizePage({ limit: 999, offset: -5 })).toEqual({ limit: 200, offset: 0 });
  });

  it('paginates arrays with total metadata', () => {
    const result = paginate([1, 2, 3, 4, 5], { page: 2, limit: 2 });
    expect(result).toEqual({ total: 5, page: 2, limit: 2, totalPages: 3, data: [3, 4] });
  });

  it('returns an empty page with at least one total page', () => {
    const result = paginate([], { page: 1, limit: 10 });
    expect(result.total).toBe(0);
    expect(result.totalPages).toBe(1);
    expect(result.data).toEqual([]);
  });
});
