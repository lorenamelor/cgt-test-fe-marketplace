export const productQueryKeys = {
  all: ['products'] as const,
  list: (search = '', tag = '') => [...productQueryKeys.all, 'list', search, tag] as const,
  details: () => [...productQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...productQueryKeys.details(), id] as const,
  related: (id: string) => [...productQueryKeys.all, 'related', id] as const,
};
