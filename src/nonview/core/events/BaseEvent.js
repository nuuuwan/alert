export default class BaseEvent {
  constructor(entId, timeUt) {
    this.entId = entId;
    this.timeUt = timeUt;
  }

  get date() {
    return new Date(this.timeUt * 1000);
  }
}
