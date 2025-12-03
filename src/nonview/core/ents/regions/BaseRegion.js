export default class BaseRegion {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }

  async getLatLngListList() {
    return [];
  }

  static getRegionTypeTitle() {
    throw new Error("Not implemented");
  }
}
