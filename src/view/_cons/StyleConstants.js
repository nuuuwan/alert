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
  neutralLightest: "#fcfcfc",

  // Things
  water: "rgb(0, 150, 255)",
  fire: "rgb(255, 87, 34)",
  earth: "rgb(29, 190, 43)",
  air: "rgb(192, 128, 20)",
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
export const FONT_FAMILY = ['"Fira Sans"', "sans-serif"].join(", ");
