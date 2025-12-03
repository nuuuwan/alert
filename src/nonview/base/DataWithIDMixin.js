import WWW from "./WWW";
import Cache from "./Cache";

const DataWithIDMixin = {
  async listAll() {
    const url = this.getUrl();
    const cacheKey = `${this.name}.listAll.${url}`;

    const rawDataList = await Cache.get(cacheKey, async () => {
      return await WWW.fetch(url);
    });

    return this.listFromRawDataList(rawDataList);
  },

  listFromRawDataList(rawDataList) {
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
    const idx = await this.idx();
    return idList.map((id) => idx[id]);
  },

  uniqueIdsFromList(dataList) {
    const idList = dataList.filter((d) => d).map((d) => d.id);
    return [...new Set(idList)];
  },
};

export default DataWithIDMixin;
