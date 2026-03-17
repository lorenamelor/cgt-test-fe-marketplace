export const productQueryKeys = {
  all: ['products'] as const,
  list: () => [...productQueryKeys.all, 'list'] as const,
  details: () => [...productQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...productQueryKeys.details(), id] as const,
};
