import Place from "../../nonview/core/ents/Place";
import DSD from "../../nonview/core/ents/regions/admin_regions/DSD";
import WeatherStation from "../../nonview/core/roles/WeatherStation";
import GaugingStation from "../../nonview/core/roles/GaugingStation";
import LandslideArea from "../../nonview/core/roles/LandslideArea";
import WeatherReport from "../../nonview/core/events/WeatherReport";
import RiverWaterLevelMeasurement from "../../nonview/core/events/RiverWaterLevelMeasurement";
import LandslideWarning from "../../nonview/core/events/LandslideWarning";

export default class DB {
  static async load() {
    const places = await Place.listAll();
    const dsds = await DSD.listAll();

    const weatherStationIdx = await WeatherStation.idx();
    const gaugingStationIdx = await GaugingStation.idx();
    const landslideAreaIdx = await LandslideArea.idx();

    const riverWaterLevelTdx = await RiverWaterLevelMeasurement.tdx();
    const weatherReportTdx = await WeatherReport.tdx();
    const landslideWarningTdx = await LandslideWarning.tdx();

    return {
      // Ents
      places,
      dsds,
      // Roles
      weatherStationIdx,
      gaugingStationIdx,
      landslideAreaIdx,
      // Events
      riverWaterLevelTdx,
      weatherReportTdx,
      landslideWarningTdx,
    };
  }
}
