import { DataWithIDMixin, DataWithTimeMixin } from "../../base/mixins";

class Event {
  static getRoleClass() {
    throw new Error("Not implemented");
  }

  static getEventTypeName() {
    throw new Error("Not implemented");
  }

  static getValidityWindowHours() {
    return 48;
  }

  constructor({ id, timeUt }) {
    this.id = id; // id of the Ent
    this.timeUt = parseInt(timeUt);
  }

  isStale() {
    const currentTimeUt = Math.floor(Date.now() / 1000);
    const validityWindowSeconds =
      this.constructor.getValidityWindowHours() * 3600;
    return currentTimeUt - this.timeUt > validityWindowSeconds;
  }
}

Object.assign(Event, DataWithIDMixin);
Object.assign(Event.prototype, DataWithTimeMixin);

export default Event;
