export default class Unit {
  static getLabel() {
    return undefined;
  }
  static getUnitLabel() {
    return undefined;
  }

  constructor(value) {
    this.value = value;
  }

  format() {
    throw new Error("Not implemented");
  }
}
