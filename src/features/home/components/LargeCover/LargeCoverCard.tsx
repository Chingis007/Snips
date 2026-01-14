import { memo } from "react";
import { View, Text } from "react-native";

import { Badge, Card, createUseStyles } from "@/src/design";
import { type IconSource } from "@/src/design/components/Icon";

import { MuteButton } from "./MuteButton";

const NO_TITLE_IMAGE = require("@/assets/images/default.jpg");

// Original dimensions: width 235, height 352
// Aspect ratio: 235/352 = 0.6676
export const LARGE_COVER_CARD_RATIO = 235 / 352;

export type LargeCoverCardData = {
  id: string;
  posterUrl?: string;
  name: string;
  number?: string;
  badgeConfig?: {
    backgroundColor?: string;
    size?: number;
    children?: React.ReactNode;
    name: IconSource;
  };
};

export interface LargeCoverCardProps {
  data: LargeCoverCardData;
  /**
   * Width of the card
   * */
  width?: number;
  /**
   * Height of the card
   * */
  height?: number;
}

export const LargeCoverCard = memo(
  ({ data, width, height }: LargeCoverCardProps) => {
    const styles = useStyles();

    const { posterUrl, name, number, badgeConfig } = data;

    return (
      <Card radius={12} width={width} height={height}>
        <View style={styles.container}>
          {badgeConfig && <Badge badgeConfig={badgeConfig} />}

          <MuteButton id={data.id} />

          <Card.Image
            source={posterUrl ?? NO_TITLE_IMAGE}
            transition={200}
            contentFit="cover"
          />

          <Text style={styles.name}>{name}</Text>
          {number && <Text style={styles.number}>{number}</Text>}
        </View>
      </Card>
    );
  }
);

LargeCoverCard.displayName = "LargeCoverCard";

export const useStyles = createUseStyles(() => ({
  container: {
    flex: 1,
  },
  name: {
    position: "absolute",
    bottom: 18,
    left: 12,
    fontSize: 14,
    fontWeight: 600,
    color: "white",
    lineHeight: 17,
    letterSpacing: 0,
    width: "60%",
  },
  number: {
    position: "absolute",
    bottom: 16,
    right: 4,
    fontFamily: "Poppins-ExtraBold",
    fontWeight: "800",
    fontStyle: "normal",
    fontSize: 146.47,
    lineHeight: 110,
    letterSpacing: 0,
    textAlign: "right",
    color: "white",
    opacity: 0.4,
  },
}));
