import { View, Text } from "react-native";

import { createUseStyles } from "../lib";

import { Icon } from "./Icon";

export interface SnipsCountProps {
  snipsCount: number;
  size?: number;
  color?: string;
}

export const SnipsCount = ({
  snipsCount,
  size = 12,
  color = "white",
}: SnipsCountProps) => {
  const styles = useStyles();

  return (
    <View style={styles.snipsContainer}>
      <Icon name="Snips" size={size} color={color} />
      <Text style={styles.snipsCount}>{snipsCount}</Text>
    </View>
  );
};

const useStyles = createUseStyles(() => ({
  snipsContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    bottom: 2,
    right: 2,
    flexDirection: "row",
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
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
}));
