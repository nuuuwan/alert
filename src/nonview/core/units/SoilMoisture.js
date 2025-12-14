import Unit from "./Unit";

export default class SoilMoisture extends Unit {
  static getLabel() {
    return "Soil Moisture";
  }
  static getUnitLabel() {
    return "%";
  }

  format() {
    return `${this.value.toFixed(1)}`;
  }
}
