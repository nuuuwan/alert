import WWW from "../../../../base/WWW";
import DataWithIDMixin from "../../../../base/mixins/DataWithIDMixin";
import Region from "../Region";
import MultiPolygon from "../../../../base/geos/MultiPolygon";
import Cache from "../../../../base/Cache";

class AdminRegion extends Region {
  static getAdminRegionType() {
    throw new Error("Not implemented");
  }
  static getUrl() {
    return (
      "https://raw.githubusercontent.com" +
      "/nuuuwan/gig-data/refs/heads/master" +
      `/ents/${this.getAdminRegionType()}.tsv`
    );
  }

  constructor(data) {
    super(data);
    this.id = data.id;
    this.name = data.name;
    this.population2012 = data.population2012 || data.population;
  }

  static async getGeoForId(id) {
    const revFloatPairListList = await Cache.get(
      `AdminRegion:getGeoForId:${this.getAdminRegionType()}:${id}`,
      async () => {
        const url =
          "https://raw.githubusercontent.com" +
          "/nuuuwan/gig-data/refs/heads/master" +
          `/geo/${this.getAdminRegionType()}/${id}.json`;
        return await WWW.fetch(url);
      }
    );

    return MultiPolygon.fromReverseRaw(revFloatPairListList);
  }

  static async loadFromData({ id, name, population2012 }) {
    const multiPolygon = await this.getGeoForId(id);
    return new this({ multiPolygon, id, name, population2012 });
  }

  static async getRawDataList() {
    return await Cache.get(
      `AdminRegion:getRawDataList:${this.getAdminRegionType()}`,
      async () => {
        return await WWW.fetch(this.getUrl());
      }
    );
  }

  static async loadAll() {
    const rawDataList = await this.getRawDataList();
    const adminRegionList = await Promise.all(
      rawDataList.slice(0, 5).map((rawData) =>
        this.loadFromData({
          id: rawData.id,
          name: rawData.name,
          population2012: rawData.population2012,
        })
      )
    );
    return adminRegionList;
  }
}

Object.assign(AdminRegion, DataWithIDMixin);

export default AdminRegion;
