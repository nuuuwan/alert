import Place from "./Place.js";
import WithDataStaticMixin from "../../../base/mixins/WithDataStaticMixin.js";
import LatLng from "../../../base/geos/LatLng.js";
import WWW from "../../../base/WWW.js";
import Cache from "../../../base/Cache.js";
import TimeUtils from "../../../base/TimeUtils.js";

class RiverStation extends Place {
  static getEntTypeName() {
    return "River Station";
  }

  get title() {
    return this.name;
  }

  get subtitle() {
    return `${this.riverName} · ` + super.subtitle;
  }

  static getStaticDataID() {
    return "river_stations";
  }

  constructor(data) {
    super(data);
    this.name = data.name;
    this.riverName = data.riverName || data.river_name;
    this.alertLevelM = data.alertLevelM || data.alert_level_m;
    this.minorFloodLevelM = data.minorFloodLevelM || data.minor_flood_level_m;
    this.majorFloodLevelM = data.majorFloodLevelM || data.major_flood_level_m;
  }

  static async loadAll() {
    const rawDataList = await this.getRawDataList();
    return await Promise.all(
      rawDataList.map(async (rawData) => {
        const latLng = LatLng.fromRaw(rawData.latLng || rawData.lat_lng);
        const placeData = await Place.loadData({
          latLng,
        });
        return new RiverStation({ ...rawData, ...placeData });
      })
    );
  }

  async loadWaterLevelHistory() {
    const rawAlertData = await RiverStation.getRawAlertData();
    const eventData = rawAlertData["event_data"];
    const eventDataForThisStation = eventData[this.name];
    const minTimeUt = TimeUtils.getUnixTime() - TimeUtils.SECONDS_IN.WEEK;
    const waterLevelHistory = Object.entries(eventDataForThisStation)
      .reduce(function (waterLevelHistory, [dateId, timeOnlyIdToWaterLevelM]) {
        return Object.entries(timeOnlyIdToWaterLevelM).reduce(function (
          waterLevelHistory,
          [timeOnlyId, waterLevelM]
        ) {
          const timeUt = TimeUtils.parseYYYYMMDDHHHMMSS(
            `${dateId}${timeOnlyId}`
          );
          if (timeUt > minTimeUt) {
            waterLevelHistory.push({ timeUt, waterLevelM });
          }
          return waterLevelHistory;
        },
        waterLevelHistory);
      }, [])
      .sort(TimeUtils.compareTimeUtDescending);
    this.waterLevelHistory = waterLevelHistory;

    let alertLevel = 0;

    if (waterLevelHistory.length > 0) {
      this.latestWaterLevelM = waterLevelHistory[0].waterLevelM;
      this.latestWaterLevelTimeUt = waterLevelHistory[0].timeUt;

      if (this.latestWaterLevelM >= this.majorFloodLevelM) {
        alertLevel = 3;
      } else if (this.latestWaterLevelM >= this.minorFloodLevelM) {
        alertLevel = 2;
      } else if (this.latestWaterLevelM >= this.alertLevelM / 2) {
        alertLevel = 1;
      }
    }
    this.alertLevel = alertLevel;
    return this;
  }

  async loadDetails() {
    await this.loadWaterLevelHistory();
    await super.loadDetails();
    return this;
  }

  static async getRawAlertData() {
    const url =
      "https://raw.githubusercontent.com/nuuuwan/lk_irrigation/refs/heads/main/data/alert_data.json";
    return await Cache.get("RiverStation.getRawAlertData", async () => {
      return await WWW.fetchJSON(url);
    });
  }

  static async loadWithAlerts() {
    const riverStations = await RiverStation.loadAll();
    const riverStationsWithAlerts = (
      await Promise.all(
        riverStations.map(async (riverStation) => {
          await riverStation.loadWaterLevelHistory();
          const alertLevel = riverStation.alertLevel;
          if (alertLevel > 0) {
            return riverStation;
          }
          return null;
        })
      )
    ).filter((riverStation) => riverStation !== null);
    return riverStationsWithAlerts;
  }
}

Object.assign(RiverStation, WithDataStaticMixin);

export default RiverStation;
