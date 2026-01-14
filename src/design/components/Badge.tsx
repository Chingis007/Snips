import type { PropsWithChildren } from "react";
import { View, type StyleProp, type ViewStyle, Text } from "react-native";

import { createUseStyles } from "../lib";

import { Icon, type IconSource } from "./Icon";

export interface BadgeProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  size?: number;
  name: IconSource;
}

export const Badge = ({ badgeConfig }: { badgeConfig: BadgeProps }) => {
  const {
    backgroundColor = "purple",
    size = 28,
    children,
    style,
    name,
  } = badgeConfig;

  const styles = useStyles({ backgroundColor, size });

  return (
    <View style={[styles.badge, { height: size }, style]}>
      <Icon
        name={name}
        fill={styles.badge.backgroundColor}
        style={styles.icon}
        size={size}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </View>
  );
};

const useStyles = createUseStyles(
  ({ backgroundColor, size }: { backgroundColor: string; size: number }) => ({
    badge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      backgroundColor,
    },
    icon: {
      position: "absolute",
      right: -14,
      top: 1,
      zIndex: 1,
    },
    textContainer: {
      zIndex: 2,
    },
    text: {
      color: "white",
      fontSize: size / 2.5,
      fontWeight: "600",
    },
  })
);
