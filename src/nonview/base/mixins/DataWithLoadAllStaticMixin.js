const DataWithLoadAllStaticMixin = {
  async loadIdx() {
    const list = await this.loadAll();
    return Object.fromEntries(list.map((ent) => [ent.id, ent]));
  },

  async loadFromIds(ids) {
    const idx = await this.loadIdx();
    return ids.map((id) => {
      return idx[id];
    });
  },

  async loadFromId(id) {
    const list = await this.loadFromIds([id]);
    return list[0];
  },

  async loadIdxByName() {
    const list = await this.loadAll();
    return Object.fromEntries(list.map((ent) => [ent.name, ent]));
  },

  async loadFromName(name) {
    const idx = await this.loadIdxByName();
    return idx[name];
  },
};

export default DataWithLoadAllStaticMixin;
