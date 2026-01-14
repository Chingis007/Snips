import type React from "react";
import type { SvgProps } from "react-native-svg";

export type IconComponent = React.ComponentType<SvgProps>;

export const createSVGIcon = (
  callback: (props: SvgProps) => React.ReactElement
): IconComponent => {
  return function SvgIcon(props: SvgProps) {
    return callback(props);
  };
};
