import Polygon from "./Polygon.js";

export default class MultiPolygon {
  constructor(polygonList) {
    this.polygonList = polygonList;
  }

  // Returns the centroid LatLng of the MultiPolygon
  getCentroid() {
    if (!this.polygonList || this.polygonList.length === 0) {
      return null;
    }
    // Compute centroid for each polygon
    const centroids = this.polygonList
      .map((polygon) => MultiPolygon._getPolygonCentroid(polygon))
      .filter((c) => c);
    if (centroids.length === 0) return null;
    // Average the centroids
    const avgLat =
      centroids.reduce((sum, c) => sum + c.lat, 0) / centroids.length;
    const avgLng =
      centroids.reduce((sum, c) => sum + c.lng, 0) / centroids.length;
    return new (require("./LatLng").default)([avgLat, avgLng]);
  }

  // Helper: centroid of a polygon
  static _getPolygonCentroid(polygon) {
    if (!polygon || !polygon.latLngList || polygon.latLngList.length === 0) {
      return null;
    }
    let sumLat = 0,
      sumLng = 0;
    polygon.latLngList.forEach((latLng) => {
      sumLat += latLng.lat;
      sumLng += latLng.lng;
    });
    const n = polygon.latLngList.length;
    return new (require("./LatLng").default)([sumLat / n, sumLng / n]);
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
