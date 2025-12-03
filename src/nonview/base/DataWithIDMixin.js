import WWW from "./WWW";
import Cache from "./Cache";

export default class DataWithIDMixin {
  constructor(data) {
    this.id = data.id;
  }

  static getUrl() {
    throw new Error("getUrl() must be implemented by subclass");
  }

  static async listAll() {
    const url = this.getUrl();
    const cacheKey = `${this.name}.listAll`;

    const rawDataList = await Cache.get(cacheKey, async () => {
      return await WWW.fetchJSON(url);
    });

    return rawDataList.map((rawData) => new this(rawData));
  }

  static async idx() {
    const list = await this.listAll();
    return Object.fromEntries(list.map((d) => [d.id, d]));
  }

  static async fromID(id) {
    const index = await this.idx();
    return index[id] || null;
  }
}
