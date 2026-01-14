import Svg, { type SvgProps , Path } from "react-native-svg";

import { createSVGIcon } from "../lib/createSVGIcon";

export const Save = createSVGIcon((props: SvgProps) => (
  <Svg
    width={props.width}
    height={props.height}
    {...props}
    viewBox="0 0 36 36"
    fill="none"
  >
    <Path
      d="M28.5 29.5568C28.5 30.3702 27.5806 30.8433 26.9188 30.3705L19.1625 24.8303C18.4671 24.3336 17.5329 24.3336 16.8375 24.8303L9.08124 30.3705C8.41937 30.8433 7.5 30.3702 7.5 29.5568V10.5C7.5 8.29086 9.29086 6.5 11.5 6.5H24.5C26.7091 6.5 28.5 8.29086 28.5 10.5V29.5568Z"
      stroke={props.fill}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
));
