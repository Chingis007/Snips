import { memo } from "react";
import { View } from "react-native";

import { Card, createUseStyles } from "@/src/design";
import { SnipsCount } from "@/src/design/components/SnipsCount";

const NO_TITLE_IMAGE = require("@/assets/images/default.jpg");

// Original dimensions: width 177, height 213
// Aspect ratio: 177/213 = 0.831
export const MORE_TITLES_CARD_RATIO = 177 / 213;

export type MoreTitlesCardData = {
  id: string;
  posterUrl?: string;
  snipsCount: number;
};

export interface MoreTitlesCardProps {
  data: MoreTitlesCardData;
  /**
   * Width of the card
   * */
  width?: number;
  /**
   * Height of the card
   * */
  height?: number;
}

export const MoreTitlesCard = memo(
  ({ data, width, height }: MoreTitlesCardProps) => {
    const styles = useStyles();

    const { posterUrl } = data;

    return (
      <Card radius={12} width={width} height={height}>
        <View style={styles.container}>
          <Card.Image
            source={posterUrl ?? NO_TITLE_IMAGE}
            transition={200}
            contentFit="cover"
          />
          <SnipsCount snipsCount={data.snipsCount} size={12} color="white" />
        </View>
      </Card>
    );
  }
);

MoreTitlesCard.displayName = "MoreTitlesCard";

export const useStyles = createUseStyles(() => ({
  container: {
    flex: 1,
  },
  snipsContainer: {
    position: "absolute",
    bottom: 2,
    right: 2,
    flexDirection: "row",
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  snipsCount: {
    fontSize: 11,
    fontWeight: 400,
    color: "white",
    lineHeight: 14,
  },
  textContainer: {
    marginTop: 6,
    gap: 4,
  },
  tags: {
    flexDirection: "row",
    gap: 8,
  },
  tagText: {
    fontSize: 11,
    fontWeight: 400,
    color: "white",
    lineHeight: 14,
    opacity: 0.6,
  },
  name: {
    fontSize: 14,
    fontWeight: 400,
    color: "white",
    lineHeight: 17,
  },
}));
