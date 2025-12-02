import { Cache } from "../base";

export default class Ent {
  constructor(id, entType, name) {
    this.id = id;
    this.entType = entType;
    this.name = name;
  }

  async getlngLatListList() {
    const url = `https://raw.githubusercontent.com/nuuuwan/gig-data/refs/heads/master/geo/${this.entType}/${this.id}.json`;

    const lngLatListList = await Cache.get(
      `ent.getlngLatListList.${this.id}`,
      async () => {
        try {
          const response = await fetch(url);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const latLngListList = await response.json();
          const lngLatListList = latLngListList.map((latLngList) =>
            latLngList.map((latLng) => [latLng[1], latLng[0]])
          );

          return lngLatListList;
        } catch (error) {
          console.error(`Error loading geo data for ${this.id}:`, error);
          return [];
        }
      }
    );

    return lngLatListList;
  }
}
