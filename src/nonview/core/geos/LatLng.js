export default class LatLng {
  constructor(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }

  get lngLat() {
    return [this.lng, this.lat];
  }
}
