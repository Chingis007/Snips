import { noop } from "@tanstack/react-query";
import { memo, useCallback } from "react";

import { Carousel, CarouselSection } from "@/src/design";

import {
  RegularCoverCard,
  type RegularCoverCardData,
  REGULAR_COVER_CARD_RATIO,
} from "./RegularCoverCard";

interface RegularCoverProps {
  data: {
    sectionTitle: string;
    titles: RegularCoverCardData[];
  };
  /**
   * Whether to show genres tags
   * */
  showGenres?: boolean;
}

const CARD_WIDTH = 160;

export const RegularCover = memo<RegularCoverProps>(({ data, showGenres }) => {
  const cardHeight = CARD_WIDTH / REGULAR_COVER_CARD_RATIO;

  const renderItem = useCallback(
    ({ item }: { item: RegularCoverCardData }) => (
      <RegularCoverCard
        data={item}
        width={CARD_WIDTH}
        height={cardHeight}
        showGenres={showGenres}
      />
    ),
    [cardHeight, showGenres]
  );

  return (
    <CarouselSection title={data.sectionTitle} onCTAPress={noop} offsetX={20}>
      <Carousel<RegularCoverCardData>
        data={data.titles}
        itemGap="xl"
        offsetX="lg"
        renderItem={renderItem}
      />
    </CarouselSection>
  );
});

RegularCover.displayName = "RegularCover";
