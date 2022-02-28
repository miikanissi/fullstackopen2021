import {Platform} from "react-native";

const theme = {
  roundness: 4,
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    textTertiary: "white",
    primary: "#0366d6",
    backgroundPrimary: "white",
    backgroundSecondary: "#eee",
    appBar: "#24292e",
    error: "red",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    heading: 22,
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
};

export default theme;
