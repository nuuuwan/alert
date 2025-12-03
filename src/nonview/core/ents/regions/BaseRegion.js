export default class BaseRegion {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  async getLngLatListList() {
    return [];
  }
}
