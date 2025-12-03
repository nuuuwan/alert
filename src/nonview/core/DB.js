import Place from "./ents/Place";

export default class DB {
  static placeRoleClasses = [GaugingStationPlace];
  static regionRoleClasses = [];
  constructor() {}
  static async load() {
    const [places] = await Promise.all([Place.listAll()]);

    return {
      places,
    };
  }
}
