import Unit from "./Unit";

export default class Temperature extends Unit {
  static getLabel() {
    return "Temperature";
  }
  static getUnitLabel() {
    return "°C";
  }

  format() {
    return `${this.value.toFixed(1)}`;
  }
}
