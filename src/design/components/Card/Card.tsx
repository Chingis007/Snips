import { useMemo } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";

import { createUseStyles } from "../../lib";

import { CardImage } from "./CardImage";
import { CardVideo } from "./CardVideo";
import { CardContext } from "./context";

export interface CardProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * The style of the paper.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * The radius of the paper. This prop takes priority over "borderRadius" in a custom styles object
   */
  radius?: number;
  /**
   * Width of cards.
   */
  width?: number;
  /**
   * Height of cards.
   */
  height?: number;
}

export const Card = ({
  children,
  radius,
  width,
  height,
  style: customStyle,
}: CardProps) => {
  const styles = useStyles({ width, height });

  const value = useMemo(() => ({ radius }), [radius]);

  return (
    <CardContext.Provider value={value}>
      <View style={[styles.container, customStyle]}>{children}</View>
    </CardContext.Provider>
  );
};

Card.Image = CardImage;
Card.Video = CardVideo;

const useStyles = createUseStyles(
  ({ width, height }: { width?: number; height?: number }) => {
    return {
      container: {
        width: width ?? "100%",
        height: height ?? "100%",
      },
    };
  }
);
