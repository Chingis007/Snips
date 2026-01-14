import { noop } from "@tanstack/react-query";
import { memo } from "react";
import { View, Text } from "react-native";

import { createUseStyles, Icon } from "@/src/design";
import { type IconSource } from "@/src/design/components/Icon";

export interface ActionProps {
  /**
   * Icon name
   * */
  name: IconSource;
  /**
   * Icon width
   * */
  width?: number;
  /**
   * Icon height
   * */
  height?: number;
  /**
   * Color of Icon
   * */
  fill?: string;
  /**
   * Text to display under icon
   * */
  text?: string;
  /**
   * Action onPress handler
   * */
  onPress?: () => void;
}

export const Action = memo(
  ({ name, width, height, fill, text, onPress = noop }: ActionProps) => {
    const styles = useStyles({ text: !!text });

    return (
      <View style={styles.container}>
        <Icon
          name={name}
          width={width}
          height={height}
          fill={fill}
          onPress={onPress}
        />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    );
  }
);

Action.displayName = "Action";

export const useStyles = createUseStyles(({ text }: { text: boolean }) => ({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 52,
    height: text ? 62 : 52,
  },
  text: {
    fontSize: 11,
    fontWeight: 600,
    color: "white",
    lineHeight: 14,
    letterSpacing: 0.1,
    opacity: 0.6,
  },
}));
