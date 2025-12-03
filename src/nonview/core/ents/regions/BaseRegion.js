export default class BaseRegion {
  constructor(id, name, polygons) {
    this.id = id;
    this.name = name;
  }

  async getPolygons() {
    return [];
  }
}
