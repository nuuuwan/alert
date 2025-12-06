export default class LatLng {
  constructor(lat, lng) {
    if (typeof lat !== "number" || typeof lng !== "number") {
      throw new Error("LatLng constructor requires numeric lat and lng");
    }
    this.lat = lat;
    this.lng = lng;
  }

  static fromLatLngFloats([lat, lng]) {
    return new LatLng(lat, lng);
  }

  toArray() {
    return [this.lat, this.lng];
  }

  get title() {
    return `${this.lat.toFixed(4)}°N, ${this.lng.toFixed(4)}°E`;
  }
}
