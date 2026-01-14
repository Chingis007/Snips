import axios, { isAxiosError } from "axios";

import { FEED_SCREEN_URL } from "@/config/app";

export type Title = {
  id: string;
  name_en: string;
  captions_en: string;
  video_playback_url: string;
  poster_url: string;
  link: string;
  rank: number;
};

export type FeedPageData = {
  total: number;
  currentPage: number;
  totalPages: number;
  nextPage: number;
  feedTitles: Title[];
};

export const fetchFeedPage = async () => {
  try {
    const { data }: { data: FeedPageData } = await axios.get(FEED_SCREEN_URL);

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const statusCode = error.response?.status;
      const errorMessage = error.response?.data?.message || error.message;
      throw new Error(
        `Failed to fetch feed page data${
          statusCode ? ` (${statusCode})` : ""
        }: ${errorMessage}`
      );
    }
    throw new Error("An unexpected error occurred while fetching feed page");
  }
};

export function selectFeedData(data: FeedPageData) {
  return data.feedTitles.map((title) => ({
    ...title,
    name: title.name_en,
    captions: title.captions_en,
  }));
}
