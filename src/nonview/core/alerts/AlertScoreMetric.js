export default class AlertScoreMetric {
  constructor({
    name,
    description,
    timedUnitValue,
    condition,
    conditionDescription,
    source,
    unit,
  }) {
    this.name = name;
    this.description = description;
    this.timedUnitValue = timedUnitValue;
    this.condition = condition;
    this.conditionDescription = conditionDescription;
    this.source = source;
    this.unit = unit;
  }

  get isTrue() {
    return this.condition(this.timedUnitValue.unitValue.value);
  }
}
