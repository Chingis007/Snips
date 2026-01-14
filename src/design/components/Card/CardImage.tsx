import { Image, type ImageProps } from "expo-image";
import type { StyleProp, ViewStyle } from "react-native";

import { createUseStyles } from "../../lib";

import { type TCardContext, useCardContext } from "./context";

export interface CardImageProps extends ImageProps {
  loading?: boolean;
  loaderStyle?: StyleProp<ViewStyle>;
}

export const CardImage = ({
  style: customStyle,
  source,
  ...imageProps
}: CardImageProps) => {
  const { radius } = useCardContext();
  const styles = useStyles({ radius });

  return (
    <Image
      {...imageProps}
      source={source}
      style={[styles.root, customStyle]}
      contentFit="fill"
    />
  );
};

const useStyles = createUseStyles(({ radius }: TCardContext) => {
  const borderRadius = radius ?? 0;

  return {
    root: {
      borderRadius,
      width: "100%",
      height: "100%",
    },
  };
});
