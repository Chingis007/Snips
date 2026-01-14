import { type QueryClientConfig, QueryClient } from "@tanstack/react-query";

// Overrides to the default react-query options.
const DEFAULT_QUERY_CLIENT_CONFIG: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: true,
    },
  },
};

export const queryClient = new QueryClient(DEFAULT_QUERY_CLIENT_CONFIG);
