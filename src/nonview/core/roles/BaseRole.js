export default class BaseRole {
  constructor(id) {
    this.id = id;
  }

  static async listAll() {
    throw new Error("Not implemented");
  }
}
