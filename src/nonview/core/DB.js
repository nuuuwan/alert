import Place from "./ents/Place";

export default class DB {
  static async load() {
    const [places] = await Promise.all([Place.listAll()]);

    return {
      places,
    };
  }
}
