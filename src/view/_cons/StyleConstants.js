// Colors
export const COLORS = {
  // Primary colors
  primary: "#1976d2",
  primaryTransparent: "rgba(25, 118, 210, 0.95)",

  // Grayscale
  white: "#ffffff",
  gray: "#888888",
  grayLight: "#9e9e9e",
  grayMedium: "#757575",
  grayDark: "#666",
  grayVeryDark: "#333",

  // Blues (temperature/water)
  blueDark: "#1976d2",
  blue: "#42a5f5",
  blueLight: "#90caf9",

  // Greens
  green: "#66bb6a",
  greenDark: "rgb(46, 125, 50)",

  // Oranges
  orange: "#f57c00",
  orangeLight: "#ffa726",

  // Reds
  red: "#d32f2f",
  redDark: "#b71c1c",
  redAlert: "rgb(211, 47, 47)",

  // Purple
  purple: "#7b1fa2",

  // Map marker colors
  markerGray: "gray",
  markerWhite: "white",
  markerLabel: "#666",
  markerLabelDark: "#333",
};

// Typography
export const FONT_FAMILY = [
  '"Ubuntu Sans"',
  "-apple-system",
  "BlinkMacSystemFont",
  '"Segoe UI"',
  "Roboto",
  "sans-serif",
].join(", ");

export const FONT_SIZES = {
  xsmall: "0.75rem",
  small: "0.8125rem",
  medium: "1rem",
  large: "1.25rem",
};

export const FONT_WEIGHTS = {
  normal: 400,
  medium: 500,
  bold: 700,
};

// Badge styles
export const BADGE_STYLES = {
  small: {
    fontSize: FONT_SIZES.xsmall,
    px: 1.25,
    py: 0.375,
    borderRadius: "12px",
  },
  medium: {
    fontSize: FONT_SIZES.small,
    px: 1.5,
    py: 0.5,
    borderRadius: "16px",
  },
};

// Stale data badge
export const STALE_DATA_BADGE = {
  backgroundColor: COLORS.gray,
  color: COLORS.white,
  fontSize: FONT_SIZES.xsmall,
  fontWeight: FONT_WEIGHTS.medium,
};

// Map constants
export const MAP_STYLES = {
  markerRadius: 6,
  lineWidth: 6,
};

// Opacity values
export const OPACITY = {
  low: 0.3,
  medium: 0.5,
  high: 0.8,
  full: 1.0,
};

// Spacing (for reference, using MUI spacing units)
export const SPACING = {
  xs: 0.5,
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4,
};

// Border radius
export const BORDER_RADIUS = {
  small: "12px",
  medium: "16px",
  large: "24px",
};

// App Bar
export const APP_BAR = {
  height: "48px",
  backgroundColor: COLORS.primaryTransparent,
  backdropFilter: "blur(10px)",
};

// Weather severity colors
export const WEATHER_COLORS = {
  rain: {
    none: COLORS.grayLight,
    light: COLORS.blueLight,
    moderate: COLORS.blue,
    heavy: COLORS.blueDark,
    veryHeavy: COLORS.purple,
  },
  temperature: {
    cold: COLORS.blueDark,
    cool: COLORS.blue,
    pleasant: COLORS.green,
    warm: COLORS.orangeLight,
    hot: COLORS.orange,
    veryHot: COLORS.red,
    extremeHot: COLORS.redDark,
  },
};

// Chart colors
export const CHART_COLORS = {
  waterLevel: COLORS.primary,
  alertLine: "rgb(117, 117, 117)",
};
