import { Cache } from "../base";

export default class Ent {
  constructor(data) {
    this.id = data.id;
    this.entType = data.entType || data.ent_type;
    this.name = data.name;
  }

  async getGeo() {
    const url = `https://raw.githubusercontent.com/nuuuwan/gig-data/refs/heads/master/geo/${this.entType}/${this.id}.json`;

    const geoData = await Cache.get(`ent.getGeo.${this.id}`, async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return data;
      } catch (error) {
        console.error(`Error loading geo data for ${this.id}:`, error);
        return [];
      }
    });

    return geoData;
  }
}
