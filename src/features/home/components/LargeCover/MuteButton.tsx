import { useCallback } from "react";
import { Pressable } from "react-native";

import { Icon, createUseStyles } from "@/src/design";

type MuteButtonProps = {
  id: string;
};

export const MuteButton = ({ id }: MuteButtonProps) => {
  const styles = useStyles();

  const handlePress = useCallback(() => {
    console.log("Mute button pressed for:", id);
  }, [id]);

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Icon name="Mute" width={15} height={13} fill="white" />
    </Pressable>
  );
};

const useStyles = createUseStyles(() => ({
  container: {
    position: "absolute",
    right: 6,
    top: 6,
    zIndex: 10,
    width: 28,
    height: 28,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
}));
