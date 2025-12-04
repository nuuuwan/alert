import { DataWithIDMixin, DataWithTimeMixin } from "../../base/mixins";

class Event {
  static getRoleClass() {
    throw new Error("Not implemented");
  }

  static getEventTypeName() {
    throw new Error("Not implemented");
  }

  static getValidityWindowHours() {
    return 24;
  }

  constructor({ id, timeUt }) {
    this.id = id; // id of the Ent
    this.timeUt = parseInt(timeUt);
  }

  get priority() {
    return 0;
  }
  async getColor() {
    return "cyan";
  }
}

Object.assign(Event, DataWithIDMixin);
Object.assign(Event.prototype, DataWithTimeMixin);

export default Event;
