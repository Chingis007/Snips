import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { createUseStyles } from "../design";
import { QueryProvider } from "../lib/react-query/QueryProvider";

// Keep splash screen visible while loading fonts
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: "(tabs)",
};

export const useExpoFonts = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-ExtraBold": require("../../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
  });

  return fontsLoaded;
};

export default function RootLayout() {
  const styles = useStyles();

  const colorScheme = useColorScheme();

  const fontsLoaded = useExpoFonts();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DarkTheme}>
        <SafeAreaProvider>
          <QueryProvider>
            <StatusBar style="auto" />
            <Stack screenOptions={{ headerShown: false }} />
          </QueryProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const useStyles = createUseStyles(() => ({
  root: {
    flex: 1,
  },
}));
