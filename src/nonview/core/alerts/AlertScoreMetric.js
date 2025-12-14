export default class AlertScoreMetric {
  constructor({
    name,
    description,
    unitValue,
    condition,
    timeLabel,
    conditionDescription,
    source,
    unit,
  }) {
    this.name = name;
    this.description = description;
    this.unitValue = unitValue;
    this.condition = condition;
    this.timeLabel = timeLabel;
    this.conditionDescription = conditionDescription;
    this.source = source;
    this.unit = unit;
  }

  get isTrue() {
    return this.condition(this.unitValue.value);
  }
}
