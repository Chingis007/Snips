import React, { useEffect, useRef, useState, memo } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  cancelAnimation,
} from "react-native-reanimated";

type CrossFadeProps = {
  /**
   * Whether to show the loader or the actual content.
   * When true, the loader is shown and children is hidden.
   */
  isLoading: boolean;
  /**
   * Loader component to display while loading.
   * Should be a React node, typically a loader placeholder.
   */
  loader: React.ReactNode;
  /**
   * Actual content to display when not loading.
   * Should be a React node, typically the main content of the screen.
   */
  children: React.ReactNode;
  /**
   * Duration of the fade animation in milliseconds.
   * Default: 500ms
   */
  duration?: number;
  /**
   * Minimum time the loader should be visible (ms)
   * Default: 350ms
   */
  minLoaderDisplayDurationMs?: number;
};

export const CrossFade = memo(
  ({
    isLoading,
    loader,
    children,
    duration = 500,
    minLoaderDisplayDurationMs = 350,
  }: CrossFadeProps) => {
    const [internalLoading, setInternalLoading] = useState(isLoading);
    const loadStartTime = useRef<number | null>(null);

    const contentOpacity = useSharedValue(isLoading ? 0 : 1);
    const loaderOpacity = useSharedValue(isLoading ? 1 : 0);
    const isLoadingSV = useSharedValue(isLoading);

    useEffect(() => {
      if (isLoading) {
        // Mark start time and show loader immediately
        loadStartTime.current = Date.now();
        setInternalLoading(true);
        isLoadingSV.value = true;
      } else {
        const elapsed = Date.now() - (loadStartTime.current ?? 0);
        const remaining = Math.max(minLoaderDisplayDurationMs - elapsed, 0);

        if (remaining > 0) {
          const timer = setTimeout(() => {
            isLoadingSV.value = false;
            setInternalLoading(false);
          }, remaining);

          return () => clearTimeout(timer);
        }
        isLoadingSV.value = false;
        setInternalLoading(false);
      }
    }, [isLoading, minLoaderDisplayDurationMs, isLoadingSV]);

    useEffect(() => {
      cancelAnimation(contentOpacity);
      cancelAnimation(loaderOpacity);

      contentOpacity.value = withTiming(internalLoading ? 0 : 1, { duration });
      loaderOpacity.value = withTiming(internalLoading ? 1 : 0, { duration });
    }, [internalLoading, duration, contentOpacity, loaderOpacity]);

    const contentAnimatedStyle = useAnimatedStyle(() => ({
      display: internalLoading ? "none" : "flex",
      opacity: contentOpacity.value,
      // Block touches while hidden
      pointerEvents: contentOpacity.value === 0 ? "none" : "auto",
    }));

    const loaderDisplay = useDerivedValue<"none" | "flex">(() =>
      loaderOpacity.value === 0 && !internalLoading ? "none" : "flex"
    );

    const loaderAnimatedStyle = useAnimatedStyle(() => ({
      opacity: loaderOpacity.value,
      display: loaderDisplay.value,
    }));

    return (
      <View style={styles.container}>
        <Animated.View style={[contentAnimatedStyle, styles.content]}>
          {children}
        </Animated.View>

        <Animated.View
          style={[StyleSheet.absoluteFill, loaderAnimatedStyle]}
          pointerEvents="none"
        >
          {loader}
        </Animated.View>
      </View>
    );
  }
);

CrossFade.displayName = "CrossFade";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    width: "100%",
  },
  content: {
    flex: 1,
  },
});
