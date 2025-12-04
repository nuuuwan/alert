import DataWithIDMixin from "../../base/mixins/DataWithIDMixin";

class Role {
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

Object.assign(Role, DataWithIDMixin);

export default Role;
