import { createTheme } from "@mui/material/styles";
import { COLORS, FONT_FAMILY } from "./_cons/StyleConstants";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: COLORS.brand, dark: COLORS.brandDark },
    secondary: { main: COLORS.neutral },
    error: { main: COLORS.highAlert },
    warning: { main: COLORS.mediumAlert },
    success: { main: COLORS.success },
    background: { default: "#f1f5f9", paper: COLORS.surface },
    text: { primary: COLORS.ink, secondary: COLORS.neutral },
    divider: COLORS.neutralLighter,
  },
  shape: { borderRadius: 12 },
  spacing: 8,
  typography: {
    fontFamily: FONT_FAMILY,
    fontSize: 14,
    h1: { fontSize: "1.75rem", fontWeight: 700, lineHeight: 1.2 },
    h2: { fontSize: "1.35rem", fontWeight: 700, lineHeight: 1.25 },
    h3: { fontSize: "1.125rem", fontWeight: 700, lineHeight: 1.3 },
    h6: { fontSize: "1rem", fontWeight: 700, lineHeight: 1.35 },
    subtitle1: { fontWeight: 700 },
    button: { fontWeight: 700, textTransform: "none" },
    caption: { lineHeight: 1.4 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { color: COLORS.ink, backgroundColor: "#f1f5f9" },
        "*:focus-visible": {
          outline: `3px solid #38bdf8`,
          outlineOffset: 2,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { minHeight: 44 } },
    },
    MuiIconButton: {
      styleOverrides: { root: { minWidth: 44, minHeight: 44 } },
    },
    MuiChip: {
      styleOverrides: { root: { fontWeight: 700 } },
    },
  },
});

export default theme;
