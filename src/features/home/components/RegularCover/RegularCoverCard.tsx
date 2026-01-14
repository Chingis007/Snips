import { memo } from "react";
import { View, Text } from "react-native";

import { Icon, Card, createUseStyles } from "@/src/design";

const NO_TITLE_IMAGE = require("@/assets/images/default.jpg");

// Original dimensions: width 160, height 254
// Aspect ratio: 160/254 = 0.6299
export const REGULAR_COVER_CARD_RATIO = 160 / 254;

export type RegularCoverCardData = {
  id: string;
  posterUrl?: string;
  genres: string[];
  snipsCount: number;
  name: string;
};

export interface RegularCoverCardProps {
  data: RegularCoverCardData;
  /**
   * Width of the card
   * */
  width?: number;
  /**
   * Height of the card
   * */
  height?: number;
  /**
   * Whether to show genres tags
   * */
  showGenres?: boolean;
}

export const RegularCoverCard = memo(
  ({ data, width, height, showGenres = false }: RegularCoverCardProps) => {
    const styles = useStyles();

    const { posterUrl, name, genres } = data;

    return (
      <Card radius={8} width={width} height={height}>
        <View style={styles.container}>
          <Card.Image
            source={posterUrl ?? NO_TITLE_IMAGE}
            transition={200}
            contentFit="cover"
          />

          <View style={styles.snipsContainer}>
            <Icon name="Snips" size={12} color="white" />
            <Text style={styles.snipsCount}>{data.snipsCount}</Text>
          </View>
        </View>

        <View style={styles.textContainer}>
          {showGenres && (
            <View style={styles.tags}>
              {genres.map((genre) => (
                <Text key={genre} style={styles.tagText}>
                  {genre.toUpperCase()}
                </Text>
              ))}
            </View>
          )}
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
        </View>
      </Card>
    );
  }
);

RegularCoverCard.displayName = "RegularCoverCard";

export const useStyles = createUseStyles(() => ({
  container: {
    flex: 1,
    width: "100%",
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
