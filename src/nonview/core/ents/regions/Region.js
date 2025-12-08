export default class Region {
  static getEntTypeName() {
    return "Region";
  }
  constructor({ multiPolygon }) {
    this.multiPolygon = multiPolygon;
  }
}
