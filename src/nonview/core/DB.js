import Place from "../../nonview/core/ents/Place";
import DSD from "../../nonview/core/ents/regions/admin_regions/DSD";
import WeatherStation from "../../nonview/core/roles/WeatherStation";
import GaugingStation from "../../nonview/core/roles/GaugingStation";
import LandslideArea from "../../nonview/core/roles/LandslideArea";
import WeatherReport from "../../nonview/core/events/WeatherReport";
import RiverWaterLevelMeasurement from "../../nonview/core/events/RiverWaterLevelMeasurement";
import LandslideWarning from "../../nonview/core/events/LandslideWarning";
import MajorFlood from "./alerts/MajorFlood";
import MinorFlood from "./alerts/MinorFlood";
import AlertFlood from "./alerts/AlertFlood";
import ExtremeHeat from "./alerts/ExtremeHeat";
import ExtremeRain from "./alerts/ExtremeRain";
import VeryHeavyRain from "./alerts/VeryHeavyRain";
import HeavyRain from "./alerts/HeavyRain";
import LandslideWarningLevel3 from "./alerts/LandslideWarningLevel3";
import LandslideWarningLevel2 from "./alerts/LandslideWarningLevel2";
import LandslideWarningLevel1 from "./alerts/LandslideWarningLevel1";

export default class DB {
  static async load() {
    // Ents
    const places = await Place.listAll();
    const dsds = await DSD.listAll();
    const ents = [...places, ...dsds];

    const placeIdx = await Place.idx();
    const dsdIdx = await DSD.idx();
    const entIdx = { ...placeIdx, ...dsdIdx };

    // Roles
    const roleClasses = [WeatherStation, GaugingStation, LandslideArea];
    const roleNdxIdx = Object.fromEntries(
      await Promise.all(
        roleClasses.map(async function (RoleClass) {
          const roles = await RoleClass.idx();
          return [RoleClass.getRoleTypeName(), roles];
        })
      )
    );
    const roleIdxNdx = Object.entries(roleNdxIdx).reduce(function (
      roleIdxNdx,
      [name, roleIdx]
    ) {
      return Object.entries(roleIdx).reduce(function (roleIdxNdx, [id, role]) {
        if (!roleIdxNdx[id]) {
          roleIdxNdx[id] = {};
        }
        roleIdxNdx[id][name] = role;
        return roleIdxNdx;
      }, roleIdxNdx);
    },
    {});

    // Events
    const eventClasses = [
      RiverWaterLevelMeasurement,
      WeatherReport,
      LandslideWarning,
    ];
    const eventNdxIdxTdx = Object.fromEntries(
      await Promise.all(
        eventClasses.map(async function (EventClass) {
          const events = await EventClass.idxTdx();
          return [EventClass.getEventTypeName(), events];
        })
      )
    );

    const eventIdxNdxTdx = Object.entries(eventNdxIdxTdx).reduce(function (
      eventIdxNdxTdx,
      [name, eventIdxTdx]
    ) {
      return Object.entries(eventIdxTdx).reduce(function (
        eventIdxNdxTdx,
        [id, eventTdx]
      ) {
        if (!eventIdxNdxTdx[id]) {
          eventIdxNdxTdx[id] = {};
        }
        eventIdxNdxTdx[id][name] = eventTdx;
        return eventIdxNdxTdx;
      },
      eventIdxNdxTdx);
    },
    {});

    // Alerts
    const alertClasses = [
      MajorFlood,
      MinorFlood,
      AlertFlood,
      ExtremeHeat,
      ExtremeRain,
      VeryHeavyRain,
      HeavyRain,
      LandslideWarningLevel3,
      LandslideWarningLevel2,
      LandslideWarningLevel1,
    ];

    const alertNdxIdxTdx = Object.fromEntries(
      await Promise.all(
        alertClasses.map(async (AlertClass) => {
          const eventClass = AlertClass.getEventClass();
          const eventIdxTdx = eventNdxIdxTdx[eventClass.getEventTypeName()];

          const events = Object.values(eventIdxTdx).reduce(function (
            events,
            eventTdx
          ) {
            return events.concat(Object.values(eventTdx));
          },
          []);

          const alertsIdxTdx = events.reduce((idxTdx, event) => {
            const role =
              roleNdxIdx[eventClass.getRoleClass().getRoleTypeName()][event.id];
            if (!role) {
              return idxTdx;
            }
            const ent = entIdx[role.id];
            if (!ent) {
              return idxTdx;
            }
            const alert = new AlertClass(event, role, ent);
            if (!alert.isTrue()) {
              return idxTdx;
            }

            if (!idxTdx[event.id]) {
              idxTdx[event.id] = {};
            }
            idxTdx[event.id][event.timeUt] = alert;
            return idxTdx;
          }, {});

          return [AlertClass.getAlertName(), alertsIdxTdx];
        })
      )
    );

    const alertIdxNdxTdx = Object.entries(alertNdxIdxTdx).reduce(function (
      alertIdxNdxTdx,
      [name, alertIdxTdx]
    ) {
      return Object.entries(alertIdxTdx).reduce(function (
        alertIdxNdxTdx,
        [id, alertTdx]
      ) {
        if (!alertIdxNdxTdx[id]) {
          alertIdxNdxTdx[id] = {};
        }
        alertIdxNdxTdx[id][name] = alertTdx;
        return alertIdxNdxTdx;
      },
      alertIdxNdxTdx);
    },
    {});

    return {
      // Ents
      ents,
      places,
      dsds,
      // Roles
      roleIdxNdx,
      // Events
      eventIdxNdxTdx,
      // Alerts
      alertIdxNdxTdx,
    };
  }
}
