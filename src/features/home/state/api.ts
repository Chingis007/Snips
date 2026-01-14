import axios, { isAxiosError } from "axios";

import { HOME_SCREEN_URL } from "@/config/app";

export type Title = {
  id: string;
  nameEn: string;
  tags: string[];
  posterUrl: string;
  heroCoverUrl?: string;
  videoPlaybackUrl?: string;
  thumbnailUrl?: string;
  duration: number;
  releaseDate: string;
  genres: string[];
  snipsCount: number;
  badges: string[];
};

type ComponentType = "LARGE_COVERS" | "REGULAR_COVERS" | "MORE_TITLES";

export type Component = {
  id: string;
  componentType: ComponentType;
  sectionTitle: string;
  titles: Title[];
  link?: string;
};

export type HomePageData = {
  userUuid: string;
  country: string;
  data: {
    components: Component[];
  };
};

export const fetchHomePage = async () => {
  try {
    const { data }: { data: HomePageData } = await axios.get(HOME_SCREEN_URL);

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const statusCode = error.response?.status;
      const errorMessage = error.response?.data?.message || error.message;
      throw new Error(
        `Failed to fetch home page data${
          statusCode ? ` (${statusCode})` : ""
        }: ${errorMessage}`
      );
    }
    throw new Error("An unexpected error occurred while fetching home page");
  }
};

/**
 * Transform titles for LargeCover cards
 * Picks: id, posterUrl, name, number
 */
function selectLargeCoverTitles(titles: Title[], startFrom: number = 1) {
  return titles.map((title, index) => ({
    id: title.id,
    posterUrl: title.posterUrl,
    name: title.nameEn,
    number: (startFrom + index).toString(),
  }));
}

/**
 * Transform titles for RegularCover cards
 * Picks: id, posterUrl, genres, snipsCount, name
 */
function selectRegularCoverTitles(titles: Title[]) {
  return titles.map((title) => ({
    id: title.id,
    posterUrl: title.posterUrl,
    genres: title.genres,
    snipsCount: title.snipsCount,
    name: title.nameEn,
  }));
}

/**
 * Transform titles for MoreTitles cards
 * Picks: id, posterUrl, snipsCount
 */
function selectMoreTitles(titles: Title[]) {
  return titles.map((title) => ({
    id: title.id,
    posterUrl: title.posterUrl,
    snipsCount: title.snipsCount,
  }));
}

export function selectHomeData(data: HomePageData) {
  const components = data.data.components;

  const topTen = components.find(
    (c) => c.componentType === "LARGE_COVERS" && c.sectionTitle === "Top 10"
  );
  const drama = components.find(
    (c) => c.componentType === "REGULAR_COVERS" && c.sectionTitle === "Drama"
  );
  const romance = components.find(
    (c) => c.componentType === "REGULAR_COVERS" && c.sectionTitle === "Romance"
  );
  const romantic = components.find(
    (c) => c.componentType === "REGULAR_COVERS" && c.sectionTitle === "Romantic"
  );
  const more = components.find(
    (c) => c.componentType === "MORE_TITLES" && c.sectionTitle === "More"
  );

  return {
    topTen: {
      sectionTitle: topTen?.sectionTitle || "",
      titles: selectLargeCoverTitles(topTen?.titles || [], 1),
    },
    drama: {
      sectionTitle: drama?.sectionTitle || "",
      titles: selectRegularCoverTitles(drama?.titles || []),
    },
    romance: {
      sectionTitle: romance?.sectionTitle || "",
      titles: selectRegularCoverTitles(romance?.titles || []),
    },
    romantic: {
      sectionTitle: romantic?.sectionTitle || "",
      titles: selectRegularCoverTitles(romantic?.titles || []),
    },
    more: {
      sectionTitle: more?.sectionTitle || "",
      titles: selectMoreTitles(more?.titles || []),
    },
  };
}
