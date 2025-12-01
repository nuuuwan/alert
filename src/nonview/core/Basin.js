import { StaticData } from "../base";

export default class Basin extends StaticData {
  static getClassID() {
    return "basin";
  }

  constructor(data) {
    super(data);
    this.code = data.code;
  }
}
