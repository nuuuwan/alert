export default class AlertScoreMetric {
  constructor({
    description,
    timedUnitValue,
    condition,
    conditionDescription,
  }) {
    this.description = description;
    this.timedUnitValue = timedUnitValue;
    this.condition = condition;
    this.conditionDescription = conditionDescription;
  }

  get isTrue() {
    return this.condition(this.timedUnitValue.unitValue.value);
  }
}
