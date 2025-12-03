import DataWithIDMixin from "../../base/DataWithIDMixin";
import DataWithTimeMixin from "../../base/DataWithTimeMixin";

class BaseEvent {
  static getRoleClass() {
    throw new Error("Not implemented");
  }

  constructor({ id, timeUt }) {
    this.id = id; // id of the Ent
    this.timeUt = parseInt(timeUt);
  }
}

Object.assign(BaseEvent, DataWithIDMixin);
Object.assign(BaseEvent.prototype, DataWithTimeMixin);

export default BaseEvent;
