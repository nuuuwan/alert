import { WWW } from "../../../../base";
import DataWithIDMixin from "../../../../base/mixins/DataWithIDMixin";
import BaseRegion from "../BaseRegion";

class BaseAdminRegion extends BaseRegion {
  static getAdminRegionType() {
    throw new Error("Not Implemented");
  }

  static getEntTypeTitle() {
    return this.getAdminRegionType().toUpperCase();
  }

  constructor(data) {
    super({
      id: data.id,
      name: data.name,
    });
    this.population2012 = data.population2012 || data.population;
  }

  static getUrl() {
    return (
      "https://raw.githubusercontent.com" +
      "/nuuuwan/gig-data/refs/heads/master" +
      `/ents/${this.getAdminRegionType()}.tsv`
    );
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
}

Object.assign(BaseAdminRegion, DataWithIDMixin);

export default BaseAdminRegion;
