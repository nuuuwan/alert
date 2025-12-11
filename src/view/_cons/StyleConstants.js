// Colors
export const COLORS = {
  noAlert: "#4caf50",
  highAlert: "#d32f2f",
  mediumAlert: "#f57c00",
  lowAlert: "#d4a500",

  // Neutrals
  neutral: "#888888",
  neutralLight: "#cccccc",
  neutralLighter: "#eeeeee",
};

export function getAlertColor(level, maxLevel) {
  if (level < 0 || level > maxLevel) {
    throw new Error(`Level out of bounds: ${level} / ${maxLevel}`);
  }
  const p = parseInt((level / maxLevel) * 3);
  const color = [
    COLORS.noAlert,
    COLORS.lowAlert,
    COLORS.mediumAlert,
    COLORS.highAlert,
  ][p];
  console.debug(level, maxLevel, p, color);
  return color;
}

export function isAlertColor(color) {
  return (
    color === COLORS.noAlert ||
    color === COLORS.lowAlert ||
    color === COLORS.mediumAlert ||
    color === COLORS.highAlert
  );
}

// Typography
export const FONT_FAMILY = ['"Assistant"', "sans-serif"].join(", ");
