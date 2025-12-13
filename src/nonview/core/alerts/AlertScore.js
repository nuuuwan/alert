export default class AlertScore {
  constructor({ name, description, metricList, timeLabel }) {
    this.name = name;
    this.description = description;
    this.metricList = metricList;
    this.timeLabel = timeLabel;
  }

  get maxScore() {
    return this.metricList.length;
  }

  get score() {
    return this.metricList.filter((metric) => metric.condition(metric.value))
      .length;
  }
}
