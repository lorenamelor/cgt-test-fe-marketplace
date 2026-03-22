import type { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render as rtlRender, type RenderOptions } from '@testing-library/react';

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
}

type CustomRenderOptions = Omit<RenderOptions, 'wrapper'> & {
  queryClient?: QueryClient;
};

function Providers({ children, queryClient }: { children: ReactNode; queryClient: QueryClient }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export function render(ui: ReactElement, options?: CustomRenderOptions) {
  const queryClient = options?.queryClient ?? createTestQueryClient();

  return rtlRender(ui, {
    ...options,
    wrapper: ({ children }) => <Providers queryClient={queryClient}>{children}</Providers>,
  });
}

export * from '@testing-library/react';
