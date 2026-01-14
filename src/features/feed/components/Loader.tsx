import ContentLoader, { Rect } from "react-content-loader/native";
import { useWindowDimensions, View } from "react-native";

import { palette } from "../../../design/theme/palette";

const THEME = {
  skeletonPrimary: palette.neutral60,
  skeletonSecondary: palette.neutral55,
} as const;

interface FeedCardSkeletonProps {
  width?: number;
  height?: number;
}

const FeedCardSkeleton = ({ width, height }: FeedCardSkeletonProps) => {
  const { height: screenHeight } = useWindowDimensions();
  const cardWidth = width ?? screenHeight;
  const cardHeight = height ?? screenHeight;

  return (
    <ContentLoader
      width={cardWidth}
      height={cardHeight}
      backgroundColor={THEME.skeletonPrimary}
      foregroundColor={THEME.skeletonSecondary}
    >
      <Rect x={0} y={0} width="100%" height="100%" rx={12} ry={12} />
    </ContentLoader>
  );
};

interface LoaderProps {
  width?: number;
  height?: number;
}

export const Loader = ({ width, height }: LoaderProps) => {
  return (
    <View>
      <FeedCardSkeleton width={width} height={height} />
    </View>
  );
};
