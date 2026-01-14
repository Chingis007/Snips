import * as React from "react";
import { View, type ViewProps } from "react-native";

import { SPACING_MAP, type Space } from "../constants";
import { createUseStyles } from "../lib";

type PadSize = Space;

export interface SectionProps extends ViewProps {
  /**
   * The padding on the left and right side of the section
   */
  padX?: PadSize;

  /**
   * The padding on the top and bottom side of the section
   */
  padY?: PadSize;
}

/**
 * Section component
 * Use this component to display a section.
 */
export const Section = ({
  children,
  style,
  padX = "none",
  padY = "none",
  ...sectionProps
}: SectionProps) => {
  const styles = useStyles({ padX, padY });

  return (
    <View style={[styles.root, style]} {...sectionProps}>
      {children}
    </View>
  );
};

const useStyles = createUseStyles(
  ({ padX, padY }: { padX: PadSize; padY: PadSize }) => {
    return {
      root: {
        paddingHorizontal: SPACING_MAP[padX],
        paddingVertical: SPACING_MAP[padY],
      },
    };
  }
);
