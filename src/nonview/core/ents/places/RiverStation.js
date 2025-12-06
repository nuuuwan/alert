import Place from "./Place.js";
import WithDataStaticMixin from "../../../base/mixins/WithDataStaticMixin.js";
import LatLng from "../../../base/geos/LatLng.js";
class RiverStation extends Place {
  static getEntityTypeName() {
    return "River Station";
  }

  get title() {
    return this.name;
  }

  get subtitle() {
    return `${this.riverName} · ` + super.subtitle;
  }

  get elevation_m() {
    return this.openMeteoData.elevation_m;
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
      rawDataList.map(async (rawData) => {
        const latLng = LatLng.fromLatLngFloats(
          rawData.latLng || rawData.lat_lng
        );
        const placeData = await Place.loadData({
          latLng,
        });
        return new RiverStation({ ...rawData, ...placeData });
      })
    );
  }

  async loadDetails() {
    return await super.loadDetails();
  }
}

Object.assign(RiverStation, WithDataStaticMixin);

export default RiverStation;
