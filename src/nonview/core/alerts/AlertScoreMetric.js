export default class AlertScoreMetric {
  constructor(name, description, value, condition, source) {
    this.name = name;
    this.description = description;
    this.value = value;
    this.condition = condition;
    this.source = source;
  }
}
