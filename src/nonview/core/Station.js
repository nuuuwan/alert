import Location from "./Location.js";
import River from "./River.js";

export default class Station extends Location {
  static getClassID() {
    return "station";
  }
  constructor(data) {
    super(data);
    // this.name and this.latLng are set in StaticData and Location
    this.riverName = data.river_name;
    this.districtId = data.district_id;
    this.alertLevelM = data.alert_level_m;
    this.minorFloodLevelM = data.minor_flood_level_m;
    this.majorFloodLevelM = data.major_flood_level_m;
  }

  async river() {
    return await River.fromName(this.riverName);
  }
}
