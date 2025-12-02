import { Cache } from "../base";

export default class RiverWaterLevel {
  constructor(data) {
    this.stationName = data.station_name;
    this.timeUt = data.time_ut;
    this.waterLevelM = data.water_level_m;
  }

  static async listAll() {
    return await Cache.get("riverWaterLevel.listAll", async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/nuuuwan/lk_irrigation/refs/heads/main/data/all.json"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.map((levelData) => new RiverWaterLevel(levelData));
      } catch (error) {
        console.error("Error loading river water levels:", error);
        return [];
      }
    });
  }

  static async idx() {
    const list = await this.listAll();
    const index = {};

    for (const level of list) {
      if (!index[level.stationName]) {
        index[level.stationName] = [];
      }
      index[level.stationName].push(level);
    }

    for (const stationName in index) {
      index[stationName].sort((a, b) => a.timeUt - b.timeUt);
    }

    return index;
  }

  get date() {
    return new Date(this.timeUt * 1000);
  }
}
