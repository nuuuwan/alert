export default class Alert {
  constructor(level, name, color, emoji) {
    this.level = level;
    this.name = name;
    this.color = color;
    this.emoji = emoji;
  }

  get label() {
    return this.name;
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

Alert.MAJOR = new Alert(4, "Major Flood", [0.8, 0.0, 0.0], "🔴");
Alert.MINOR = new Alert(3, "Minor Flood", [1.0, 0.4, 0.0], "🟠");
Alert.ALERT = new Alert(2, "Alert", [0.8, 0.8, 0.0], "🟡");
Alert.NORMAL = new Alert(1, "Normal", [0.0, 0.8, 0.0], "🟢");
Alert.NO_DATA = new Alert(0, "No Data", [0.5, 0.5, 0.5], "⚪");

Alert.listAll = () => [
  Alert.MAJOR,
  Alert.MINOR,
  Alert.ALERT,
  Alert.NORMAL,
  Alert.NO_DATA,
];
