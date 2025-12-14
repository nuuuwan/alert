export default class AlertScoreMetric {
  constructor({
    name,
    description,
    timedUnitValue,
    condition,
    conditionDescription,
  }) {
    this.name = name;
    this.description = description;
    this.timedUnitValue = timedUnitValue;
    this.condition = condition;
    this.conditionDescription = conditionDescription;
  }

  get isTrue() {
    return this.condition(this.timedUnitValue.unitValue.value);
  }
}
