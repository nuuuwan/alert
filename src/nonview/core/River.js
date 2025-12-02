import { StaticData } from "../base";
import Basin from "./Basin";

export default class River extends StaticData {
  static getClassID() {
    return "river";
  }

  constructor(data) {
    super(data);
    this.basinName = data.basinName || data.basin_name;
    this.locationNames = data.locationNames || data.location_names;
  }

  async basin() {
    return await Basin.fromName(this.basinName);
  }
}
