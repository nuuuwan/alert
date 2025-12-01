import { StaticData } from "../base";

export default class River extends StaticData {
  static getClassID() {
    return "river";
  }

  constructor(data) {
    super(data);
    this.basinName = data.basin_name;
    this.locationNames = data.location_names;
  }
}
