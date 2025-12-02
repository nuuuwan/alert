import { Cache } from "../base";
export default class StaticData {
  constructor(data) {
    this.name = data.name;
  }

  static async listAll() {
    return await Cache.get(`${this.getClassID()}.listAll`, async () => {
      try {
        const response = await fetch(
          process.env.PUBLIC_URL + `/data/static/${this.getClassID()}s.json`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.map((itemData) => new this(itemData));
      } catch (error) {
        console.error(`Error loading ${this.getClassID()}s:`, error);
        return [];
      }
    });
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
