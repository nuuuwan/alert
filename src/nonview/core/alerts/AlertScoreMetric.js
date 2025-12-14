export default class AlertScoreMetric {
  constructor({ timedUnitValue, condition, conditionDescription }) {
    this.timedUnitValue = timedUnitValue;
    this.condition = condition;
    this.conditionDescription = conditionDescription;
  }

  get value() {
    return this.timedUnitValue.unitValue.value;
  }

  get isTrue() {
    return this.condition(this.timedUnitValue.unitValue.value);
  }

  get description() {
    return this.timedUnitValue.description;
  }
}
