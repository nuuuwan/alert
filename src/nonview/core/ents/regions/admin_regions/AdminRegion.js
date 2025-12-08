import WWW from "../../../../base/WWW";
import DataWithIDMixin from "../../../../base/mixins/DataWithIDMixin";
import Region from "../Region";
import MultiPolygon from "../../../../base/geos/MultiPolygon";
import Cache from "../../../../base/Cache";

class AdminRegion extends Region {
  static getEntTypeName() {
    return "Admin Region";
  }
  static getAdminRegionType() {
    throw new Error("Not implemented");
  }
  static getUrl() {
    return (
      "https://raw.githubusercontent.com" +
      "/nuuuwan/lk_admin_regions/refs/heads/main" +
      `/data/ents/${this.getAdminRegionType()}s.tsv`
    );
  }

  get supertitle() {
    return this.constructor.getEntTypeName();
  }

  get title() {
    return this.name;
  }

  get subtitle() {
    return `${this.areaSqKm.toFixed(0)} km²`;
  }

  constructor(data) {
    super(data);
    this.id = data.id;
    this.name = data.name;
    this.areaSqKm = data.areaSqKm;
  }

  async loadDetails() {
    return this;
  }

  static async getGeoForId(id) {
    const revFloatPairListList = await Cache.get(
      `AdminRegion:getGeoForId:${this.getAdminRegionType()}:${id}`,
      async () => {
        const url =
          "https://raw.githubusercontent.com" +
          "/nuuuwan/lk_admin_regions/refs/heads/main" +
          `/data/geo/json/smaller/${this.getAdminRegionType()}s.json/${id}.json`;
        return await WWW.fetch(url);
      }
    );

    return MultiPolygon.fromReverseRaw(revFloatPairListList);
  }

  static async loadFromData({ id, name, areaSqKm }) {
    const multiPolygon = await this.getGeoForId(id);
    return new this({ multiPolygon, id, name, areaSqKm });
  }

  static async getRawDataList() {
    return await Cache.get(
      `AdminRegion:getRawDataList:${this.getAdminRegionType()}`,
      async () => {
        return await WWW.fetch(this.getUrl());
      }
    );
  }

  static async loadFromRawDataList(rawDataList) {
    return await Promise.all(
      rawDataList.map((rawData) =>
        this.loadFromData({
          id: rawData.id,
          name: rawData.name,
          areaSqKm: parseFloat(rawData.area_sqkm),
        })
      )
    );
  }

  static async loadFromIds(ids) {
    const rawDataList = await this.getRawDataList();
    const filteredRawDataList = rawDataList.filter((rawData) =>
      ids.includes(rawData.id)
    );
    return await this.loadFromRawDataList(filteredRawDataList);
  }

  static async loadAll() {
    const rawDataList = await this.getRawDataList();
    return await this.loadFromRawDataList(rawDataList);
  }
}

Object.assign(AdminRegion, DataWithIDMixin);

export default AdminRegion;
