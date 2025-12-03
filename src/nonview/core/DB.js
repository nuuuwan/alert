import Place from "./ents/Place";
import LandslideWarning from "./events/LandslideWarning";
import RiverWaterLevelMeasurement from "./events/RiverWaterLevelMeasurement";
import LandslideRegionRole from "./roles/LandslideRegionRole";
import WeatherStationPlaceRole from "./roles/WeatherStationPlaceRole";
import WeatherReport from "./events/WeatherReport";
import GaugingStationPlaceRole from "./roles/GaugingStationPlaceRole";
import DSD from "./ents/regions/admin_regions/DSD";
export default class DB {
  static getEventClasses() {
    return [RiverWaterLevelMeasurement, WeatherReport, LandslideWarning];
  }

  static async getEventNameToEventListMap() {
    const classList = this.getEventClasses();
    const EventNameAndEventListList = await Promise.all(
      classList.map(async (EventClass) => {
        const eventList = await EventClass.listAll();
        return [EventClass.name, eventList];
      })
    );
    return Object.fromEntries(EventNameAndEventListList);
  }

  static async getIdToEventNameToEventListMap() {
    const eventNameToEventListMap = await this.getEventNameToEventListMap();
    const idToEventNameToEventListMap = {};
    for (const [eventName, eventList] of Object.entries(
      eventNameToEventListMap
    )) {
      eventList.forEach((event) => {
        if (!idToEventNameToEventListMap[event.id]) {
          idToEventNameToEventListMap[event.id] = {};
        }
        if (!idToEventNameToEventListMap[event.id][eventName]) {
          idToEventNameToEventListMap[event.id][eventName] = [];
        }
        idToEventNameToEventListMap[event.id][eventName].push(event);
      });
    }
    return idToEventNameToEventListMap;
  }

  static async load() {
    const idToEventNameToEventListMap =
      await this.getIdToEventNameToEventListMap();
    const placesIdx = await Place.idx();
    const dsdIdx = await DSD.idx();

    console.debug({
      idToEventNameToEventListMap,
      placesIdx,
      dsdIdx,
    });

    return {
      idToEventNameToEventListMap,
      placesIdx,
      dsdIdx,
    };
  }
}
