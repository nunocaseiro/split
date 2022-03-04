import { globalCss } from "../stitches.config";
import "@fontsource/dm-sans";

const globalStyles = globalCss({
  body: {
    bc: "$background",
    margin: 0,
    fontFamily: "DM Sans",
    fontWeight: "$regular",
    fontSize: "$16",
    lineHeight: "$24",
  },
});

export default globalStyles;
