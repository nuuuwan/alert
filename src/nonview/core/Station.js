import Location from "./Location.js";
import River from "./River.js";
import Alert from "./Alert.js";

export default class Station extends Location {
  static getClassID() {
    return "station";
  }
  constructor(data) {
    super(data);
    this.riverName = data.riverName || data.river_name;
    this.districtId = data.districtId || data.district_id;
    this.alertLevelM = data.alertLevelM || data.alert_level_m;
    this.minorFloodLevelM = data.minorFloodLevelM || data.minor_flood_level_m;
    this.majorFloodLevelM = data.majorFloodLevelM || data.major_flood_level_m;
  }

  async river() {
    return await River.fromName(this.riverName);
  }

  getAlertLevel(waterLevelM) {
    if (waterLevelM === null || waterLevelM === undefined) {
      return Alert.NO_DATA;
    }
    if (waterLevelM >= this.majorFloodLevelM) {
      return Alert.MAJOR;
    }
    if (waterLevelM >= this.minorFloodLevelM) {
      return Alert.MINOR;
    }
    if (waterLevelM >= this.alertLevelM) {
      return Alert.ALERT;
    }
    return Alert.NORMAL;
  }
}
