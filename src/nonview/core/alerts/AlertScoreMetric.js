export default class AlertScoreMetric {
  constructor({ timedUnitValue, condition, conditionDescription }) {
    this.timedUnitValue = timedUnitValue;
    this.condition = condition;
    this.conditionDescription = conditionDescription;
  }

  get isTrue() {
    return this.condition(this.timedUnitValue.unitValue.value);
  }

  get description() {
    return this.timedUnitValue.description;
  }
}
