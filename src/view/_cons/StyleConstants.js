// Colors
export const COLORS = {
  neutral: "#888888",
  highAlert: "#d32f2f",
  mediumAlert: "#f57c00",
  lowAlert: "#d4a500",
};

export function getAlertColor(level) {
  switch (level) {
    case 3:
      return COLORS.highAlert;
    case 2:
      return COLORS.mediumAlert;
    case 1:
      return COLORS.lowAlert;
    default:
      return COLORS.neutral;
  }
}

// Typography
export const FONT_FAMILY = ['"Assistant"', "sans-serif"].join(", ");
