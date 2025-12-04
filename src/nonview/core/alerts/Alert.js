export default class Alert {
  static getEventClass() {
    throw new Error("Not implemented");
  }

  static getAlertName() {
    throw new Error("Not implemented");
  }

  static getColor() {
    throw new Error("Not implemented");
  }

  constructor(event, role, ent) {
    // check event
    if (!(event instanceof this.constructor.getEventClass())) {
      throw new Error("Invalid event type: " + event.constructor.name);
    }

    // check role
    if (!(role instanceof event.constructor.getRoleClass())) {
      throw new Error("Invalid role type: " + role.constructor.name);
    }
    if (event.id !== role.id) {
      throw new Error("Event roleId does not match the provided role id");
    }

    // check ent
    if (!(ent instanceof role.constructor.getEntClass())) {
      throw new Error("Invalid ent type: " + ent.constructor.name);
    }
    if (role.id !== ent.id) {
      throw new Error("Role entId does not match the provided ent id");
    }

    //
    this.event = event;
    this.role = role;
    this.ent = ent;
  }

  isTrue() {
    throw new Error("Not implemented");
  }
}
