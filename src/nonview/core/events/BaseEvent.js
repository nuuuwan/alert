import DataWithIDMixin from "../../base/DataWithIDMixin";

class BaseEvent {
  static getRoleClass() {
    throw new Error("Not implemented");
  }

  constructor(id, timeUt) {
    this.id = id; // id of the Ent
    this.timeUt = timeUt;
  }

  get date() {
    return new Date(this.timeUt * 1000);
  }
}

Object.assign(BaseEvent, DataWithIDMixin);

export default BaseEvent;
