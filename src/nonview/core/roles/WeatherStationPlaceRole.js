import BaseRole from "./BaseRole";
import Place from "../ents/Place";
import { DataWithIDMixin } from "../../base";

class WeatherStationPlaceRole extends BaseRole {
  static getEntClass() {
    return Place;
  }
}

Object.assign(WeatherStationPlaceRole, DataWithIDMixin);

export default WeatherStationPlaceRole;
