import Cache from "../Cache.js";
import WWW from "../WWW.js";

const WithDataStaticMixin = {
  getUrl() {
    return (
      process.env.PUBLIC_URL + `/data/static/${this.getStaticDataID()}.json`
    );
  },

  async getRawDataList() {
    const url = this.getUrl();
    return await Cache.get(`WithDataStaticMixin.listAll:${url}`, async () => {
      const rawData = await WWW.fetch(url);
      const rawDataList = Array.isArray(rawData)
        ? rawData
        : this.rawDataToRawDataList(rawData);

      return rawDataList;
    });
  },
};

export default WithDataStaticMixin;
