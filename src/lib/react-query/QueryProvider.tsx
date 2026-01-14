import { type QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "./queryClient";

type QueryProviderProps = {
  children: React.ReactNode;
  client?: QueryClient;
};

export const QueryProvider = ({ children, client = queryClient }: QueryProviderProps) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
