import Svg, { type SvgProps , Path } from "react-native-svg";

import { createSVGIcon } from "../lib/createSVGIcon";

export const ArrowRight = createSVGIcon((props: SvgProps) => (
  <Svg
    width={props.width}
    height={props.height}
    {...props}
    fill="none"
    viewBox="0 0 8 14"
  >
    <Path
      fill={props.fill}
      d="M1.70696 0.292893C1.31643 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31643 0.292893 1.70696L5.58586 6.99992L0.292893 12.2929L0.224534 12.3691C-0.0958166 12.7618 -0.0732228 13.3408 0.292893 13.707C0.659009 14.0731 1.23801 14.0957 1.63078 13.7753L1.70696 13.707L7.70696 7.70696C8.09748 7.31643 8.09748 6.68342 7.70696 6.29289L1.70696 0.292893Z"
      fill-opacity="0.8"
    />
  </Svg>
));
