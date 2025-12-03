import Alert from "../../core/Alert";

export default class GaugingStationPlace {
  constructor(data) {
    super(data);
    this.riverName = data.riverName || data.river_name;
    this.alertLevelM = data.alertLevelM || data.alert_level_m;
    this.minorFloodLevelM = data.minorFloodLevelM || data.minor_flood_level_m;
    this.majorFloodLevelM = data.majorFloodLevelM || data.major_flood_level_m;
  }

  static async listAll() {
    const url = process.env.PUBLIC_URL + `/data/static/gauging_stations.json`;
    const rawDataList = await WWW.fetchJSON(url);
    return rawDataList.map((rawData) => new this(rawData));
  }

  getAlert(waterLevelM) {
    if (waterLevelM === null || waterLevelM === undefined) {
      return Alert.NO_DATA;
    }
    if (waterLevelM >= this.majorFloodLevelM) {
      return Alert.MAJOR;
    }
    if (waterLevelM >= this.minorFloodLevelM) {
      return Alert.MINOR;
    }
    if (waterLevelM >= this.alertLevelM) {
      return Alert.ALERT;
    }
    return Alert.NORMAL;
  }
}
