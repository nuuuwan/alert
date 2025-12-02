import { StaticData } from "../base";
import Alert from "./Alert.js";
export default class Location extends StaticData {
  static getClassID() {
    return "location";
  }
  constructor(data) {
    super(data);
    this.latLng = data.lat_lng;
  }

  getAlertLevel(waterLevelM) {
    return Alert.NO_DATA;
  }
}
