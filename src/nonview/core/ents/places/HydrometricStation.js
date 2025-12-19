import Place from "./Place.js";
import WithLoadAllStaticMixin from "../../../base/mixins/WithLoadAllStaticMixin.js";
import WithDataStaticStaticMixin from "../../../base/mixins/WithDataStaticStaticMixin.js";
import LatLng from "../../../base/geos/LatLng.js";
import WWW from "../../../base/WWW.js";
import Cache from "../../../base/Cache.js";
import TimeUtils from "../../../base/TimeUtils.js";
import WithNameMixin from "../../../base/mixins/WithNameMixin.js";

class HydrometricStation extends Place {
  static getEntTypeName() {
    return "Hydrometric Station";
  }

  get title() {
    return this.name;
  }

  get subtitle() {
    return `${this.riverName}`;
  }

  get url() {
    return `/HydrometricStation/${this.getNameId()}`;
  }

  static getStaticDataID() {
    return "hydrometric_stations";
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
        return new HydrometricStation({ ...rawData, ...placeData });
      })
    );
  }

  async loadWaterLevelHistory() {
    const rawAlertData = await HydrometricStation.getRawAlertData();
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

    let waterLevelAlertLevel = 0;

    if (waterLevelHistory.length > 0) {
      this.latestWaterLevelM = waterLevelHistory[0].waterLevelM;
      this.latestWaterLevelTimeUt = waterLevelHistory[0].timeUt;

      if (this.latestWaterLevelM >= this.majorFloodLevelM) {
        waterLevelAlertLevel = 3;
      } else if (this.latestWaterLevelM >= this.minorFloodLevelM) {
        waterLevelAlertLevel = 2;
      } else if (this.latestWaterLevelM >= this.alertLevelM) {
        waterLevelAlertLevel = 1;
      }
    }
    this.waterLevelAlertLevel = waterLevelAlertLevel;
    return this;
  }

  async loadDetails() {
    await this.loadWaterLevelHistory();
    await super.loadDetails();
    return this;
  }

  get officialAlertLevel() {
    return Math.max(
      super.officialAlertLevel || 0,
      this.waterLevelAlertLevel || 0
    );
  }

  static async getRawAlertData() {
    const url =
      "https://raw.githubusercontent.com/nuuuwan/lk_irrigation/refs/heads/main/data/alert_data.json";
    return await Cache.get("HydrometricStation.getRawAlertData", async () => {
      return await WWW.fetchJSON(url);
    });
  }

  static async loadWithAlerts() {
    const HydrometricStations = await HydrometricStation.loadAll();
    const HydrometricStationsWithAlerts = (
      await Promise.all(
        HydrometricStations.map(async (HydrometricStation) => {
          await HydrometricStation.loadWaterLevelHistory();
          const alertLevel = HydrometricStation.alertLevel;
          if (alertLevel > 0) {
            return HydrometricStation;
          }
          return null;
        })
      )
    ).filter((HydrometricStation) => HydrometricStation !== null);
    return HydrometricStationsWithAlerts;
  }
}

Object.assign(HydrometricStation, WithDataStaticStaticMixin);
Object.assign(HydrometricStation, WithLoadAllStaticMixin);
Object.assign(HydrometricStation.prototype, WithNameMixin);

export default HydrometricStation;
