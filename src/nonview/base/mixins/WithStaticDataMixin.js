import Cache from "../../utils/Cache.js";

const WithDataStaticMixin = {
  getStaticDataID() {
    throw new Error("Not implemented");
  },

  listFromRawDataList(rawDataList) {
    return rawDataList.map((rawData) => new this({ data: rawData }));
  },

  getUrl() {
    return (
      process.env.PUBLIC_URL + `/data/static/${this.getStaticDataID()}.json`
    );
  },

  async listAll() {
    const url = this.getUrl();
    const rawDataList = await Cache.get(
      `WithDataStaticMixin.listAll:${url}`,
      async () => {
        const rawData = await WWW.fetch(url);
        const rawDataList = Array.isArray(rawData)
          ? rawData
          : this.rawDataToRawDataList(rawData);

        return rawDataList;
      }
    );
    return this.listFromRawDataList(rawDataList);
  },
};

export default WithDataStaticMixin;
