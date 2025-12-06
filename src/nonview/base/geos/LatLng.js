export default class LatLng {
  constructor(lat, lng) {
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
