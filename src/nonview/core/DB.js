import Place from "./ents/Place";
import LandslideWarning from "./events/LandslideWarning";
import RiverWaterLevelMeasurement from "./events/RiverWaterLevelMeasurement";
import LandslideRegionRole from "./roles/LandslideRegionRole";
import WeatherStationPlaceRole from "./roles/WeatherStationPlaceRole";

export default class DB {
  constructor() {}
  static async load() {
    const riverWaterLevelMeasurements =
      await RiverWaterLevelMeasurement.listAll();
    const weatherReports = await WeatherReport.listAll();
    const landslideWarnings = await LandslideWarning.listAll();

    const activeGaugingStationPlaces =
      await GaugingStationPlaceRole.listFromIds(
        riverWaterLevelMeasurements.map((m) => m.id)
      );
    const activeWeatherStationPlaces =
      await WeatherStationPlaceRole.listFromIds(
        weatherReports.map((w) => w.id)
      );
    const activeLandslideRegions = await LandslideRegionRole.listFromIds(
      landslideWarnings.map((w) => w.id)
    );

    const activePlaces = await Place.listFromIds([
      ...activeGaugingStationPlaces.map((p) => p.id),
      ...activeWeatherStationPlaces.map((p) => p.id),
    ]);

    const activeRegions = await Region.listFromIds([
      ...activeLandslideRegions.map((r) => r.id),
    ]);

    return {
      riverWaterLevelMeasurements,
      weatherReports,
      landslideWarnings,
      activeGaugingStationPlaces,
      activeWeatherStationPlaces,
      activeLandslideRegions,
      activePlaces,
      activeRegions,
    };
  }
}
