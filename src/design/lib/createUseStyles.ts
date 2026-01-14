/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import {
  StyleSheet,
  type ViewStyle,
  type TextStyle,
  type ImageStyle,
} from "react-native";

type RNStyle = ViewStyle | TextStyle | ImageStyle;

type NamedStyles<T> = { [P in keyof T]: RNStyle };

export const createUseStyles =
  <T extends NamedStyles<T>, V>(styles: T | ((props: V) => T)) =>
  (props?: V): T => {
    return useMemo(() => {
      const css =
        typeof styles === "function" ? styles(props ?? ({} as any)) : styles;

      return StyleSheet.create(css);
    }, [props]);
  };
