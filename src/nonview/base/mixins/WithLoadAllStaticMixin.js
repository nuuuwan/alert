const WithLoadAllStaticMixin = {
  nameToNameId(name) {
    return name.replace(/[^a-zA-Z0-9]/g, "_");
  },

  // Index

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

  // Name Index

  async loadIdxByName() {
    const list = await this.loadAll();
    return Object.fromEntries(
      list.map((ent) => [this.nameToNameId(ent.name), ent]),
    );
  },

  async loadFromName(name) {
    const idx = await this.loadIdxByName();
    const nameId = this.nameToNameId(name);
    return idx[nameId];
  },
};

export default WithLoadAllStaticMixin;
