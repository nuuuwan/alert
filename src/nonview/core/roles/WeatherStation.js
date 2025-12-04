import BaseRole from "./BaseRole";
import Place from "../ents/Place";

class WeatherStation extends BaseRole {
  static getEntClass() {
    return Place;
  }
}

export default WeatherStation;
