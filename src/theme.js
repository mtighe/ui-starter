import { merge } from "lodash";
import preset from "@rebass/preset";

// Rebass Preset Theme - https://github.com/rebassjs/rebass/blob/master/packages/preset/src/index.js
// Theme Specification - https://github.com/system-ui/theme-specification

export default merge(preset, {
  colors: {
    // custom primary color
    primary: "tomato",
  },
});
