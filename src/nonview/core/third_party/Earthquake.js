import WWW from "../../base/WWW";
import LatLng from "../../base/geos/LatLng";

export default class Earthquake {
  static URL_RECENT_EARTHQUAKES =
    "https://raw.githubusercontent.com/nuuuwan/lk_tsunamis/refs/heads/main/data/recent_earthquakes.json";

  constructor(data) {
    this.latLng = LatLng.fromRaw([data.lat_lng]);
    this.magnitude = data.magnitude;
    this.title = data.title;
    this.timeUt = data.time_ut;
    this.url = data.url;
  }

  static async loadAllRecent() {
    const rawData = await WWW.fetchJSON(this.URL_RECENT_EARTHQUAKES);
    return rawData.map((data) => new Earthquake(data));
  }

  static getSourceList() {
    return [
      {
        label: "USGS Earthquake Data (via lk_tsunamis)",
        url: "https://github.com/nuuuwan/lk_tsunamis",
      },
    ];
  }
}
