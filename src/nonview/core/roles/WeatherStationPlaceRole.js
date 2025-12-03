import BaseRole from "./BaseRole";
import Place from "../ents/Place";
import { DataWithIDMixin } from "../../base";

class WeatherStationPlaceRole extends BaseRole {
  static getEntClass() {
    return Place;
  }

  constructor(data) {
    super(data);
  }

  static getUrl() {
    return process.env.PUBLIC_URL + `/data/static/places.json`; // HACK! Must change
  }
}

Object.assign(WeatherStationPlaceRole, DataWithIDMixin);

export default WeatherStationPlaceRole;
