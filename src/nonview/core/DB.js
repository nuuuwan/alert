import GaugingStationPlace from "./roles/GaugingStationPlace.js";
import Place from "./ents/Place";
import RiverWaterLevelMeasurement from "./events/RiverWaterLevelMeasurement";
import Weather from "./Weather";

export default class DB {
  static async load() {
    const [
      gaugingStationPlaces,
      places,
      placeToLatestMeasurement,
      RiverWaterLevelMeasurementIdx,
      weatherList,
      locationToWeather,
    ] = await Promise.all([
      GaugingStationPlace.listAll(),
      Place.listAll(),
      RiverWaterLevelMeasurement.placeToLatestMeasurement(),
      RiverWaterLevelMeasurement.idx(),
      Weather.listAll(),
      Weather.idx(),
    ]);

    // Build location map
    const placeIdx = await Place.idx();

    // Build station alert map
    const gaugingStationToAlert = {};

    gaugingStationPlaces.forEach((gaugingStationPlace) => {
      const latestLevel = placeToLatestMeasurement[gaugingStationPlace.id];
      if (latestLevel) {
        const waterLevelM = latestLevel.waterLevelM;
        const alert = gaugingStationPlace.getAlert(waterLevelM);
        gaugingStationToAlert[gaugingStationPlace.name] = alert;
      }
    });

    return {
      gaugingStationPlaces,
      places,
      placeIdx,
      placeToLatestMeasurement,
      gaugingStationToAlert,
      RiverWaterLevelMeasurementIdx,
      weatherList,
      locationToWeather,
    };
  }
}
