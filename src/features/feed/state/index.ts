import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

import { fetchFeedPage, selectFeedData, type FeedPageData } from "./api";

export const useFeedPageQuery = () => {
  return useQuery({
    queryKey: ["feed"],
    queryFn: fetchFeedPage,
    select: useCallback((data: FeedPageData) => selectFeedData(data), []),
  });
};
