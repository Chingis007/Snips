import { noop } from "@tanstack/react-query";
import { memo, useCallback, useMemo } from "react";
import { useWindowDimensions } from "react-native";

import { Carousel, CarouselSection, createUseStyles } from "@/src/design";

import { ExploreMoreCard } from "./ExploreMoreCard";
import {
  MoreTitlesCard,
  type MoreTitlesCardData,
  MORE_TITLES_CARD_RATIO,
} from "./MoreTitlesCard";

type MoreTitlesProps = {
  data: {
    sectionTitle: string;
    titles: MoreTitlesCardData[];
  };
};

const HORIZONTAL_OFFSET = 20;
const GAP = 8;
const NUM_COLUMNS = 2;
const MAX_WIDTH = 177;

export const MoreTitles = memo<MoreTitlesProps>(({ data }) => {
  const styles = useStyles();
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const cardWidth = useMemo(() => {
    return Math.min(
      MAX_WIDTH,
      (SCREEN_WIDTH - 2 * HORIZONTAL_OFFSET - GAP * (NUM_COLUMNS - 1)) /
        NUM_COLUMNS
    );
  }, [SCREEN_WIDTH]);

  const cardHeight = cardWidth / MORE_TITLES_CARD_RATIO;

  const renderItem = useCallback(
    ({ item }: { item: MoreTitlesCardData }) => (
      <MoreTitlesCard data={item} width={cardWidth} height={cardHeight} />
    ),
    [cardHeight, cardWidth]
  );

  return (
    <CarouselSection
      title="More to watch"
      onCTAPress={noop}
      subTitle="New every week!"
      offsetX={HORIZONTAL_OFFSET}
    >
      <Carousel<MoreTitlesCardData>
        data={data.titles}
        offsetX="lg"
        numColumns={NUM_COLUMNS}
        horizontal={false}
        scrollEnabled={false}
        columnWrapperStyle={styles.columnWrapperStyle}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={renderItem}
        ListFooterComponent={<ExploreMoreCard width={cardWidth} />}
      />
    </CarouselSection>
  );
});

MoreTitles.displayName = "MoreTitles";

const useStyles = createUseStyles(() => {
  return {
    columnWrapperStyle: {
      gap: 8,
    },
    contentContainerStyle: {
      flexDirection: "column",
      paddingHorizontal: 20,
      rowGap: 8,
    },
  };
});
