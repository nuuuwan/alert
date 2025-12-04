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

    const roleClasses = [WeatherStation, GaugingStation, LandslideArea];
    const roleIdxIdx = Object.fromEntries(
      await Promise.all(
        roleClasses.map(async function (RoleClass) {
          const roles = await RoleClass.listAll();
          return [RoleClass.getRoleTypeName(), roles];
        })
      )
    );

    const eventClasses = [
      RiverWaterLevelMeasurement,
      WeatherReport,
      LandslideWarning,
    ];
    const eventTdxIdx = Object.fromEntries(
      await Promise.all(
        eventClasses.map(async function (EventClass) {
          const events = await EventClass.listAll();
          return [EventClass.getEventTypeName(), events];
        })
      )
    );

    return {
      // Ents
      places,
      dsds,
      // Roles
      roleIdxIdx,
      // Events
      eventTdxIdx,
    };
  }
}
