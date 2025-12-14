import Unit from "./Unit";

export default class WaterLevel extends Unit {
  static getLabel() {
    return "Water Level";
  }
  static getUnitLabel() {
    return "m";
  }

  format() {
    return `${this.value.toFixed(2)}`;
  }
}
