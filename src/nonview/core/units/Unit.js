export default class Unit {
  static getLabel() {
    return undefined;
  }
  static getUnitLabel() {
    return undefined;
  }
  static getIcon() {
    // Return appropriate MUI icon
    // See what's been used already in the codebase for this unit
    return null;
  }
  static getColor() {
    // ditto
    return undefined;
  }

  constructor(value) {
    this.value = value;
  }

  format() {
    throw new Error("Not implemented");
  }
}
