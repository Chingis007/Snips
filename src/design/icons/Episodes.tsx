import Svg, { type SvgProps , Path } from "react-native-svg";

import { createSVGIcon } from "../lib/createSVGIcon";

export const Episodes = createSVGIcon((props: SvgProps) => (
  <Svg
    width={props.width}
    height={props.height}
    {...props}
    viewBox="0 0 36 36"
    fill="none"
  >
    <Path
      stroke={props.fill}
      d="M16 27L30 27"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      stroke={props.fill}
      d="M6 18L30 18"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      stroke={props.fill}
      d="M6 9H30"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      fill={props.fill}
      d="M10.6758 28.3074C11.6953 27.7339 11.6953 26.2661 10.6758 25.6926L7.23539 23.7574C6.23549 23.195 5 23.9175 5 25.0648L5 28.9352C5 30.0825 6.23549 30.805 7.23539 30.2426L10.6758 28.3074Z"
    />
  </Svg>
));
