import Place from "./ents/Place";
import LandslideWarning from "./events/LandslideWarning";
import RiverWaterLevelMeasurement from "./events/RiverWaterLevelMeasurement";
import LandslideRegionRole from "./roles/LandslideRegionRole";
import WeatherStationPlaceRole from "./roles/WeatherStationPlaceRole";
import WeatherReport from "./events/WeatherReport";
import GaugingStationPlaceRole from "./roles/GaugingStationPlaceRole";
import DSD from "./ents/regions/admin_regions/DSD";
export default class DB {
  static async load() {
    const riverWaterLevelMeasurements =
      await RiverWaterLevelMeasurement.listAll();
    const weatherReports = await WeatherReport.listAll();
    const landslideWarnings = await LandslideWarning.listAll();

    const activeGaugingStationPlaces =
      await GaugingStationPlaceRole.listFromIds(
        RiverWaterLevelMeasurement.uniqueIdsFromList(
          riverWaterLevelMeasurements
        )
      );
    const activeWeatherStationPlaces =
      await WeatherStationPlaceRole.listFromIds(
        WeatherReport.uniqueIdsFromList(weatherReports)
      );
    const activeLandslideRegions = await LandslideRegionRole.listFromIds(
      LandslideWarning.uniqueIdsFromList(landslideWarnings)
    );

    const activePlaces = await Place.listFromIds([
      ...GaugingStationPlaceRole.uniqueIdsFromList(activeGaugingStationPlaces),
      ...WeatherStationPlaceRole.uniqueIdsFromList(activeWeatherStationPlaces),
    ]);

    const activeRegions = await DSD.listFromIds(
      LandslideRegionRole.uniqueIdsFromList(activeLandslideRegions)
    );

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
