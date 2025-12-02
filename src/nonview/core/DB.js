import Station from "./Station";
import Location from "./Location";
import River from "./River";
import RiverWaterLevel from "./RiverWaterLevel";

export default class DB {
  static async load() {
    const [stations, locations, rivers, stationToLatest] = await Promise.all([
      Station.listAll(),
      Location.listAll(),
      River.listAll(),
      RiverWaterLevel.stationToLatest(),
    ]);

    // Build location map
    const locationMap = {};
    stations.forEach((station) => {
      locationMap[station.name] = station.latLng;
    });
    locations.forEach((location) => {
      locationMap[location.name] = location.latLng;
    });

    // Build station color and alert maps
    const stationToColor = {};
    const nameToAlert = {};

    stations.forEach((station) => {
      const latestLevel = stationToLatest[station.name];
      if (latestLevel) {
        const waterLevelM = latestLevel.waterLevelM;
        const alert = station.getAlert(waterLevelM);
        const [r, g, b] = alert.color;
        stationToColor[station.name] = `rgb(${r * 255}, ${g * 255}, ${
          b * 255
        })`;
        nameToAlert[station.name] = alert;
      }
    });

    return {
      stations,
      locations,
      rivers,
      locationMap,
      stationToLatest,
      stationToColor,
      nameToAlert,
    };
  }
}
