export default class AlertScoreMetric {
  constructor({ timedUnitValue, condition, conditionDescription, source }) {
    this.timedUnitValue = timedUnitValue;
    this.condition = condition;
    this.conditionDescription = conditionDescription;
    this.source = source;
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
