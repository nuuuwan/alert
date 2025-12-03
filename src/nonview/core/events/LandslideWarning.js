import { Cache } from "../../base/index.js";
import LandslideRegionRole from "../roles/LandslideRegionRole.js";
export default class LandslideWarning extends BaseEvent {
  static getRoleClass() {
    return LandslideRegionRole;
  }
  constructor(data) {
    this.dateID = data.dateID || data.date_id;
    this.levelToDistrictToDSD =
      data.levelToDistrictToDSD || data.level_to_district_to_dsds || {};
  }

  static async getLatest() {
    const cachedData = await Cache.get("landslideWarning.listAll", async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/nuuuwan/lk_dmc_landslides/refs/heads/main/data/latest.json"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error loading landslide warnings:", error);
        return [];
      }
    });

    return new LandslideWarning(cachedData);
  }
}
