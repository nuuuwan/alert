import DataWithIDMixin from "../../base/DataWithIDMixin";

class BaseRole {
  static getEntClass() {
    throw new Error("Not implemented");
  }
  constructor({ id }) {
    this.id = id;
  }

  static getUrl() {
    return this.getEntClass().getUrl();
  }
}

Object.assign(BaseRole, DataWithIDMixin);

export default BaseRole;
