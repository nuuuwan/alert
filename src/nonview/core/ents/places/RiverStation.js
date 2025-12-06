import Place from "../Place.js";
import WithDataStaticMixin from "../../../base/mixins/WithStaticDataMixin.js";

class RiverStation extends Place {
  static getEntityTypeName() {
    return "River Station";
  }

  static getStaticDataID() {
    return "river_stations";
  }

  constructor({ data }) {
    super({ data });
    this.name = data.name;
    this.riverName = data.riverName || data.river_name;
    this.alertLevelM = data.alertLevelM || data.alert_level_m;
    this.minorFloodLevelM = data.minorFloodLevelM || data.minor_flood_level_m;
    this.majorFloodLevelM = data.majorFloodLevelM || data.major_flood_level_m;
  }
}

Object.assign(RiverStation, WithDataStaticMixin);

export default RiverStation;
