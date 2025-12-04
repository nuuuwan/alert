import { DataWithIDMixin, DataWithTimeMixin } from "../../base/mixins";

class BaseEvent {
  static getRoleClass() {
    throw new Error("Not implemented");
  }

  static getEventTypeName() {
    throw new Error("Not implemented");
  }

  constructor({ id, timeUt }) {
    this.id = id; // id of the Ent
    this.timeUt = parseInt(timeUt);
  }

  get priority() {
    return 0;
  }
  get color() {
    return "cyan";
  }
}

Object.assign(BaseEvent, DataWithIDMixin);
Object.assign(BaseEvent.prototype, DataWithTimeMixin);

export default BaseEvent;
