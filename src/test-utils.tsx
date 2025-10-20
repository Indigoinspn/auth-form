import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

export const renderWithQueryClient = (ui: ReactNode) => {
  const testQueryClient = createTestQueryClient();
  return {
    ...render(<QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>),
    queryClient: testQueryClient,
  };
};
