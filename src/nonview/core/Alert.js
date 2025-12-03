export default class Alert {
  constructor({ level, name, color, emoji }) {
    this.level = level;
    this.name = name;
    this.color = color;
    this.emoji = emoji;
  }

  get label() {
    return this.name;
  }

  get colorRgb() {
    const [r, g, b] = this.color;
    return `rgb(${r * 255}, ${g * 255}, ${b * 255})`;
  }

  isLessThan(other) {
    return this.level < other.level;
  }

  isGreaterThan(other) {
    return this.level > other.level;
  }

  toString() {
    return `${this.emoji} ${this.name}`;
  }
}

Alert.MAJOR = new Alert({
  level: 4,
  name: "Major Flood",
  color: [0.8, 0.0, 0.0],
  emoji: "🔴",
});
Alert.MINOR = new Alert({
  level: 3,
  name: "Minor Flood",
  color: [1.0, 0.4, 0.0],
  emoji: "🟠",
});
Alert.ALERT = new Alert({
  level: 2,
  name: "Alert",
  color: [0.8, 0.8, 0.0],
  emoji: "🟡",
});
Alert.NORMAL = new Alert({
  level: 1,
  name: "Normal",
  color: [0.0, 0.8, 0.0],
  emoji: "🟢",
});
Alert.NO_DATA = new Alert({
  level: 0,
  name: "No Data",
  color: [0.5, 0.5, 0.5],
  emoji: "⚪",
});
Alert.listAll = () => [
  Alert.MAJOR,
  Alert.MINOR,
  Alert.ALERT,
  Alert.NORMAL,
  Alert.NO_DATA,
];
