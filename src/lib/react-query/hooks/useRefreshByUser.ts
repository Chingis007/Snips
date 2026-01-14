import { useCallback, useState } from "react";

/**
 * Custom hook to handle user-initiated refresh actions.
 *
 * When the user swipes content down, the native component will start refreshing,
 * and the loader will show up. Therefore, we need to have a loading state to keep it in sync.
 * React Query hooks like `useQuery` and `useInfiniteQuery` do not trigger the `isRefetching`
 * state update instantly, which breaks synchronization with the refreshing state of the native component.
 * This hook ensures the refreshing state stays in sync with the native component.
 *
 * @see {@link https://github.com/TanStack/query/issues/2380} for the related issue.
 * @see {@link https://github.com/TanStack/query/blob/main/examples/react/react-native/src/hooks/useRefreshByUser.ts} for the official example.
 */
export function useRefreshByUser<T>(refetch: () => Promise<T>) {
  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  return { refreshing, handleRefresh };
}
