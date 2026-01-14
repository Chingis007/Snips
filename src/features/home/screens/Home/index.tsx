import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useRef } from "react";
import { ScrollView, RefreshControl } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Section, Screen, Error, createUseStyles } from "@/src/design";
import { CrossFade } from "@/src/design/components/CrossFade";
import { useRefreshByUser } from "@/src/lib/react-query";

import { LargeCover } from "../../components/LargeCover";
import { Loader } from "../../components/Loader";
import { MoreTitles } from "../../components/MoreTitles";
import { RegularCover } from "../../components/RegularCover";
import { useHomePageQuery } from "../../state";

export function HomeScreen() {
  const { top: topInset } = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const styles = useStyles({ tabBarHeight, topInset });

  const scrollViewRef = useRef<ScrollView | null>(null);

  const { data, isLoading, isRefetching, error, refetch } = useHomePageQuery();
  const { refreshing, handleRefresh } = useRefreshByUser(refetch);

  if (error && !data) {
    return (
      <Error
        message={
          error instanceof Error ? error.message : "Failed to load home page"
        }
        onRetry={refetch}
      />
    );
  }

  return (
    <Screen style={styles.screen}>
      <ScrollView
        ref={scrollViewRef}
        scrollEventThrottle={16}
        scrollEnabled={!isLoading}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <CrossFade isLoading={isLoading || isRefetching} loader={<Loader />}>
          {data?.topTen && (
            <Section padY="md">
              <LargeCover data={data.topTen.titles} />
            </Section>
          )}

          {data?.drama && (
            <Section padY="md">
              <RegularCover data={data.drama} showGenres />
            </Section>
          )}

          {data?.romance && (
            <Section padY="md">
              <RegularCover data={data.romance} />
            </Section>
          )}

          {data?.romantic && (
            <Section padY="md">
              <RegularCover data={data.romantic} />
            </Section>
          )}

          {data?.more && (
            <Section padY="md">
              <MoreTitles data={data.more} />
            </Section>
          )}
        </CrossFade>
      </ScrollView>
    </Screen>
  );
}

const useStyles = createUseStyles(
  ({ tabBarHeight, topInset }: { tabBarHeight: number; topInset: number }) => ({
    screen: {
      paddingTop: topInset + 4,
    },
    contentContainer: {
      paddingBottom: tabBarHeight + 24,
      flexGrow: 1,
    },
    banner: {
      paddingTop: 20,
      paddingBottom: 4,
    },
  })
);
