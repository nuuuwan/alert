// Colors
export const COLORS = {
  noAlert: "#888888",
  highAlert: "#d32f2f",
  mediumAlert: "#f57c00",
  lowAlert: "#d4a500",

  // Neutrals
  neutral: "#888888",
  neutralLight: "#cccccc",
  neutralLighter: "#eeeeee",
  neutralLightest: "#fcfcfc",

  neutralLighterTransparent: "rgba(238, 238, 238, 0.75)",
  neutralLightTransparent: "rgba(204, 204, 204, 0.75)",

  // Things
  water: "#444444",
  fire: "#444444",
  earth: "#444444",
  air: "#444444",
};

export function getAlertColor(level, maxLevel = 3) {
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
export const FONT_FAMILY = ['"Cabin"', "sans-serif"].join(", ");
