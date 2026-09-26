// Colors
export const COLORS = {
  noAlert: "#067647",
  highAlert: "#b4233a",
  mediumAlert: "#c2410c",
  lowAlert: "#856404",

  brand: "#0f3d5e",
  brandDark: "#092a42",
  brandLight: "#e8f2f7",
  success: "#067647",

  // Neutrals
  neutral: "#64748b",
  neutralLight: "#cbd5e1",
  neutralLighter: "#e2e8f0",
  neutralLightest: "#f8fafc",
  ink: "#17212b",
  surface: "#ffffff",

  neutralLighterTransparent: "rgba(238, 238, 238, 0.75)",
  neutralLightTransparent: "rgba(204, 204, 204, 0.75)",

  // Things
  water: "#444444",
  fire: "#444444",
  earth: "#444444",
  air: "#444444",
};

export function getAlertColor(level, maxLevel = 3) {
  return getAlertMeta(level, maxLevel).color;
}

export function getAlertMeta(level = 0, maxLevel = 3) {
  const safeLevel = Number.isFinite(Number(level)) ? Number(level) : 0;
  const safeMaxLevel = Number(maxLevel) > 0 ? Number(maxLevel) : 3;
  const normalizedLevel = Math.max(
    0,
    Math.min(3, Math.ceil((safeLevel / safeMaxLevel) * 3)),
  );
  return [
    {
      level: 0,
      label: "No active alerts",
      shortLabel: "No alert",
      color: COLORS.noAlert,
      tone: "neutral",
    },
    {
      level: 1,
      label: "Low alert",
      shortLabel: "Low",
      color: COLORS.lowAlert,
      tone: "low",
    },
    {
      level: 2,
      label: "Medium alert",
      shortLabel: "Medium",
      color: COLORS.mediumAlert,
      tone: "medium",
    },
    {
      level: 3,
      label: "High alert",
      shortLabel: "High",
      color: COLORS.highAlert,
      tone: "high",
    },
  ][normalizedLevel];
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
export const FONT_FAMILY = [
  '"Fira Sans"',
  '"Noto Sans Sinhala"',
  '"Noto Sans Tamil"',
  '"Segoe UI"',
  "sans-serif",
].join(", ");
