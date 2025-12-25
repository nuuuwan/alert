import Place from "./Place.js";
import WithLoadAllStaticMixin from "../../../base/mixins/WithLoadAllStaticMixin.js";
import WithDataStaticStaticMixin from "../../../base/mixins/WithDataStaticStaticMixin.js";
import LatLng from "../../../base/geos/LatLng.js";
import WithNameMixin from "../../../base/mixins/WithNameMixin.js";

class FireStation extends Place {
  static getEntTypeName() {
    return "Fire Station";
  }

  get title() {
    return this.name;
  }

  get subtitle() {
    return "";
  }

  get url() {
    return `/FireStation/${this.getNameId()}`;
  }

  static getStaticDataID() {
    return "fire_stations";
  }

  constructor(data) {
    super(data);
    this.name = data.name;
  }

  static async loadAll() {
    const rawDataList = await this.getRawDataList();
    return await Promise.all(
      rawDataList.map(async (rawData) => {
        const latLng = LatLng.fromRaw(rawData.latLng || rawData.lat_lng);
        const placeData = await Place.loadData({
          latLng,
        });
        return new FireStation({ ...rawData, ...placeData });
      })
    );
  }
}

Object.assign(FireStation, WithDataStaticStaticMixin);
Object.assign(FireStation, WithLoadAllStaticMixin);
Object.assign(FireStation.prototype, WithNameMixin);

export default FireStation;
