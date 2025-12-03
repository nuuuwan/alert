import WWW from "./WWW";
import Cache from "./Cache";

const DataWithIDMixin = {
  async listAll() {
    const url = this.getUrl();
    const cacheKey = `${this.name}.listAll`;

    const rawDataList = await Cache.get(cacheKey, async () => {
      return await WWW.fetchJSON(url);
    });

    return rawDataList.map((rawData) => new this(rawData));
  },

  async idx() {
    const list = await this.listAll();
    return Object.fromEntries(list.map((d) => [d.id, d]));
  },

  async fromID(id) {
    const index = await this.idx();
    return index[id] || null;
  },

  async listFromIds(idList) {
    const index = await this.idx();
    return idList.map((id) => index[id]).filter((item) => item !== undefined);
  },
};

export default DataWithIDMixin;
