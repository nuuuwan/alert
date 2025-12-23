import WWW from "../../../../base/WWW";
import WithLoadAllStaticMixin from "../../../../base/mixins/WithLoadAllStaticMixin";
import Region from "../Region";
import MultiPolygon from "../../../../base/geos/MultiPolygon";
import Cache from "../../../../base/Cache";
import WithNameMixin from "../../../../base/mixins/WithNameMixin.js";

class AdminRegion extends Region {
  static getEntTypeName() {
    return "Admin Region";
  }

  static getEntTypeNameShort() {
    return "";
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
    return ``;
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
          `/data/geo/json/smallest/${this.getAdminRegionType()}s.json/${id}.json`;
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

  static async loadAll() {
    const rawDataList = await this.getRawDataList();
    return await this.loadFromRawDataList(rawDataList);
  }

  static async loadNearest(latLng) {
    const allRegions = await this.loadAll();

    // Sort regions by distance to latLng
    const sortedRegions = allRegions.sort((regionA, regionB) => {
      const centroidA = regionA.multiPolygon.getCentroid();
      const centroidB = regionB.multiPolygon.getCentroid();

      if (!centroidA) return 1;
      if (!centroidB) return -1;

      const distanceA = latLng.distanceTo(centroidA);
      const distanceB = latLng.distanceTo(centroidB);

      return distanceA - distanceB;
    });

    // Find the first region where latLng is inside
    for (const region of sortedRegions) {
      if (region.isInside(latLng)) {
        return region;
      }
    }

    console.warn(
      `No ${this.getAdminRegionType()} contains the given latLng.` +
        ` Returning region with nearest centroid instead.`
    );
    return sortedRegions[0] || null;
  }
}

Object.assign(AdminRegion, WithLoadAllStaticMixin);
Object.assign(AdminRegion.prototype, WithNameMixin);

export default AdminRegion;
