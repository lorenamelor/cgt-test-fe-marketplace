export const productQueryKeys = {
  all: ['products'] as const,
  list: (search = '') => [...productQueryKeys.all, 'list', search] as const,
  details: () => [...productQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...productQueryKeys.details(), id] as const,
  related: (id: string) => [...productQueryKeys.all, 'related', id] as const,
};
