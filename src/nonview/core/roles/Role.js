import DataWithIDMixin from "../../base/mixins/DataWithIDMixin";

class Role {
  static getEntClass() {
    throw new Error("Not implemented");
  }

  static getUrl() {
    return this.getEntClass().getUrl();
  }

  static getRoleTypeName() {
    throw new Error("Not implemented");
  }

  constructor({ id }) {
    this.id = id;
  }
}

Object.assign(Role, DataWithIDMixin);

export default Role;
