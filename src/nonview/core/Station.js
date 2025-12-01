export default class Station {
  constructor(data) {
    this.name = data.name;
    this.riverName = data.river_name;
    this.districtId = data.district_id;
    this.latLng = data.lat_lng;
    this.alertLevelM = data.alert_level_m;
    this.minorFloodLevelM = data.minor_flood_level_m;
    this.majorFloodLevelM = data.major_flood_level_m;
  }

  static async listAll() {
    try {
      const response = await fetch(
        process.env.PUBLIC_URL + "/data/static/stations.json"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.map((stationData) => new Station(stationData));
    } catch (error) {
      console.error("Error loading stations:", error);
      return [];
    }
  }

  get latitude() {
    return this.latLng[0];
  }

  get longitude() {
    return this.latLng[1];
  }
}
