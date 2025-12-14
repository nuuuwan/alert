import Unit from "./Unit";

export default class Rain extends Unit {
  static getLabel() {
    return "Rain";
  }
  static getUnitLabel() {
    return "mm";
  }

  format() {
    return `${this.value.toFixed(1)}`;
  }
}
