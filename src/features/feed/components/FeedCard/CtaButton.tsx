import { memo } from "react";
import { Text, Pressable } from "react-native";

import { createUseStyles, Icon } from "@/src/design";
import { type IconSource } from "@/src/design/components/Icon";

export interface CtaButtonProps {
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

export const CtaButton = memo(
  ({ name, width, height, fill, onPress }: CtaButtonProps) => {
    const styles = useStyles();

    return (
      <Pressable style={styles.cta} onPress={onPress}>
        <Icon name={name} width={width} height={height} fill={fill} />
        <Text style={styles.text} numberOfLines={1}>
          Watch Now
        </Text>
      </Pressable>
    );
  }
);

CtaButton.displayName = "CtaButton";

export const useStyles = createUseStyles(() => ({
  cta: {
    marginTop: 8,
    backgroundColor: "#F6245A",
    width: "100%",
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 4,
    borderRadius: 16,
  },
  text: {
    flexDirection: "row",
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 17,
    letterSpacing: 0,
    color: "white",
  },
}));
