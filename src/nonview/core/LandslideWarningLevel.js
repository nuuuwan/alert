export default class LandslideWarningLevel {
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
      LandslideWarningLevel.LEVEL_0,
      LandslideWarningLevel.LEVEL_1,
      LandslideWarningLevel.LEVEL_2,
      LandslideWarningLevel.LEVEL_3,
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
LandslideWarningLevel.LEVEL_0 = new LandslideWarningLevel({
  level: 0,
  color: "white",
  description: "🟩",
  emoji: "🟩",
});

LandslideWarningLevel.LEVEL_1 = new LandslideWarningLevel({
  level: 1,
  color: "yellow",
  description: "watch",
  emoji: "🟡",
});

LandslideWarningLevel.LEVEL_2 = new LandslideWarningLevel({
  level: 2,
  color: "orange",
  description: "alert",
  emoji: "🟠",
});

LandslideWarningLevel.LEVEL_3 = new LandslideWarningLevel({
  level: 3,
  color: "red",
  description: "evacuate",
  emoji: "🛑",
});
