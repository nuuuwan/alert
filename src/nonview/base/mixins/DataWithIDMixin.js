import WWW from "../WWW";
import Cache from "../Cache";

const DataWithIDMixin = {
  async listAll() {
    const url = this.getUrl();
    const rawDataList = await Cache.get(
      `DataWithIDMixin.listAll:${url}`,
      async () => {
        const rawData = await WWW.fetch(url);
        const rawDataList = Array.isArray(rawData)
          ? rawData
          : this.rawDataToRawDataList(rawData);

        return rawDataList;
      },
    );
    return this.listFromRawDataList(rawDataList);
  },

  listFromRawDataList(rawDataList) {
    const oList = rawDataList.map((rawData) => new this(rawData));
    const sortedOList = oList.sort((a, b) => b.timeUt - a.timeUt);
    return sortedOList;
  },

  async idx() {
    const list = await this.listAll();
    return Object.fromEntries(list.map((d) => [d.id, d]));
  },

  async idxTdx() {
    const list = await this.listAll();
    return list.reduce(function (tdx, d) {
      const id = d.id;
      const timeUt = d.timeUt;
      if (!tdx[id]) {
        tdx[id] = {};
      }
      tdx[id][timeUt] = d;
      return tdx;
    }, {});
  },

  async fromID(id) {
    const index = await this.idx();
    return index[id] || null;
  },

  async listFromIds(idList) {
    const idx = await this.idx();
    return idList.map((id) => idx[id]);
  },

  async listForId(id) {
    const list = await this.listAll();
    return list.filter((d) => d.id === id);
  },

  uniqueIdsFromList(dataList) {
    const idList = dataList.filter((d) => d).map((d) => d.id);
    return [...new Set(idList)];
  },
};

export default DataWithIDMixin;
