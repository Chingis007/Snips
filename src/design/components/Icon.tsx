import { useMemo } from "react";
import { StyleSheet } from "react-native";
import type { SvgProps } from "react-native-svg";

import * as icons from "../icons";

export type IconSource = keyof typeof icons;

export type IconProps = {
  /**
   * The name of the icon to use.
   */
  name: IconSource;
  /**
   * The color of the icon. Sets the color based on the theme's tokens.
   */
  color?: string;
  /**
   * The size of the icon. You can pass a number to set the size in pixels
   */
  size?: number;
} & Omit<SvgProps, "size">;

/**
 * An icon button is a button which displays only an icon without a label.
 *
 * ## Usage
 * @example
 * ```tsx
 * import { Icon, useTheme } from '@/design';
 *
 * const MyComponent = () => {
 *  const theme = useTheme();
 *
 *  return (
 *    <>
 *      <Icon name="close" color={"white"} size="md" />
 *    </>
 *  );
 * };
 * ```
 */

export const Icon = (props: IconProps) => {
  const { name, size = 4, color, style, ...svgProps } = props;

  // eslint-disable-next-line import/namespace
  const IconComponent = useMemo(() => icons[name], [name]);

  const { ...customStyle } = StyleSheet.flatten(style) || {};

  const { width, height } = getIconSize(size);

  return (
    <IconComponent
      fill={color}
      width={width}
      height={height}
      style={customStyle}
      {...svgProps}
    />
  );
};

function getIconSize(size: number) {
  return { width: size, height: size };
}
