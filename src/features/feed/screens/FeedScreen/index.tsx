import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useIsFocused } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { useState, useMemo, useCallback } from "react";
import { useWindowDimensions, type ViewToken } from "react-native";

import { createUseStyles, Screen, Error } from "@/src/design";
import { useRefreshByUser } from "@/src/lib/react-query";

import { FeedCard, type FeedCardData } from "../../components";
import { Loader } from "../../components/Loader";
import { useFeedPageQuery } from "../../state";

export function FeedScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const styles = useStyles({ tabBarHeight });

  const isFocused = useIsFocused();
  const [currentViewableItemIndex, setCurrentViewableItemIndex] = useState(0);
  const { height: screenHeight } = useWindowDimensions();
  const calculatedHeight = useMemo(
    () => screenHeight + 20 - tabBarHeight,
    [screenHeight, tabBarHeight]
  );

  const { data, isLoading, isRefetching, error, refetch } = useFeedPageQuery();
  const { refreshing, handleRefresh } = useRefreshByUser(refetch);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken<FeedCardData>[] }) => {
      if (viewableItems.length > 0) {
        const newIndex = viewableItems[0].index ?? 0;
        setCurrentViewableItemIndex(newIndex);
      }
    },
    []
  );

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
    minimumViewTime: 0,
  };

  const renderItem = useCallback(
    ({ item, index }: { item: FeedCardData; index: number }) => (
      <FeedCard
        data={item}
        height={calculatedHeight}
        isVisible={isFocused && index === currentViewableItemIndex}
      />
    ),
    [calculatedHeight, currentViewableItemIndex, isFocused]
  );

  const keyExtractor = (item: FeedCardData, index: number) =>
    `${item.name}-${index}`;

  if (isLoading || isRefetching) {
    return <Loader width={screenHeight} height={calculatedHeight} />;
  }

  if (error && !data) {
    return (
      <Error
        message={error instanceof Error ? error.message : "Failed to load feed"}
        onRetry={refetch}
      />
    );
  }

  return (
    <Screen>
      <FlashList<FeedCardData>
        data={data}
        // We must use "index" additionally as same titles way show a few times in the list (probably)
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        pagingEnabled
        snapToInterval={calculatedHeight}
        decelerationRate="fast"
        disableIntervalMomentum
        refreshing={refreshing}
        onRefresh={handleRefresh}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        maxItemsInRecyclePool={7}
        removeClippedSubviews
      />
    </Screen>
  );
}

const useStyles = createUseStyles(
  ({ tabBarHeight }: { tabBarHeight?: number }) => {
    return {
      contentContainerStyle: { paddingBottom: tabBarHeight },
    };
  }
);
