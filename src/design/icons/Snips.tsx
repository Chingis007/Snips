import Svg, { type SvgProps , Path } from "react-native-svg";

import { createSVGIcon } from "../lib/createSVGIcon";

export const Snips = createSVGIcon((props: SvgProps) => (
  <Svg
    width={props.width}
    height={props.height}
    {...props}
    viewBox="0 0 11 8"
    fill="none"
  >
    <Path
      fill={props.fill}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.5 0C9 0 11 4 11 4C11 4 9 8 5.5 8C2 8 0 4 0 4C0 4 2 0 5.5 0ZM5.5 2C4.39543 2 3.5 2.89543 3.5 4C3.5 5.10457 4.39543 6 5.5 6C6.60457 6 7.5 5.10457 7.5 4C7.5 2.89543 6.60457 2 5.5 2Z"
    />
  </Svg>
));
