import AdminRegion from "./AdminRegion";
import WWW from "../../../../base/WWW";
import TimeUtils from "../../../../base/TimeUtils";
import Cache from "../../../../base/Cache";

export default class DSD extends AdminRegion {
  get districtId() {
    return this.id.substring(0, 5);
  }

  get provinceId() {
    return this.id.substring(0, 4);
  }

  static getAdminRegionType() {
    return "dsd";
  }

  static getEntTypeName() {
    return "Divisional Secretariat Division";
  }
  static getEntTypeNameShort() {
    return "DSD";
  }

  static async loadAllWarningData() {
    return await Cache.get("DSD.loadAllWarningData", async () => {
      const url =
        "https://raw.githubusercontent.com/nuuuwan/lk_dmc_landslides/refs/heads/main/data/alert_data.json";
      const alertData = await WWW.fetch(url);
      const dsdIDToDateStrToLevel = alertData["event_data"];
      const maxDateStr = Object.values(dsdIDToDateStrToLevel).reduce(function (
        maxDateStr,
        dateStrToLevel,
      ) {
        return Object.keys(dateStrToLevel).reduce(function (
          maxDateStr,
          dateStr,
        ) {
          return dateStr > maxDateStr ? dateStr : maxDateStr;
        }, maxDateStr);
      }, "00000000");
      const dsdIDToLatestLandslideWarning = Object.fromEntries(
        Object.entries(dsdIDToDateStrToLevel)
          .map(([dsdID, dateStrToLevel]) => [
            dsdID,
            dateStrToLevel[maxDateStr] || 0,
          ])
          .filter((entry) => entry[1]),
      );
      const timeUt = TimeUtils.parseYYYYMMDD(maxDateStr) + 3_600 * 16;
      return {
        timeUt,
        dsdIDToLatestLandslideWarning,
      };
    });
  }

  async loadDetails() {
    await Promise.all([this.loadLandslideWarningData(), this.loadSexAgeData()]);
    return this;
  }

  async loadLandslideWarningData() {
    const { timeUt, dsdIDToLatestLandslideWarning } =
      await DSD.loadAllWarningData();

    this.latestLandslideWarningLevel =
      dsdIDToLatestLandslideWarning[this.id] || 0;
    this.latestLandslideWarningTimeUt = timeUt;
    return this;
  }

  get alertLevel() {
    return this.latestLandslideWarningLevel;
  }

  static async loadWithAlerts() {
    const warningsData = await DSD.loadAllWarningData();
    const dsdIds = Object.keys(warningsData.dsdIDToLatestLandslideWarning);
    return await DSD.loadFromIds(dsdIds);
  }

  static async loadAllSexAgeDataIdx() {
    const url =
      "https://raw.githubusercontent.com/nuuuwan/lk_census_2024/refs/heads" +
      "/main/data/Basic-Population" +
      "/Population-by-sex-age-and-district-according-to-DSD/data.json";

    const dList = await Cache.get("DSD.loadAllSexAgeData", async () => {
      return await WWW.fetch(url);
    });
    return Object.fromEntries(dList.map((d) => [d["region_id"], d]));
  }

  async loadSexAgeData() {
    const idx = await DSD.loadAllSexAgeDataIdx();
    const data = idx[this.id];
    if (!data) {
      console.error(`No sex/age data found for DSD id ${this.id}`);
      return this;
    }
    this.sexAgeData = {
      population: data["total"],
      malePopulation: data["sex-male"],
      femalePopulation: data["sex-female"],
      ageUnder15: data["age-under-15"],
      age15to59: data["age-15-to-59"],
      age60to64: data["age-60-to-64"],
      age65andOver: data["age-65-and-over"],
    };
    return this;
  }
}
