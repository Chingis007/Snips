import { View, Text, Pressable } from "react-native";

import { createUseStyles } from "../lib";

import { Screen } from "./Screen";

export interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const Error = ({ message, onRetry }: ErrorStateProps) => {
  const styles = useStyles();

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.emoji}>😔</Text>
        <Text style={styles.title}>Something went wrong</Text>
        <Text style={styles.message}>
          {message || "Unable to load content. Please try again."}
        </Text>
        {onRetry && (
          <Pressable style={styles.button} onPress={onRetry}>
            <Text style={styles.buttonText}>Try Again</Text>
          </Pressable>
        )}
      </View>
    </Screen>
  );
};

const useStyles = createUseStyles(() => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    fontSize: 14,
    fontWeight: "400",
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
}));
