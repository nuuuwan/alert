import DataWithIDMixin from "../../base/mixins/DataWithIDMixin.js";
class Place {
  static getEntTypeTitle() {
    return "Place";
  }
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.latLng = data.latLng || data.lat_lng;
  }

  static getUrl() {
    return process.env.PUBLIC_URL + `/data/static/places.json`;
  }
}

Object.assign(Place, DataWithIDMixin);

export default Place;
