class Place {
  constructor({ latLng }) {
    this.latLng = latLng;
  }

  get title() {
    return this.latLng.title;
  }
}

export default Place;
