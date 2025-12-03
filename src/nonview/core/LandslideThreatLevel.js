export default class LandslideThreatLevel {
  constructor({ level, color, description, emoji = "" }) {
    this.level = level;
    this.color = color;
    this.description = description;
    this.emoji = emoji;
  }

  static fromLevel(level) {
    const threatLevel = this.listAll().find(
      (tl) => tl.level === parseInt(level)
    );
    if (!threatLevel) {
      throw new Error(`Invalid threat level: ${level}`);
    }
    return threatLevel;
  }

  static listAll() {
    return [
      LandslideThreatLevel.LEVEL_0,
      LandslideThreatLevel.LEVEL_1,
      LandslideThreatLevel.LEVEL_2,
      LandslideThreatLevel.LEVEL_3,
    ];
  }

  get colorRgb() {
    const colorMap = {
      white: "#ffffff",
      yellow: "#ffeb3b",
      orange: "#ff9800",
      red: "#f44336",
    };
    return colorMap[this.color] || "#9e9e9e";
  }
}

// Define static threat levels
LandslideThreatLevel.LEVEL_0 = new LandslideThreatLevel({
  level: 0,
  color: "white",
  description: "🟩",
  emoji: "🟩",
});

LandslideThreatLevel.LEVEL_1 = new LandslideThreatLevel({
  level: 1,
  color: "yellow",
  description: "watch",
  emoji: "🟡",
});

LandslideThreatLevel.LEVEL_2 = new LandslideThreatLevel({
  level: 2,
  color: "orange",
  description: "alert",
  emoji: "🟠",
});

LandslideThreatLevel.LEVEL_3 = new LandslideThreatLevel({
  level: 3,
  color: "red",
  description: "evacuate",
  emoji: "🛑",
});
