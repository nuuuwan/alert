import Role from "./Role";
import Place from "../ents/Place";

class WeatherStation extends Role {
  static getEntClass() {
    return Place;
  }
}

export default WeatherStation;
