import { memo, useCallback, useState } from "react";
import { View, Text, Pressable, type TextLayoutEvent } from "react-native";

import { createUseStyles } from "@/src/design";

export interface CaptionsProps {
  /**
   * Captions string
   * */
  captions: string;
  /**
   * Number of lines to display
   * */
  lines?: number;
}

export const Captions = memo(({ captions, lines = 2 }: CaptionsProps) => {
  const styles = useStyles();

  const [isTruncated, setIsTruncated] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const handlePress = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  const handleTextLayout = useCallback(
    (e: TextLayoutEvent) => {
      if (e.nativeEvent.lines.length > lines) {
        setIsTruncated(true);
      }
    },
    [lines]
  );

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Text
        style={styles.captions}
        numberOfLines={expanded ? undefined : lines}
        ellipsizeMode="tail"
        onTextLayout={handleTextLayout}
      >
        {captions}
      </Text>
      {!expanded && isTruncated && (
        <View>
          <Text style={styles.more}>More</Text>
          <View style={styles.underline} />
        </View>
      )}
    </Pressable>
  );
});

Captions.displayName = "Captions";

export const useStyles = createUseStyles(() => ({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    gap: 8,
  },
  captions: {
    flex: 1,
    fontSize: 14,
    fontWeight: 400,
    color: "white",
    lineHeight: 17,
    letterSpacing: 0,
    opacity: 0.8,
  },
  underline: {
    height: 1,
    backgroundColor: "white",
  },
  more: {
    fontSize: 14,
    fontWeight: 400,
    color: "white",
    lineHeight: 15,
    letterSpacing: 0.1,
  },
}));
