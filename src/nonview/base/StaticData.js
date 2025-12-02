import { Cache } from "../base";
export default class StaticData {
  constructor(data) {
    this.name = data.name;
  }

  static async listAll() {
    const rawDataList = await Cache.get(
      `${this.getClassID()}.listAll`,
      async () => {
        try {
          const response = await fetch(
            process.env.PUBLIC_URL + `/data/static/${this.getClassID()}s.json`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          return await response.json();
        } catch (error) {
          console.error(`Error loading ${this.getClassID()}s:`, error);
          return [];
        }
      }
    );
    return rawDataList.map((rawData) => new this(rawData));
  }

  static async idx() {
    const list = await this.listAll();
    return Object.fromEntries(list.map((d) => [d.name, d]));
  }

  static async fromName(name) {
    const index = await this.idx();
    return index[name] || null;
  }
}
