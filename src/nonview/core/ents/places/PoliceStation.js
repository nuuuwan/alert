import Place from "./Place.js";
import WithLoadAllStaticMixin from "../../../base/mixins/WithLoadAllStaticMixin.js";
import WithDataStaticStaticMixin from "../../../base/mixins/WithDataStaticStaticMixin.js";
import LatLng from "../../../base/geos/LatLng.js";
import WithNameMixin from "../../../base/mixins/WithNameMixin.js";

class PoliceStation extends Place {
  static getEntTypeName() {
    return "Police Station";
  }

  get title() {
    return this.name;
  }

  get subtitle() {
    return "";
  }

  get url() {
    return `/PoliceStation/${this.getNameId()}`;
  }

  static getStaticDataID() {
    return "police_stations";
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
        return new PoliceStation({ ...rawData, ...placeData });
      })
    );
  }
}

Object.assign(PoliceStation, WithDataStaticStaticMixin);
Object.assign(PoliceStation, WithLoadAllStaticMixin);
Object.assign(PoliceStation.prototype, WithNameMixin);

export default PoliceStation;
