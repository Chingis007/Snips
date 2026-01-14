import { noop } from "@tanstack/react-query";
import { memo } from "react";
import { View, Text } from "react-native";

import { Card, createUseStyles } from "@/src/design";

import { Action } from "./Action";
import { Captions } from "./Captions";
import { CtaButton } from "./CtaButton";

export type FeedCardData = {
  name: string;
  captions: string;
  video_playback_url: string;
  poster_url: string;
  link: string;
};

export interface FeedCardProps {
  data: FeedCardData;
  /**
   * Height of card
   * */
  height?: number;
  /**
   * Prop that tells if component is currently in view
   * */
  isVisible: boolean;
}

export const FeedCard = memo(({ data, height, isVisible }: FeedCardProps) => {
  const styles = useStyles();

  const { name, captions, video_playback_url, poster_url } = data;

  return (
    <Card height={height}>
      <View style={styles.container}>
        <Card.Video
          source={video_playback_url}
          posterSource={poster_url}
          isVisible={isVisible}
          autoplay
        />
        <View style={styles.contentContainer} pointerEvents="box-none">
          <View style={styles.textContainer}>
            <Text style={styles.name}>{name}</Text>
            <Captions captions={captions} lines={3} />
            <CtaButton name="Play" width={24} height={24} fill="white" />
          </View>
          <View style={styles.actionsContainer}>
            <Action
              name="Save"
              width={36}
              height={36}
              fill="white"
              text="52"
              onPress={noop}
            />
            <Action
              name="Episodes"
              width={36}
              height={36}
              fill="white"
              text="Episodes"
              onPress={noop}
            />
            <Action
              name="Share"
              width={36}
              height={36}
              fill="white"
              text="52"
              onPress={noop}
            />
            <Action
              name="Settings"
              width={24}
              height={24}
              fill="white"
              onPress={noop}
            />
          </View>
        </View>
      </View>
    </Card>
  );
});

FeedCard.displayName = "FeedCard";

export const useStyles = createUseStyles(() => ({
  container: {
    position: "relative",
    flex: 1,
  },
  contentContainer: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 8,
    paddingHorizontal: 8,
    paddingBottom: 24,
    zIndex: 2,
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  textContainer: {
    flex: 1,
    maxWidth: 301,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 8,
  },
  name: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    fontWeight: 600,
    color: "white",
    lineHeight: 28,
    letterSpacing: 0.05,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  actionsContainer: {
    width: 52,
    gap: 8,
  },
  number: {
    fontFamily: "Poppins-ExtraBold",
    fontWeight: "800",
    fontStyle: "normal",
    fontSize: 146.47,
    lineHeight: 100,
    letterSpacing: 0,
    textAlign: "right",
    color: "white",
    opacity: 0.4,
  },
}));
