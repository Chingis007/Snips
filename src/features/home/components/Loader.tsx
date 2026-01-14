import { useMemo, type ReactNode } from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { useWindowDimensions, View } from "react-native";

import {
  Section,
  SPACING_MAP,
  type Space,
  createUseStyles,
} from "@/src/design";

import { palette } from "../../../design/theme/palette";
import { LARGE_COVER_CARD_RATIO } from "../components/LargeCover/LargeCoverCard";
import { REGULAR_COVER_CARD_RATIO } from "../components/RegularCover/RegularCoverCard";

const DESIGN_WIDTH = 393;

// Design widths from 393px screen
const DESIGN_LARGE_CARD_WIDTH = 235;
const DESIGN_REGULAR_CARD_WIDTH = 160;

const THEME = {
  skeletonPrimary: palette.neutral60,
  skeletonSecondary: palette.neutral55,
} as const;

interface LargeCoverCardSkeletonProps {
  width?: number;
  height?: number;
}

const LargeCoverCardSkeleton = ({
  width,
  height,
}: LargeCoverCardSkeletonProps) => {
  const { width: screenWidth } = useWindowDimensions();

  // Calculate scale factor based on current screen vs design screen
  const scaleFactor = screenWidth / DESIGN_WIDTH;

  // Scaled widths for current screen
  const largeCardWidth = Math.min(
    DESIGN_LARGE_CARD_WIDTH,
    DESIGN_LARGE_CARD_WIDTH * scaleFactor
  );

  const cardHeight = height ?? largeCardWidth / LARGE_COVER_CARD_RATIO;

  return (
    <ContentLoader
      width={width ?? largeCardWidth}
      height={cardHeight}
      backgroundColor={THEME.skeletonPrimary}
      foregroundColor={THEME.skeletonSecondary}
    >
      <Rect x={0} y={0} width="100%" height="100%" rx={12} ry={12} />
    </ContentLoader>
  );
};

const GroupName = () => {
  return (
    <ContentLoader
      width={150}
      height={42}
      backgroundColor={THEME.skeletonPrimary}
      foregroundColor={THEME.skeletonSecondary}
    >
      <Rect x={0} y={0} width="55%" height={28} rx={5} ry={5} />
    </ContentLoader>
  );
};

interface RegularCoverCardSkeletonProps {
  width?: number;
  height?: number;
}

const RegularCoverCardSkeleton = ({
  width,
  height,
}: RegularCoverCardSkeletonProps) => {
  const { width: screenWidth } = useWindowDimensions();

  // Calculate scale factor based on current screen vs design screen
  const scaleFactor = screenWidth / DESIGN_WIDTH;

  const regularCardWidth = Math.min(
    DESIGN_REGULAR_CARD_WIDTH,
    DESIGN_REGULAR_CARD_WIDTH * scaleFactor
  );

  const cardHeight = height ?? regularCardWidth / REGULAR_COVER_CARD_RATIO;
  const imageHeight = cardHeight - 41; // Total height minus text area (6 + 14 + 4 + 17)
  const textStartY = imageHeight + 6;
  const descriptionY = textStartY;
  const nameY = textStartY + 14 + 4;

  return (
    <ContentLoader
      width={width ?? regularCardWidth}
      height={cardHeight}
      backgroundColor={THEME.skeletonPrimary}
      foregroundColor={THEME.skeletonSecondary}
    >
      {/* Title Image */}
      <Rect x={0} y={0} width="100%" height={imageHeight} rx={12} ry={12} />
      {/* Title Description */}
      <Rect x={0} y={descriptionY} width="66%" height={14} rx={4} ry={4} />
      {/* Title Name */}
      <Rect x={0} y={nameY} width="33%" height={17} rx={5} ry={5} />
    </ContentLoader>
  );
};

interface CarouselProps {
  items?: number;
  children: ReactNode;
  itemGap?: Space;
}

const Carousel = ({ items = 2, itemGap = "none", children }: CarouselProps) => {
  const styles = useStyles({ itemGap });

  const list = useMemo(() => Array.from({ length: items }), [items]);

  return (
    <View style={styles.carouselWrapper}>
      {list.map((_, index) => (
        <View key={index}>{children}</View>
      ))}
    </View>
  );
};

export const Loader = () => {
  return (
    <View>
      <Section padY="md" padX="lg">
        <Carousel itemGap="xl">
          <LargeCoverCardSkeleton />
        </Carousel>
      </Section>

      <Section padY="md" padX="lg">
        <GroupName />
        <Carousel itemGap="xl">
          <RegularCoverCardSkeleton />
        </Carousel>
      </Section>

      <Section padY="md" padX="lg">
        <GroupName />
        <Carousel itemGap="xl">
          <RegularCoverCardSkeleton />
        </Carousel>
      </Section>
    </View>
  );
};

const useStyles = createUseStyles(({ itemGap }: { itemGap: Space }) => {
  return {
    recommendedTitles: {
      gap: 8,
    },
    carouselWrapper: {
      flexDirection: "row",
      gap: 20,
      columnGap: SPACING_MAP[itemGap],
    },
  };
});
