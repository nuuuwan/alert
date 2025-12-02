import Station from "./Station";
import Location from "./Location";
import River from "./River";
import RiverWaterLevel from "./RiverWaterLevel";
import Weather from "./Weather";

export default class DB {
  static async load() {
    const [
      stations,
      locations,
      rivers,
      stationToLatest,
      riverWaterLevelIdx,
      weatherList,
      locationToWeather,
    ] = await Promise.all([
      Station.listAll(),
      Location.listAll(),
      River.listAll(),
      RiverWaterLevel.stationToLatest(),
      RiverWaterLevel.idx(),
      Weather.listAll(),
      Weather.idx(),
    ]);

    // Build location map
    const locationMap = {};
    stations.forEach((station) => {
      locationMap[station.name] = station.latLng;
    });
    locations.forEach((location) => {
      locationMap[location.name] = location.latLng;
    });

    // Build station alert map
    const stationToAlert = {};

    stations.forEach((station) => {
      const latestLevel = stationToLatest[station.name];
      if (latestLevel) {
        const waterLevelM = latestLevel.waterLevelM;
        const alert = station.getAlert(waterLevelM);
        stationToAlert[station.name] = alert;
      }
    });

    return {
      stations,
      locations,
      rivers,
      locationMap,
      stationToLatest,
      stationToAlert,
      riverWaterLevelIdx,
      weatherList,
      locationToWeather,
    };
  }
}
