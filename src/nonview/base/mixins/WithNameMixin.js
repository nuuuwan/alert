import WithLoadAllStaticMixin from "./WithLoadAllStaticMixin.js";
const WithNameMixin = {
  getNameId() {
    if (!this.name) {
      return null;
    }
    return WithLoadAllStaticMixin.nameToNameId(this.name);
  },
};

export default WithNameMixin;
