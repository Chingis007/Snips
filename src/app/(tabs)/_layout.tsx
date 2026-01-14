import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import React, { useCallback, useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { createUseStyles, Icon } from "@/src/design";

const SCALE = 1.25;
const GRADIENT_COLORS = ["rgba(0,0,0,0.8)", "rgba(0,0,0,1)"] as const;

export default function TabLayout() {
  const { bottom } = useSafeAreaInsets();
  const styles = useStyles({ bottom });

  const gradientLocations = useMemo(
    () => [0, 20 / (40 * SCALE + 4 * 2 + bottom)],
    [bottom]
  );

  const TabBarBackground = useCallback(
    () => (
      <LinearGradient
        colors={GRADIENT_COLORS}
        locations={gradientLocations}
        style={styles.gradient}
      />
    ),
    [gradientLocations, styles.gradient]
  );

  const HomeTabIcon = useCallback(
    ({ color }: { color: string }) => <Icon size={24} name="Home" fill={color} />,
    []
  );

  const FeedTabIcon = useCallback(
    ({ color, focused }: { color: string; focused: boolean }) => (
      <Icon
        size={24}
        name={focused ? "VideoLight" : "VideoDark"}
        fill={color}
      />
    ),
    []
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "rgba(255,255,255,1)",
        tabBarInactiveTintColor: "rgba(255,255,255,0.6)",
        headerShown: false,
        tabBarAllowFontScaling: true,
        tabBarStyle: {
          /**
           * 40 - fixed tabBar height
           * 8 - spacing between navigation top border and icon + spacing between icon and label
           * bottom - safe-area bottom inset
           */
          height: 40 * SCALE + 8 + bottom,
          position: "absolute",
        },
        tabBarBackground: TabBarBackground,
        tabBarIconStyle: {
          margin: 4,
        },
        tabBarLabelStyle: {
          margin: 4,
        },
        animation: "fade",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: HomeTabIcon,
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: "Feed",
          tabBarIcon: FeedTabIcon,
        }}
      />
    </Tabs>
  );
}

const useStyles = createUseStyles(({ bottom }: { bottom: number }) => ({
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 40 * SCALE + 4 * 2 + bottom,
  },
}));
