export default class LatLng {
  constructor(floatPair) {
    const [lat, lng] = floatPair;
    this.lat = lat;
    this.lng = lng;
  }

  static fromRaw(floatPair) {
    return new LatLng([floatPair[0], floatPair[1]]);
  }

  static fromReverseRaw(floatPair) {
    return new LatLng([floatPair[1], floatPair[0]]);
  }

  raw() {
    return [this.lat, this.lng];
  }

  get title() {
    return `${this.lat.toFixed(4)}°N, ${this.lng.toFixed(4)}°E`;
  }
}
