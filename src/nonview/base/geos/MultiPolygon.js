import Polygon from "./Polygon.js";

export default class MultiPolygon {
  constructor(polygonList) {
    this.polygonList = polygonList;
  }

  raw() {
    return this.polygonList.map((polygon) => polygon.raw());
  }

  static fromRaw(floatPairListList) {
    return new MultiPolygon(
      floatPairListList.map((floatPairList) => Polygon.fromRaw(floatPairList))
    );
  }

  static fromReverseRaw(floatPairListList) {
    return new MultiPolygon(
      floatPairListList.map((floatPairList) =>
        Polygon.fromReverseRaw(floatPairList)
      )
    );
  }
}
