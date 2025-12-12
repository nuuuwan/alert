import Polygon from "./Polygon.js";
import LatLng from "./LatLng.js";

export default class MultiPolygon {
  constructor(polygonList) {
    this.polygonList = polygonList;
  }

  // Returns the centroid LatLng of the MultiPolygon
  getCentroid() {
    const centroids = this.polygonList
      .map((polygon) => MultiPolygon._getPolygonCentroid(polygon))
      .filter((c) => c);
    if (centroids.length === 0) return null;
    const avgLat =
      centroids.reduce((sum, c) => sum + c.lat, 0) / centroids.length;
    const avgLng =
      centroids.reduce((sum, c) => sum + c.lng, 0) / centroids.length;
    return new LatLng([avgLat, avgLng]);
  }

  static _getPolygonCentroid(polygon) {
    let sumLat = 0,
      sumLng = 0;
    polygon.latLngList.forEach((latLng) => {
      sumLat += latLng.lat;
      sumLng += latLng.lng;
    });
    const n = polygon.latLngList.length;
    return new LatLng([sumLat / n, sumLng / n]);
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

  isInside(latLng) {
    return this.polygonList.some((polygon) => polygon.isInside(latLng));
  }
}
