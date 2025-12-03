export default class BaseEvent {
  constructor(timeUt) {
    this.timeUt = timeUt;
  }

  get date() {
    return new Date(this.timeUt * 1000);
  }
}
