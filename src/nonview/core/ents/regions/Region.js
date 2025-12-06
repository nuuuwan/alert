export default class Region {
  constructor({ multiPolygon }) {
    this.multiPolygon = multiPolygon;
  }

  // Returns the centroid LatLng of the MultiPolygon
  getCentroid() {
    if (!this.multiPolygon) {
      return null;
    }
    return this.multiPolygon.getCentroid();
  }
}
