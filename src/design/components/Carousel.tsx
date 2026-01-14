import { type FlatListProps, FlatList } from "react-native";

import { SPACING_MAP, type Space } from "../constants";
import { createUseStyles } from "../lib";

export type CarouselProps<Item> = {
  /**
   * Horizontal offset (padding) applied to the carousel container.
   * Controls the spacing from the edges of the screen.
   * @default 'none'
   */
  offsetX?: Space;
  /**
   * Spacing between carousel items.
   * Controls the horizontal spacing between individual items.
   * @default 'none'
   */
  itemGap?: Space;
} & FlatListProps<Item>;

/**
 * A carousel component built on top of FlatList.
 * Provides a simple way to display a scrollable list of items
 * with predefined spacing options.
 */
export const Carousel = <Item,>({
  offsetX = "none",
  itemGap = "none",
  ...props
}: CarouselProps<Item>) => {
  const styles = useStyles({ offsetX, itemGap });

  return (
    <FlatList<Item>
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      disableIntervalMomentum
      nestedScrollEnabled
      horizontal
      {...props}
    />
  );
};

const useStyles = createUseStyles(
  ({ offsetX, itemGap }: { offsetX: Space; itemGap: Space }) => {
    return {
      container: {
        paddingHorizontal: SPACING_MAP[offsetX],
        columnGap: SPACING_MAP[itemGap],
      },
    };
  }
);
