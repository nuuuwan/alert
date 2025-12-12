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
      floatPairList.map((floatPair) => LatLng.fromRaw(floatPair))
    );
  }

  static fromReverseRaw(floatPairList) {
    return new Polygon(
      floatPairList.map((floatPair) => LatLng.fromReverseRaw(floatPair))
    );
  }

  isInside(latLng) {
    const polygon = this.latLngList.map((l) => l.raw());
    const [x, y] = latLng.raw();

    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const [xi, yi] = polygon[i];
      const [xj, yj] = polygon[j];

      const alpha1 = yi > y;
      const alpha2 = yj > y;
      const alpha = alpha1 !== alpha2;
      const intersect = alpha && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  }
}
