import { useTheme } from "@react-navigation/native";
import { View, type ViewProps } from "react-native";

import { createUseStyles } from "../lib";

export type ScreenProps = ViewProps;

/**
 * Screen
 * Use this component to display a screen.
 */
export const Screen = ({ children, style, ...props }: ScreenProps) => {
  const theme = useTheme();
  const styles = useStyles({ theme });

  return (
    <View style={[styles.root, style]} {...props}>
      {children}
    </View>
  );
};

const useStyles = createUseStyles(
  ({ theme }: { theme: ReactNavigation.Theme }) => ({
    root: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  })
);
