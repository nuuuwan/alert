import { WWW } from "../../../../base";
import BaseRegion from "../BaseRegion";

export default class BaseAdminRegion extends BaseRegion {
  static getAdminRegionType() {
    throw new Error("Not Implemented");
  }

  constructor(id, name, population2012) {
    super(id, name);
    this.population2012 = population2012;
  }

  async getLatLngListList() {
    const url =
      "https://raw.githubusercontent.com" +
      "/nuuuwan/gig-data/refs/heads/master" +
      `/geo/${this.constructor.getAdminRegionType()}/${this.id}.json`;
    const lngLatListList = await WWW.fetchJSON(url);
    const latLngListList = lngLatListList.map((lngLatList) =>
      lngLatList.map(([lng, lat]) => [lat, lng]),
    );
    return latLngListList;
  }

  static async listAll() {
    const url =
      "https://raw.githubusercontent.com" +
      "/nuuuwan/gig-data/refs/heads/master" +
      `/ents/${this.getAdminRegionType()}.tsv`;
    const dList = await WWW.fetchTSV(url);
    return dList.map(
      (d) =>
        new this(
          d.id,
          d.name,
          d.population_2012 ? parseInt(d.population_2012) : null,
        ),
    );
  }

  static async idx() {
    const list = await this.listAll();
    return Object.fromEntries(list.map((region) => [region.id, region]));
  }

  static async fromID(id) {
    const index = await this.idx();
    return index[id] || null;
  }
}
