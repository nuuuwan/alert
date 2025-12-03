import DataWithIDMixin from "../../base/DataWithIDMixin";

class BaseRole {
  constructor(id) {
    this.id = id;
  }
}

Object.assign(BaseRole, DataWithIDMixin);

export default BaseRole;
