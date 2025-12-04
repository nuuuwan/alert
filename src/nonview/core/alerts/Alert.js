export default class Alert {
  static getEventClass() {
    throw new Error("Not implemented");
  }

  static getAlertName() {
    throw new Error("Not implemented");
  }

  static color() {
    throw new Error("Not implemented");
  }

  constructor(event) {
    if (!(event instanceof this.constructor.getEventClass())) {
      throw new Error("Invalid event type: " + event.constructor.name);
    }
    this.event = event;
  }

  async isTrue() {
    throw new Error("Not implemented");
  }
}
