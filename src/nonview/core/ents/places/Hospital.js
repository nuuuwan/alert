import Place from "./Place.js";
import WithLoadAllStaticMixin from "../../../base/mixins/WithLoadAllStaticMixin.js";
import WithDataStaticStaticMixin from "../../../base/mixins/WithDataStaticStaticMixin.js";
import LatLng from "../../../base/geos/LatLng.js";
import WithNameMixin from "../../../base/mixins/WithNameMixin.js";

class Hospital extends Place {
  static getEntTypeName() {
    return "Hospital";
  }

  get title() {
    return this.name;
  }

  get subtitle() {
    return "";
  }

  get url() {
    return `/Hospital/${this.getNameId()}`;
  }

  static getStaticDataID() {
    return "hospitals";
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
        return new Hospital({ ...rawData, ...placeData });
      })
    );
  }
}

Object.assign(Hospital, WithDataStaticStaticMixin);
Object.assign(Hospital, WithLoadAllStaticMixin);
Object.assign(Hospital.prototype, WithNameMixin);

export default Hospital;
