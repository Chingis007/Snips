import type { PropsWithChildren } from "react";
import { View, Text, Pressable } from "react-native";

import { createUseStyles } from "../lib";

import { Icon } from "./Icon";

export type CarouselSectionProps = PropsWithChildren<{
  title: string;
  subTitle?: string;
  offsetX?: number;
  onCTAPress?: () => void;
}>;

export const CarouselSection = ({
  children,
  title,
  subTitle,
  offsetX = 0,
  onCTAPress,
}: CarouselSectionProps) => {
  const styles = useStyles({ offsetX });

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View style={styles.row}>
          <Text style={styles.headline}>{title}</Text>
          {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
          {!subTitle && onCTAPress && (
            <Pressable style={styles.button} onPress={onCTAPress}>
              <Icon
                width={8}
                height={14}
                name="ArrowRight"
                fill={styles.chevronColor.color}
              />
            </Pressable>
          )}
        </View>
      </View>
      {children}
    </View>
  );
};

const useStyles = createUseStyles(({ offsetX }: { offsetX: number }) => {
  return {
    root: {
      rowGap: 12,
    },
    header: {
      paddingHorizontal: offsetX,
    },
    text: {
      fontSize: 16,
    },
    chevronColor: {
      color: "white",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      columnGap: 12,
    },
    headline: {
      fontFamily: "Poppins-SemiBold",
      fontSize: 20,
      letterSpacing: 0.2,
      color: "white",
    },
    subTitle: {
      fontWeight: 400,
      fontSize: 14,
      color: "white",
      opacity: 0.6,
    },
    button: {
      width: 32,
      height: 32,
      justifyContent: "center",
      alignItems: "center",
    },
  };
});
