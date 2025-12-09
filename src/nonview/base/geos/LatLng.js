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

  static fromId(id) {
    const [latStr, lngStr] = id.split("N").map((part) => part.replace("E", ""));
    return new LatLng([parseFloat(latStr), parseFloat(lngStr)]);
  }

  raw() {
    return [this.lat, this.lng];
  }

  get title() {
    return `${this.lat.toFixed(4)}°N, ${this.lng.toFixed(4)}°E`;
  }

  get id() {
    return `${this.lat.toFixed(4)}N${this.lng.toFixed(4)}E`;
  }

  distanceTo(otherLatLng) {
    const toRad = (deg) => (deg * Math.PI) / 180;
    const R = 6371000;
    const dLat = toRad(otherLatLng.lat - this.lat);
    const dLng = toRad(otherLatLng.lng - this.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(this.lat)) *
        Math.cos(toRad(otherLatLng.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}
