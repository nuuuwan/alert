import Place from "./Place.js";
import WithDataStaticMixin from "../../../base/mixins/WithDataStaticMixin.js";
import LatLng from "../../../base/geos/LatLng.js";
class RiverStation extends Place {
  static getEntityTypeName() {
    return "River Station";
  }

  static getStaticDataID() {
    return "river_stations";
  }

  constructor(data) {
    super(data);
    this.name = data.name;
    this.riverName = data.riverName || data.river_name;
    this.alertLevelM = data.alertLevelM || data.alert_level_m;
    this.minorFloodLevelM = data.minorFloodLevelM || data.minor_flood_level_m;
    this.majorFloodLevelM = data.majorFloodLevelM || data.major_flood_level_m;
  }

  static async loadAll() {
    const rawDataList = await this.getRawDataList();
    return Promise.all(
      rawDataList.slice(0, 1).map(async (rawData) => {
        const latLng = LatLng.fromLatLngFloats(
          rawData.latLng || rawData.lat_lng
        );
        const placeData = await Place.loadData({
          latLng,
        });
        console.debug("placeData", placeData);
        console.debug("rawData", rawData);
        return new RiverStation({ ...rawData, ...placeData });
      })
    );
  }
}

Object.assign(RiverStation, WithDataStaticMixin);

export default RiverStation;
