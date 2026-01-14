import { memo, useCallback } from "react";

import { Carousel } from "@/src/design";

import {
  LargeCoverCard,
  type LargeCoverCardData,
  LARGE_COVER_CARD_RATIO,
} from "./LargeCoverCard";

type TLargeCoverProps = {
  data: LargeCoverCardData[];
};

const CARD_WIDTH = 235;

export const LargeCover = memo<TLargeCoverProps>(({ data }) => {
  const cardHeight = CARD_WIDTH / LARGE_COVER_CARD_RATIO;

  const renderItem = useCallback(
    ({ item }: { item: LargeCoverCardData }) => (
      <LargeCoverCard data={item} width={CARD_WIDTH} height={cardHeight} />
    ),
    [cardHeight]
  );

  return (
    <Carousel<LargeCoverCardData>
      data={data}
      itemGap="xl"
      offsetX="lg"
      renderItem={renderItem}
    />
  );
});

LargeCover.displayName = "LargeCover";
