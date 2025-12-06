import LatLng from "./LatLng";

export default class Polygon {
  constructor(latLngList) {
    this.latLngList = latLngList;
  }

  raw() {
    return this.latLngList.map((latLng) => latLng.raw());
  }

  static fromRaw(floatPairList) {
    return new Polygon(
      floatPairList.map((floatPair) => LatLng.fromRaw(floatPair)),
    );
  }

  static fromReverseRaw(floatPairList) {
    return new Polygon(
      floatPairList.map((floatPair) => LatLng.fromReverseRaw(floatPair)),
    );
  }
}
