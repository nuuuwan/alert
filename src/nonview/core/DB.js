import Place from "./ents/Place";
import LandslideWarning from "./events/LandslideWarning";
import RiverWaterLevelMeasurement from "./events/RiverWaterLevelMeasurement";
import WeatherReport from "./events/WeatherReport";
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
        return [EventClass.getEventTypeName(), eventList];
      }),
    );
    return Object.fromEntries(EventNameAndEventListList);
  }

  static async getIdToEventNameToEventListMap() {
    const eventNameToEventListMap = await this.getEventNameToEventListMap();
    const idToEventNameToEventListMap = {};
    for (const [eventName, eventList] of Object.entries(
      eventNameToEventListMap,
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
    const regionIdx = await DSD.idx();

    const activePlaces = Object.values(placesIdx).filter(
      (place) => idToEventNameToEventListMap[place.id],
    );

    const activeRegions = Object.values(regionIdx).filter(
      (region) => idToEventNameToEventListMap[region.id],
    );

    return {
      idToEventNameToEventListMap,
      placesIdx,
      regionIdx,
      activePlaces,
      activeRegions,
    };
  }
}
