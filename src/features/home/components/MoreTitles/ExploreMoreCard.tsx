import { memo } from "react";
import { View, Text } from "react-native";

import { Icon, Card, createUseStyles } from "@/src/design";

export interface ExploreMoreCardProps {
  width?: number;
}

// Original dimensions: width 177, height 213
// Aspect ratio: 177/213 = 0.831
export const EXPLORE_MORE_CARD_RATIO = 177 / 213;

export const ExploreMoreCard = memo(({ width }: ExploreMoreCardProps) => {
  const styles = useStyles();

  const height = width ? width / EXPLORE_MORE_CARD_RATIO : undefined;

  return (
    <Card radius={12} width={width} height={height}>
      <View style={styles.container}>
        <Icon name="VideoDark" size={22} fill="white" />
        <Text style={styles.text}>Explore more</Text>
      </View>
    </Card>
  );
});

ExploreMoreCard.displayName = "ExploreMoreCard";

export const useStyles = createUseStyles(() => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
  },
  text: {
    fontSize: 14,
    fontWeight: 400,
    color: "white",
    lineHeight: 17,
  },
}));
