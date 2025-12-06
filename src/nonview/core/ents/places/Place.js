class Place {
  constructor({ latLng }) {
    this.latLng = latLng;
  }

  get title() {
    return this.latLng.title;
  }

  static async load({ latLng }) {
    return new Place({ latLng });
  }
}

export default Place;
