export default class SystemMode {
  static isTest() {
    return process.env.NODE_ENV === "development";
  }
}
