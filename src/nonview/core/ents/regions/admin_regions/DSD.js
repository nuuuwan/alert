import AdminRegion from "./AdminRegion";
import WWW from "../../../../base/WWW";
import TimeUtils from "../../../../base/TimeUtils";
import Cache from "../../../../base/Cache";

export default class DSD extends AdminRegion {
  static getAdminRegionType() {
    return "dsd";
  }

  static getEntTypeTitle() {
    return "Divisional Secretariat Division";
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
      const timeUt = TimeUtils.parseYYYYMMDD(maxDateStr);
      return {
        timeUt,
        dsdIDToLatestLandslideWarning,
      };
    });
  }

  async loadDetails() {
    const { timeUt, dsdIDToLatestLandslideWarning } =
      await DSD.loadAllWarningData();
    this.latestLandslideWarningLevel =
      dsdIDToLatestLandslideWarning[this.id] || 0;
    this.latestLandslideWarningTimeUt = timeUt;
    return this;
  }
}
