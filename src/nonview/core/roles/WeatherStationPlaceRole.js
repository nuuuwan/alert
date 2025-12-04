import BaseRole from "./BaseRole";
import Place from "../ents/Place";

class WeatherStationPlaceRole extends BaseRole {
  static getEntClass() {
    return Place;
  }
}

export default WeatherStationPlaceRole;
