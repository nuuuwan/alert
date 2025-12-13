export default class AlertScoreMetric {
  constructor({
    name,
    description,
    value,
    condition,
    conditionDescription,
    source,
  }) {
    this.name = name;
    this.description = description;
    this.value = value;
    this.condition = condition;
    this.conditionDescription = conditionDescription;
    this.source = source;
  }
}
