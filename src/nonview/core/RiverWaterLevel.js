export default class RiverWaterLevel {
  constructor(data) {
    this.stationName = data.station_name;
    this.timeUt = data.time_ut;
    this.waterLevelM = data.water_level_m;
  }
}
