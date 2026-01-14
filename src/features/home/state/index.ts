import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

import { fetchHomePage, selectHomeData, type HomePageData } from "./api";

export const useHomePageQuery = () => {
  return useQuery({
    queryKey: ["home"],
    queryFn: fetchHomePage,
    select: useCallback((data: HomePageData) => selectHomeData(data), []),
  });
};
