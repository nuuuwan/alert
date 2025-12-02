import { StaticData } from "../base";

export default class Location extends StaticData {
  static getClassID() {
    return "location";
  }
  constructor(data) {
    super(data);
    this.latLng = data.latLng || data.lat_lng;
  }
}
